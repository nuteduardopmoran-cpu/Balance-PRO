import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

// Palette: Elegant & Jovial
const COLORS = ['#2DD4BF', '#F472B6', '#A78BFA', '#FB923C', '#60A5FA', '#34D399', '#F87171'];

const ChartsView: React.FC<Props> = ({ transactions }) => {
  
  // Process data for charts
  const monthlyData = useMemo(() => {
    const data: Record<string, { name: string; income: number; expense: number }> = {};
    
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    sorted.forEach(t => {
      const date = new Date(t.date);
      const key = `${date.getMonth()}-${date.getFullYear()}`;
      const name = date.toLocaleDateString('es-PE', { month: 'short' });

      if (!data[key]) {
        data[key] = { name, income: 0, expense: 0 };
      }

      if (t.type === 'income') data[key].income += t.amount;
      else data[key].expense += t.amount;
    });

    return Object.values(data).slice(-6);
  }, [transactions]);

  const categoryData = useMemo(() => {
    const data: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!data[t.category]) data[t.category] = 0;
        data[t.category] += t.amount;
      });
    
    return Object.keys(data)
      .map(key => ({ name: key, value: data[key] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-[2rem] border border-gray-100 shadow-soft">
        <p className="font-medium">Sin datos para gráficos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* Income vs Expense */}
      <div className="bg-white p-8 rounded-[2rem] shadow-soft border border-gray-50">
        <div className="flex items-center justify-between mb-8">
             <h3 className="font-heading font-bold text-xl text-gray-800">Flujo de Caja</h3>
             <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">6 Meses</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 500}} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 500}} 
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                    fontFamily: 'Outfit, sans-serif',
                    padding: '12px 16px'
                }}
              />
              <Bar 
                dataKey="income" 
                fill="#2DD4BF" 
                radius={[6, 6, 6, 6]} 
                name="Ingresos" 
                barSize={16} 
              />
              <Bar 
                dataKey="expense" 
                fill="#F472B6" 
                radius={[6, 6, 6, 6]} 
                name="Gastos" 
                barSize={16} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-white p-8 rounded-[2rem] shadow-soft border border-gray-50">
        <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">Gastos por Categoría</h3>
        <p className="text-sm text-gray-400 mb-8">Distribución de tus gastos principales</p>
        
        <div className="h-72 w-full flex flex-col sm:flex-row items-center justify-between">
          <div className="h-full w-full sm:w-1/2 relative">
             {/* Center Text */}
             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <span className="text-xs text-gray-400 font-bold uppercase">Top</span>
                 <span className="text-2xl font-heading font-bold text-gray-800">{categoryData[0]?.name.substring(0,8)}..</span>
             </div>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                >
                    {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => `S/ ${value}`}
                />
                </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full sm:w-1/2 space-y-4 pl-0 sm:pl-8 mt-4 sm:mt-0">
            {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="font-semibold text-sm text-gray-600">{entry.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">S/ {Math.round(entry.value)}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChartsView);