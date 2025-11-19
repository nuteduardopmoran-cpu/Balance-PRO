import { Category } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Sueldo', color: '#2DD4BF', type: 'income' }, // Teal
  { id: '2', name: 'Freelance', color: '#A78BFA', type: 'income' }, // Purple
  { id: '3', name: 'Comida', color: '#F472B6', type: 'expense' }, // Pink
  { id: '4', name: 'Transporte', color: '#60A5FA', type: 'expense' }, // Blue
  { id: '5', name: 'Hogar', color: '#94A3B8', type: 'expense' }, // Slate
  { id: '6', name: 'Entretenimiento', color: '#FB923C', type: 'expense' }, // Orange
  { id: '7', name: 'Salud', color: '#34D399', type: 'expense' }, // Emerald
];

export const QUICK_ACTIONS = [
  { label: 'Sueldo', icon: '💼', type: 'income', category: 'Sueldo' },
  { label: 'Almuerzo', icon: '🥗', type: 'expense', category: 'Comida' },
  { label: 'Taxi/App', icon: '🚖', type: 'expense', category: 'Transporte' },
  { label: 'Compras', icon: '🛍️', type: 'expense', category: 'Hogar' },
];

export const PAYMENT_METHODS = [
  'Efectivo',
  'Tarjeta Crédito',
  'Tarjeta Débito',
  'Billetera Digital',
  'Transferencia'
];