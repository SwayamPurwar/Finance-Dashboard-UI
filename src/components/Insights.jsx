import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Insights() {
  const { transactions } = useAppContext();

  const expenses = transactions.filter(t => t.type === 'expense');
  const categoryMap = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  
  let highestCategory = 'None';
  let highestAmount = 0;
  
  Object.entries(categoryMap).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm transition-colors">
      <div className="p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full">
        <Lightbulb size={24} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Financial Insights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <AlertCircle size={16} className="text-orange-500" />
            <span>Your highest spending category is <strong className="dark:text-white">{highestCategory}</strong> (${highestAmount.toFixed(2)}).</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <TrendingUp size={16} className="text-green-500" />
            <span>You have recorded <strong className="dark:text-white">{transactions.filter(t => t.type === 'income').length}</strong> income streams.</span>
          </div>
        </div>
      </div>
    </div>
  );
}