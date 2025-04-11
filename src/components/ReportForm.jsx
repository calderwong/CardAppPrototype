import React, { useMemo } from 'react';
import { mockTransactions } from '../data/mockData.js';

function ReportForm({
  onSubmit,
  onClose,
  reportType,
  setReportType,
  keepNumber,
  setKeepNumber,
  disputedTransactions, 
  handleDisputeChange, 
  cardId
}) {

  // We need the transactions specific to this card to display in the dispute section.
  // Since CardDetailPage now renders Dashboard which filters transactions internally,
  // we might need to pass the filtered transactions down or re-filter here.
  // For now, let's assume 'transactions' is passed as a prop (filtered list).

  // Filter transactions based on the cardId passed from CardDetailPage
  const cardTransactions = useMemo(() => {
    return mockTransactions.filter(t => t.cardId === cardId);
  }, [cardId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h3 className="text-lg font-semibold text-neutral-darker mb-4">Report Card as Lost or Stolen</h3>
        
        {/* Report Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-dark mb-2">Reason for Report:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="reportType" 
                value="lost"
                checked={reportType === 'lost'}
                onChange={(e) => setReportType(e.target.value)}
                className="mr-2"
              /> Lost
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="reportType" 
                value="stolen"
                checked={reportType === 'stolen'}
                onChange={(e) => setReportType(e.target.value)}
                className="mr-2"
              /> Stolen
            </label>
          </div>
        </div>

        {/* Conditional Fields: Lost Card */}
        {reportType === 'lost' && (
          <div className="mb-4 p-3 bg-neutral-light rounded border border-neutral-medium">
            <label className="block text-sm font-medium text-neutral-dark mb-2">Replacement Card Options:</label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={keepNumber}
                onChange={(e) => setKeepNumber(e.target.checked)}
                className="mr-2 h-4 w-4 text-primary focus:ring-primary border-neutral-dark rounded"
              />
              Keep the same card number (if available)?
            </label>
            <p className="text-xs text-neutral-dark mt-1">Note: Keeping the same number may take longer.</p>
          </div>
        )}

        {/* Conditional Fields: Stolen Card */}
        {reportType === 'stolen' && (
          <div className="mb-4 p-3 bg-neutral-light rounded border border-neutral-medium">
            <label className="block text-sm font-medium text-neutral-dark mb-2">Dispute Recent Transactions (Optional):</label>
            <p className="text-xs text-neutral-dark mb-2">Select any transactions you did not authorize.</p>
            <div className="max-h-40 overflow-y-auto border rounded p-2 mb-2">
              {(cardTransactions && cardTransactions.length > 0) ? (
                <ul className="space-y-2">
                  {cardTransactions.map((tx) => (
                    <li key={tx.id} className="flex items-center justify-between text-sm">
                      <label className="flex items-center flex-grow cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={!!disputedTransactions[tx.id]}
                          onChange={() => handleDisputeChange(tx.id)}
                          className="mr-2 h-4 w-4 text-primary focus:ring-primary border-neutral-dark rounded"
                        />
                        {/* Displaying basic info, adjust as needed */}
                        <span>{tx.date} - {tx.merchantName || tx.description}</span> 
                      </label>
                      <span className={`font-medium ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-neutral-dark">No recent transactions found for this card.</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose} // Use the passed-in onClose handler
            className="px-4 py-2 text-sm font-medium text-neutral-dark bg-neutral-light rounded-md hover:bg-neutral-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-dark"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm;
