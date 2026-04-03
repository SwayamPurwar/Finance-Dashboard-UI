import React from 'react';
import Layout from './components/Layout';
import SummaryCards from './components/SummaryCards';
import DashboardCharts from './components/DashboardCharts';
import Insights from './components/Insights';
import AddTransaction from './components/AddTransaction';
import TransactionsTable from './components/TransactionsTable';
import { useAppContext } from './context/AppContext';

function App() {
  const { activeTab } = useAppContext();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* If 'dashboard' is selected, show these components */}
        {activeTab === 'dashboard' ? (
          <>
            <div className="animate-fade-in-up">
              <SummaryCards />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms', opacity: 0 }}>
              <Insights />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
              <DashboardCharts />
            </div>
          </>
        ) : (
          /* If 'transactions' is selected, show these components */
          <>
            <div className="animate-fade-in-up">
              <AddTransaction />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms', opacity: 0 }}>
              <TransactionsTable />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;