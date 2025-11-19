import React from 'react';

interface StatCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  type: 'primary' | 'success' | 'danger';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, icon, type, subtitle }) => {
  const getStyles = () => {
    switch (type) {
      case 'primary': return {
        bg: 'bg-white',
        text: 'text-brand-900',
        iconBg: 'bg-brand-50',
        iconColor: 'text-brand-600',
        gradient: 'from-brand-600 to-brand-500'
      };
      case 'success': return {
        bg: 'bg-white',
        text: 'text-teal-900',
        iconBg: 'bg-teal-50',
        iconColor: 'text-teal-500',
        gradient: 'from-teal-500 to-emerald-400'
      };
      case 'danger': return {
        bg: 'bg-white',
        text: 'text-rose-900',
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-500',
        gradient: 'from-rose-500 to-pink-500'
      };
      default: return {
        bg: 'bg-white',
        text: 'text-gray-900',
        iconBg: 'bg-gray-50',
        iconColor: 'text-gray-500',
        gradient: 'from-gray-500 to-gray-400'
      };
    }
  };

  const styles = getStyles();

  return (
    <div className={`relative overflow-hidden ${styles.bg} rounded-[2rem] p-6 shadow-soft border border-white/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}>
      
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} ${styles.iconColor} flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        {subtitle && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide bg-gray-50 text-gray-400 border border-gray-100">
                {subtitle}
            </span>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</h3>
        <div className={`text-3xl font-bold font-heading ${styles.text}`}>
          S/ {amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-[0.03] bg-gradient-to-br ${styles.gradient} blur-2xl`} />
    </div>
  );
};

export default React.memo(StatCard);