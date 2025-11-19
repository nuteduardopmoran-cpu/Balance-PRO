import React from 'react';
import { Transaction } from '../types';
import { Trash2, ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, onDelete }) => {
  const isIncome = transaction.type === 'income';

  return (
    <div className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-md hover:border-brand-100 transition-all duration-200 mb-3">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          isIncome ? 'bg-teal-50 text-teal-500' : 'bg-pink-50 text-pink-500'
        }`}>
          {isIncome ? <ArrowUpRight size={22} strokeWidth={2.5} /> : <ArrowDownLeft size={22} strokeWidth={2.5} />}
        </div>
        
        <div>
          <h4 className="font-heading font-bold text-gray-800 text-base">{transaction.name}</h4>
          <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mt-0.5">
            <span className="text-brand-500 bg-brand-50 px-2 py-0.5 rounded-lg">{transaction.category}</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(transaction.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className={`font-heading font-bold text-lg tracking-tight ${
          isIncome ? 'text-teal-500' : 'text-gray-800'
        }`}>
          {isIncome ? '+' : '-'} S/ {transaction.amount.toFixed(2)}
        </span>
        
        <button 
          onClick={() => onDelete(transaction.id)}
          className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Eliminar"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TransactionItem);