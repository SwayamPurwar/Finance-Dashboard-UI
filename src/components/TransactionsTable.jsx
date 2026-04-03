import React, { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ExportData from './ExportData';

export default function TransactionsTable() {
  const { transactions, setTransactions, role } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((t) => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) || t.date.includes(searchTerm)
  );

  const handleDelete = (id) => setTransactions(transactions.filter((t) => t.id !== id));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h3>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <ExportData />
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search category or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-400 uppercase font-medium border-b border-gray-200 dark:border-gray-700 transition-colors">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {role === 'Admin' && <th className="px-6 py-4 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{t.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      t.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
                    }`}>
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium dark:text-white">
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={18} className="mx-auto" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}