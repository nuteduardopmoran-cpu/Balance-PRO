import React, { useState, useEffect } from 'react';
import { X, Check, Tag, Calendar, CreditCard } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { DEFAULT_CATEGORIES, PAYMENT_METHODS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (t: Omit<Transaction, 'id'>) => void;
  initialType?: TransactionType;
  prefillCategory?: string;
}

const TransactionModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialType = 'expense', prefillCategory }) => {
  const [type, setType] = useState<TransactionType>(initialType);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (isOpen) {
        setType(initialType);
        setCategory(prefillCategory || (initialType === 'expense' ? 'Comida' : 'Sueldo'));
    }
  }, [isOpen, initialType, prefillCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name) return;

    onSubmit({
      name,
      amount: parseFloat(amount),
      type,
      category,
      date,
      paymentMethod
    });
    
    setAmount('');
    setName('');
    onClose();
  };

  if (!isOpen) return null;

  const categories = DEFAULT_CATEGORIES.filter(c => c.type === type);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brand-900/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-20 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4">
          <div>
             <h3 className="text-2xl font-heading font-bold text-gray-800">Nueva Transacción</h3>
             <p className="text-sm text-gray-400 mt-1">Registra tus movimientos</p>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-6">
            
          {/* Type Switcher */}
          <div className="flex bg-gray-50 p-1.5 rounded-2xl">
            <button 
              type="button"
              onClick={() => { setType('expense'); setCategory('Comida'); }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${type === 'expense' ? 'bg-white text-rose-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Gasto
            </button>
            <button 
              type="button"
              onClick={() => { setType('income'); setCategory('Sueldo'); }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${type === 'income' ? 'bg-white text-teal-500 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Ingreso
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Monto</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className={`text-2xl font-heading font-bold ${type === 'income' ? 'text-teal-500' : 'text-rose-500'}`}>S/</span>
                </div>
                <input 
                    type="number" 
                    step="0.01" 
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-5 text-4xl font-heading font-bold text-gray-800 bg-transparent border-b-2 border-gray-100 focus:border-brand-500 rounded-none outline-none transition-all placeholder-gray-200"
                    placeholder="0.00"
                    autoFocus
                    required
                />
            </div>
          </div>

          {/* Name Input */}
          <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 space-y-4">
            <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Descripción</label>
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 font-semibold text-gray-700 bg-white border-none rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-brand-100 transition-all"
                    placeholder="Ej: Cena con amigos"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Categoría</label>
                    <select 
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="w-full px-3 py-3 text-sm font-semibold text-gray-700 bg-white border-none rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-brand-100 transition-all appearance-none"
                    >
                        {categories.map(c => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Fecha</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-3 py-3 text-sm font-semibold text-gray-700 bg-white border-none rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                </div>
            </div>
            
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block ml-1">Método</label>
                <select 
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-semibold text-gray-700 bg-white border-none rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-brand-100 transition-all appearance-none"
                >
                    {PAYMENT_METHODS.map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>
          </div>

          <button 
            type="submit" 
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transform active:scale-95 transition-all flex items-center justify-center gap-3 ${
                type === 'income' 
                ? 'bg-teal-500 hover:bg-teal-600 shadow-teal-200' 
                : 'bg-brand-900 hover:bg-brand-800 shadow-brand-200'
            }`}
          >
            <Check size={24} strokeWidth={3} />
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;