import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function AddTransaction() {
  const { role, transactions, setTransactions } = useAppContext();
  const [formData, setFormData] = useState({ date: '', amount: '', category: '', type: 'expense' });

  if (role !== 'Admin') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.amount || !formData.category) return;

    const newTx = {
      id: Date.now(),
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type
    };

    setTransactions([...transactions, newTx]);
    setFormData({ date: '', amount: '', category: '', type: 'expense' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8 transition-colors">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <Plus size={20} className="text-blue-600 dark:text-blue-400" /> Add New Transaction (Admin Only)
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Date</label>
          <input type="date" required className="w-full bg-transparent border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg p-2 text-sm outline-none focus:border-blue-500" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Amount ($)</label>
          <input type="number" step="0.01" required className="w-full bg-transparent border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg p-2 text-sm outline-none focus:border-blue-500" placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Category</label>
          <input type="text" required className="w-full bg-transparent border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg p-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Groceries" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Type</label>
          <select className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg p-2 text-sm outline-none focus:border-blue-500" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm h-[38px]">
          Save
        </button>
      </form>
    </div>
  );
}