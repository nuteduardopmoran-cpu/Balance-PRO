import React, { useState } from 'react';
import { useFinance } from './hooks/useFinance';
import { QUICK_ACTIONS } from './constants';
import { Wallet, TrendingUp, TrendingDown, PieChart as PieIcon, Plus, LayoutDashboard, List, Settings, Bell } from 'lucide-react';

import StatCard from './components/StatCard';
import TransactionItem from './components/TransactionItem';
import TransactionModal from './components/TransactionModal';
import ChartsView from './components/ChartsView';
import { TransactionType } from './types';

const App: React.FC = () => {
  const { 
    stats, 
    filterPeriod, 
    setFilterPeriod, 
    addTransaction, 
    deleteTransaction 
  } = useFinance();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'charts'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>('expense');
  const [modalCategory, setModalCategory] = useState<string | undefined>(undefined);

  const handleQuickAction = (type: TransactionType, category: string) => {
    setModalType(type);
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setModalType('expense');
    setModalCategory(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-28 sm:pb-10 font-sans text-slate-800 bg-surface">
      
      {/* Modern Mesh Gradient Header */}
      <header className="relative bg-brand-900 text-white pb-40 rounded-b-[3.5rem] overflow-hidden z-0">
        {/* Abstract Mesh Shapes */}
        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-brand-600 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[120%] bg-accent-purple rounded-full mix-blend-multiply filter blur-[80px] opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[50%] h-[80%] bg-accent-pink rounded-full mix-blend-overlay filter blur-[60px] opacity-50"></div>

        <div className="container mx-auto px-6 pt-8 relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10">
                <Wallet className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold tracking-tight">Finanzas Pro</h1>
                <p className="text-xs text-brand-100 font-medium">Gestión Inteligente</p>
              </div>
            </div>
            <div className="flex gap-3">
                <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/5">
                    <Bell size={20} />
                </button>
                <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/5">
                    <Settings size={20} />
                </button>
            </div>
          </div>

          {/* Main Balance Area */}
          <div className="flex flex-col items-center justify-center mb-8">
             <span className="text-brand-100 text-sm font-semibold uppercase tracking-widest mb-2 bg-white/10 px-4 py-1 rounded-full backdrop-blur-sm">Balance Total</span>
             <h2 className="text-5xl sm:text-6xl font-heading font-bold tracking-tight text-white drop-shadow-sm">
                S/ {stats.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
             </h2>
          </div>

          {/* Glass Period Selector */}
          <div className="flex justify-center">
            <div className="inline-flex bg-black/20 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10">
                {(['week', 'month', 'year', 'all'] as const).map((p) => (
                <button
                    key={p}
                    onClick={() => setFilterPeriod(p)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    filterPeriod === p 
                    ? 'bg-white text-brand-900 shadow-lg scale-105' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : p === 'year' ? 'Año' : 'Todo'}
                </button>
                ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Overlapping Header */}
      <main className="container mx-auto px-4 -mt-28 relative z-20">
        
        {/* Statistics Cards with Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="md:col-span-1">
              {/* Quick Actions embedded in the grid for desktop, or just cards */}
               <StatCard 
                title="Ingresos" 
                amount={stats.totalIncome} 
                type="success"
                icon={<TrendingUp size={20} strokeWidth={2.5} />}
                subtitle={filterPeriod === 'month' ? 'Este mes' : undefined}
            />
          </div>
          <div className="md:col-span-1">
            <StatCard 
                title="Gastos" 
                amount={stats.totalExpense} 
                type="danger"
                icon={<TrendingDown size={20} strokeWidth={2.5} />}
                subtitle={filterPeriod === 'month' ? 'Este mes' : undefined}
            />
          </div>
          {/* Desktop only summary or savings */}
          <div className="hidden md:block md:col-span-1">
             <div className="bg-brand-900 text-white rounded-[2rem] p-6 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-brand-200 font-bold text-sm uppercase tracking-wider">Ahorro</h3>
                    <div className="text-3xl font-bold mt-2 font-heading">
                        {stats.totalIncome > 0 ? ((stats.balance / stats.totalIncome) * 100).toFixed(0) : 0}%
                    </div>
                </div>
                <div className="relative z-10 mt-4">
                    <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                        <div 
                            className="bg-accent-teal h-full rounded-full transition-all duration-1000" 
                            style={{ width: `${stats.totalIncome > 0 ? Math.max(0, Math.min(100, (stats.balance / stats.totalIncome) * 100)) : 0}%` }}
                        ></div>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-purple/30 rounded-full blur-2xl"></div>
             </div>
          </div>
        </div>

        {/* Jovial Quick Actions */}
        <div className="mb-8">
            <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="font-heading font-bold text-lg text-gray-800">Accesos Rápidos</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 no-scrollbar snap-x">
            {QUICK_ACTIONS.map((action) => (
                <button
                key={action.label}
                onClick={() => handleQuickAction(action.type as TransactionType, action.category)}
                className="snap-start shrink-0 flex flex-col items-center gap-3 group"
                >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-soft flex items-center justify-center text-2xl border border-white group-hover:scale-110 group-hover:shadow-lg group-hover:border-brand-100 transition-all duration-300">
                    {action.icon}
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-brand-600 transition-colors">{action.label}</span>
                </button>
            ))}
            <button
                onClick={openModal}
                className="snap-start shrink-0 flex flex-col items-center gap-3 group"
            >
                <div className="w-16 h-16 bg-brand-50 rounded-2xl border-2 border-dashed border-brand-200 flex items-center justify-center text-brand-400 group-hover:bg-brand-100 group-hover:border-brand-400 transition-all duration-300">
                    <Plus size={24} />
                </div>
                <span className="text-xs font-bold text-brand-400 group-hover:text-brand-600">Otro</span>
            </button>
            </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <div className="hidden md:flex items-center justify-center mb-8 space-x-2 bg-white p-1.5 rounded-2xl w-fit mx-auto shadow-sm border border-gray-100">
           {(['dashboard', 'history', 'charts'] as const).map((tab) => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab 
                    ? 'bg-brand-900 text-white shadow-md' 
                    : 'text-gray-400 hover:bg-gray-50'
                }`}
               >
                {tab === 'dashboard' && <LayoutDashboard size={18} />}
                {tab === 'history' && <List size={18} />}
                {tab === 'charts' && <PieIcon size={18} />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
               </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {activeTab === 'dashboard' && (
            <>
              <div className="flex items-center justify-between mb-5 px-2">
                <h3 className="text-xl font-heading font-bold text-gray-800">Actividad Reciente</h3>
                <button onClick={() => setActiveTab('history')} className="text-sm font-bold text-brand-600 hover:text-brand-800 bg-brand-50 px-3 py-1 rounded-lg transition-colors">Ver todo</button>
              </div>
              
              {stats.transactions.length > 0 ? (
                <div className="space-y-0">
                  {stats.transactions.slice(0, 5).map(t => (
                    <TransactionItem key={t.id} transaction={t} onDelete={deleteTransaction} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-12 text-center shadow-soft border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl animate-bounce">🍃</div>
                  <h4 className="font-heading font-bold text-gray-800 text-lg">Todo tranquilo</h4>
                  <p className="text-gray-400 font-medium mt-1">No hay movimientos en este periodo</p>
                  <button onClick={openModal} className="mt-6 text-brand-600 font-bold text-sm hover:underline">Registrar primer gasto</button>
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-[2.5rem] shadow-soft p-8 min-h-[500px]">
               <h3 className="text-2xl font-heading font-bold text-gray-800 mb-8">Historial Completo</h3>
               {stats.transactions.length > 0 ? (
                  stats.transactions.map(t => (
                    <TransactionItem key={t.id} transaction={t} onDelete={deleteTransaction} />
                  ))
               ) : (
                 <div className="text-center py-20 opacity-50">
                    <List size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No hay datos para mostrar</p>
                 </div>
               )}
            </div>
          )}

          {activeTab === 'charts' && (
            <ChartsView transactions={stats.transactions} />
          )}

        </div>
      </main>

      {/* Mobile Floating Dock Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2 flex justify-between items-center md:hidden z-40">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <LayoutDashboard size={24} strokeWidth={activeTab === 'dashboard' ? 2.5 : 2} />
        </button>

        <div className="relative -top-8">
            <button 
            onClick={openModal}
            className="bg-brand-900 text-white p-5 rounded-[1.5rem] shadow-xl shadow-brand-900/30 hover:scale-105 active:scale-95 transition-transform border-4 border-surface"
            >
            <Plus size={28} strokeWidth={3} />
            </button>
        </div>

        <button 
          onClick={() => setActiveTab('charts')}
          className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${activeTab === 'charts' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <PieIcon size={24} strokeWidth={activeTab === 'charts' ? 2.5 : 2} />
        </button>
      </div>

      {/* Transaction Modal */}
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(t) => { addTransaction(t); setIsModalOpen(false); }}
        initialType={modalType}
        prefillCategory={modalCategory}
      />

    </div>
  );
};

export default App;