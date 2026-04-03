import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Card = ({ title, amount, icon, colorClass }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-colors">
    <div className={`p-4 rounded-full ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h3>
    </div>
  </div>
);

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useAppContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card title="Total Balance" amount={totalBalance} icon={<Wallet size={24} className="text-blue-600 dark:text-blue-400" />} colorClass="bg-blue-100 dark:bg-blue-900/50" />
      <Card title="Total Income" amount={totalIncome} icon={<TrendingUp size={24} className="text-green-600 dark:text-green-400" />} colorClass="bg-green-100 dark:bg-green-900/50" />
      <Card title="Total Expenses" amount={totalExpenses} icon={<TrendingDown size={24} className="text-red-600 dark:text-red-400" />} colorClass="bg-red-100 dark:bg-red-900/50" />
    </div>
  );
}