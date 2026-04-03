import React from 'react';
import { Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ExportData() {
  const { transactions } = useAppContext();

  const handleExport = () => {
    if (transactions.length === 0) return;
    const headers = ['Date,Category,Type,Amount'];
    const rows = transactions.map(t => `${t.date},"${t.category}",${t.type},${t.amount}`);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "finance_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleExport}
      className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300 dark:border-gray-600 shadow-sm w-full sm:w-auto"
    >
      <Download size={16} /> Export CSV
    </button>
  );
}