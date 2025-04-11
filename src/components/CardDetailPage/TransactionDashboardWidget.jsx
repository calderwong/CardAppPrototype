import React from 'react';
import Dashboard from '../../pages/Dashboard'; // Adjust path if Dashboard is moved

function TransactionDashboardWidget({ cards, filterCardId }) {
  return (
    <div className="mt-8 lg:mt-10">
      <Dashboard cards={cards} filterCardId={filterCardId} />
    </div>
  );
}

export default TransactionDashboardWidget;
