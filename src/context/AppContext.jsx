import React, { createContext, useState, useEffect, useContext } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('Viewer'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Transactions State (with Local Storage)
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('finance_transactions');
    return savedData ? JSON.parse(savedData) : initialTransactions;
  });

  // Apply Dark Mode and Save Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Save transactions to Local Storage
  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <AppContext.Provider 
      value={{ 
        role, setRole, theme, toggleTheme,
        activeTab, setActiveTab,
        transactions, setTransactions, 
        totalIncome, totalExpenses, totalBalance 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);