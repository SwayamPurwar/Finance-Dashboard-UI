import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../context/AppContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function DashboardCharts() {
  const { transactions, theme } = useAppContext();
  const textColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';

  const dateMap = transactions.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = { date: curr.date, income: 0, expense: 0 };
    acc[curr.date][curr.type] += curr.amount;
    return acc;
  }, {});
  const lineData = Object.values(dateMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  const categoryMap = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});
  const pieData = Object.keys(categoryMap).map(key => ({ name: key, value: categoryMap[key] }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-96 flex flex-col transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Cash Flow Trend</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} />
              <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff', border: 'none', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000' }} />
              <Legend wrapperStyle={{ color: textColor }} />
              <Line type="monotone" dataKey="income" stroke="#16A34A" strokeWidth={3} dot={{ r: 4 }} name="Income" />
              <Line type="monotone" dataKey="expense" stroke="#DC2626" strokeWidth={3} dot={{ r: 4 }} name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-96 flex flex-col transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Expense Breakdown</h3>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `$${value}`} contentStyle={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff', border: 'none', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000' }} />
              <Legend wrapperStyle={{ color: textColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}