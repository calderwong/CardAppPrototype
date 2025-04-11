import React, { useContext } from 'react';
import { BanknotesIcon, ReceiptPercentIcon, ArrowDownTrayIcon, ClockIcon, BuildingLibraryIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns'; // Ensure date-fns is installed
import LabelValueDisplay from '../common/LabelValueDisplay'; // Adjust path as needed
import { ViewModeContext } from '../../App';

function RewardsSummaryWidget({ 
  cardData, 
  formatCurrency, 
  formatDate, // Keep formatDate if used, but seems only 'format' from date-fns is used here
  setShowWithdrawModal, 
  showWithdrawalSuccess,
  totalRewardsEarned
}) {
  const viewMode = useContext(ViewModeContext);
  const isMobile = viewMode === 'mobile';

  // Sort withdrawal history within the component if needed, or assume pre-sorted
  const sortedWithdrawalHistory = cardData.rewardsWithdrawalHistory
    ? [...cardData.rewardsWithdrawalHistory].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-green-200">
      <h3 className="text-lg font-semibold text-neutral-darker mb-4">Rewards Summary</h3>
      
      {/* Success Message */}
      {showWithdrawalSuccess && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-md flex items-center">
          <CheckCircleIcon className="h-4 w-4 mr-2 text-green-600" />
          <span className="text-sm text-green-700 font-medium">Rewards successfully withdrawn!</span>
        </div>
      )}
      
      {/* Current Balance */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BanknotesIcon className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-sm text-neutral-600 font-medium">Current Balance:</span>
          </div>
          <span className="text-lg font-semibold text-green-700">
            {formatCurrency(cardData.rewardsBalance || 0)}
          </span>
        </div>
      </div>
      
      {/* Rewards Rate */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ReceiptPercentIcon className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-sm text-neutral-600 font-medium">Rewards Rate:</span>
          </div>
          <span className="text-lg font-semibold text-blue-700">
            {(cardData.rewardsRate * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      
      {/* Total Potential Earned */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm text-neutral-500">
          <span>Total potential rewards from completed transactions:</span>
          <span>~{formatCurrency(totalRewardsEarned)}</span>
        </div>
      </div>

      {/* Withdraw Button */}
      <div className="mb-5">
        <button
          onClick={() => setShowWithdrawModal(true)}
          disabled={!cardData.rewardsBalance || cardData.rewardsBalance <= 0}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Withdraw Rewards
        </button>
      </div>

      {/* Withdrawal History Section */}
      <div className="pt-4 border-t border-neutral-100">
        <h4 className="text-sm font-semibold text-neutral-darker mb-2 flex items-center">
          <ClockIcon className="h-4 w-4 mr-2 text-neutral-500" />
          Withdrawal History
        </h4>
        
        {sortedWithdrawalHistory.length > 0 ? (
          <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {sortedWithdrawalHistory.map((withdrawal) => (
              <li key={withdrawal.id} className="flex items-center justify-between text-xs border-b border-neutral-100 pb-2">
                <div className="flex items-center">
                  <BuildingLibraryIcon className="h-3 w-3 mr-1 text-neutral-400 flex-shrink-0" />
                  <span className="text-neutral-700">
                    <span className="font-medium text-green-700">{formatCurrency(withdrawal.amount)}</span> to {withdrawal.destinationAccount}
                  </span>
                </div>
                <span className="text-neutral-500 whitespace-nowrap ml-1">{format(new Date(withdrawal.date), 'MMM d, yy')}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-neutral-500 italic">No withdrawal history yet.</p>
        )}
      </div>
    </div>
  );
}

export default RewardsSummaryWidget;
