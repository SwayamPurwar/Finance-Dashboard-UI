import React, { useState } from 'react';
import { LayoutDashboard, Receipt, Moon, Sun, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Layout({ children }) {
  const { role, setRole, theme, toggleTheme, activeTab, setActiveTab } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to switch tabs and automatically close the mobile menu
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex relative">
      
      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">FinanceHub</h1>
          {/* Close button for mobile menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => handleTabSwitch('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => handleTabSwitch('transactions')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'transactions' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Receipt size={20} /> Transactions
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center transition-colors">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
              {activeTab === 'dashboard' ? 'Overview' : 'Transactions'}
            </h2>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="flex items-center gap-1 sm:gap-2">
              <label htmlFor="role" className="hidden sm:block text-sm font-medium text-gray-600 dark:text-gray-300">Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 outline-none cursor-pointer"
              >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}