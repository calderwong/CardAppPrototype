import React from 'react';
import { BanknotesIcon, ReceiptPercentIcon, ArrowDownTrayIcon, ClockIcon, BuildingLibraryIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns'; // Ensure date-fns is installed
import LabelValueDisplay from '../common/LabelValueDisplay'; // Adjust path as needed

function RewardsSummaryWidget({ 
  cardData, 
  formatCurrency, 
  formatDate, // Keep formatDate if used, but seems only 'format' from date-fns is used here
  setShowWithdrawModal, 
  showWithdrawalSuccess,
  totalRewardsEarned
}) {

  // Sort withdrawal history within the component if needed, or assume pre-sorted
  const sortedWithdrawalHistory = cardData.rewardsWithdrawalHistory
    ? [...cardData.rewardsWithdrawalHistory].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border border-green-200"> {/* Removed margin-top as it might be handled by parent */} 
      <h3 className="text-md lg:text-lg font-semibold text-neutral-darker mb-3 lg:mb-4">Rewards Summary</h3>
      {showWithdrawalSuccess && (
        <div className="mb-2 sm:mb-3 lg:mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-md text-xs sm:text-sm flex items-center">
          <CheckCircleIcon className="h-4 sm:h-5 mr-1 sm:mr-2 text-green-600" />
          Rewards successfully withdrawn!
        </div>
      )}
      <div className="space-y-3 lg:space-y-4 text-sm lg:text-base">
        {/* Current Balance */}
        <LabelValueDisplay 
          label="Current Balance:" 
          valueSlot={
            <span className="text-lg lg:text-2xl font-semibold text-green-700">{formatCurrency(cardData.rewardsBalance || 0)}</span>
          } 
          labelSize="text-[11px] sm:text-xs lg:text-sm"
          className="flex items-center space-x-1 sm:space-x-2" // Added flex for icon
          labelSlot={<BanknotesIcon className="h-5 sm:h-6 text-green-600 inline-block" />}
        />

        {/* Rewards Rate */}
        <LabelValueDisplay 
          label="Rewards Rate:" 
          valueSlot={
            <span className="text-lg lg:text-2xl font-semibold text-blue-700">{(cardData.rewardsRate * 100).toFixed(1)}%</span>
          } 
          labelSize="text-[11px] sm:text-xs lg:text-sm"
          className="flex items-center space-x-1 sm:space-x-2" // Added flex for icon
          labelSlot={<ReceiptPercentIcon className="h-5 sm:h-6 text-blue-600 inline-block" />}
        />

        {/* Total Potential Earned (Contextual) */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-neutral-500 pt-2 border-t border-neutral-100 mt-2 lg:mt-4">
          <span>Total potential rewards from completed transactions:</span>
          <span>~{formatCurrency(totalRewardsEarned)}</span>
        </div>

        {/* Withdraw Button */}
        <div className="pt-4 lg:pt-6">
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={!cardData.rewardsBalance || cardData.rewardsBalance <= 0} // Disable if no balance
            className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowDownTrayIcon className="h-4 sm:h-5 mr-1 sm:mr-2" />
            Withdraw Rewards
          </button>
        </div>

        {/* Withdrawal History Section */}
        <div className="mt-6 lg:mt-8 pt-4 border-t border-neutral-100">
          {/* History Heading Adjusted */}
          <h4 className="text-sm sm:text-base font-semibold text-neutral-darker mb-2 lg:mb-3 flex items-center">
            <ClockIcon className="h-4 sm:h-5 mr-1 sm:mr-2 text-neutral-500" />
            Withdrawal History
          </h4>
          {sortedWithdrawalHistory.length > 0 ? (
            <ul className="space-y-2 lg:space-y-3 max-h-40 sm:max-h-48 overflow-y-auto pr-1 sm:pr-2">
              {sortedWithdrawalHistory.map((withdrawal) => (
                  /* List Item Text Adjusted */
                  <li key={withdrawal.id} className="flex items-center justify-between text-[10px] sm:text-xs lg:text-sm border-b border-neutral-100 pb-1 lg:pb-2">
                    <div className="flex items-center">
                      <BuildingLibraryIcon className="h-3 sm:h-4 mr-1 sm:mr-2 text-neutral-400 flex-shrink-0" />
                      <span className="text-neutral-700 break-words">
                        <span className="font-medium text-green-700">{formatCurrency(withdrawal.amount)}</span> to {withdrawal.destinationAccount}
                      </span>
                    </div>
                    {/* Date Text Adjusted */}
                    <span className="text-neutral-500 whitespace-nowrap ml-1 sm:ml-2">{format(new Date(withdrawal.date), 'MMM d, yy')}</span>
                  </li>
                ))}
            </ul>
          ) : (
            /* Empty State Text Adjusted */
            <p className="text-[11px] sm:text-xs lg:text-sm text-neutral-500 italic">No withdrawal history yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default RewardsSummaryWidget;
