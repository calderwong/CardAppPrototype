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
    <div className={`bg-white ${isMobile ? 'p-4' : 'p-6 lg:p-8'} rounded-lg shadow-lg border border-green-200 ${isMobile ? 'mt-3' : 'mt-6'}`}> 
      <h3 className={`${isMobile ? 'text-base' : 'text-md lg:text-lg'} font-semibold text-neutral-darker mb-3`}>Rewards Summary</h3>
      {showWithdrawalSuccess && (
        <div className="mb-2 sm:mb-3 p-2 bg-green-50 border border-green-200 rounded-md text-xs flex items-center">
          <CheckCircleIcon className="h-4 mr-1 text-green-600" />
          Rewards successfully withdrawn!
        </div>
      )}
      <div className="space-y-3 lg:space-y-4 text-sm lg:text-base">
        {/* Current Balance */}
        <LabelValueDisplay 
          label="Current Balance:" 
          valueSlot={
            <span className={`${isMobile ? 'text-base' : 'text-lg lg:text-2xl'} font-semibold text-green-700`}>
              {formatCurrency(cardData.rewardsBalance || 0)}
            </span>
          } 
          labelSize={`${isMobile ? 'text-xs' : 'text-[11px] sm:text-xs lg:text-sm'}`}
          className="flex items-center space-x-1 sm:space-x-2" // Added flex for icon
          labelSlot={<BanknotesIcon className={`${isMobile ? 'h-4' : 'h-5 sm:h-6'} text-green-600 inline-block`} />}
        />

        {/* Rewards Rate */}
        <LabelValueDisplay 
          label="Rewards Rate:" 
          valueSlot={
            <span className={`${isMobile ? 'text-base' : 'text-lg lg:text-2xl'} font-semibold text-blue-700`}>
              {(cardData.rewardsRate * 100).toFixed(1)}%
            </span>
          } 
          labelSize={`${isMobile ? 'text-xs' : 'text-[11px] sm:text-xs lg:text-sm'}`}
          className="flex items-center space-x-1 sm:space-x-2" // Added flex for icon
          labelSlot={<ReceiptPercentIcon className={`${isMobile ? 'h-4' : 'h-5 sm:h-6'} text-blue-600 inline-block`} />}
        />

        {/* Total Potential Earned (Contextual) */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-neutral-500 pt-2 border-t border-neutral-100 mt-2 lg:mt-4">
          <span>Total potential rewards from completed transactions:</span>
          <span>~{formatCurrency(totalRewardsEarned)}</span>
        </div>

        {/* Withdraw Button */}
        <div className="pt-3 lg:pt-4">
          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={!cardData.rewardsBalance || cardData.rewardsBalance <= 0} // Disable if no balance
            className={`w-full flex items-center justify-center px-3 py-1.5 border border-transparent ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ArrowDownTrayIcon className="h-4 mr-1" />
            Withdraw Rewards
          </button>
        </div>

        {/* Withdrawal History Section */}
        <div className={`${isMobile ? 'mt-4 pt-3' : 'mt-6 lg:mt-8 pt-4'} border-t border-neutral-100`}>
          {/* History Heading Adjusted */}
          <h4 className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'} font-semibold text-neutral-darker mb-2 flex items-center`}>
            <ClockIcon className={`${isMobile ? 'h-3' : 'h-4 sm:h-5'} mr-1 text-neutral-500`} />
            Withdrawal History
          </h4>
          {sortedWithdrawalHistory.length > 0 ? (
            <ul className={`space-y-2 ${isMobile ? 'max-h-32' : 'max-h-40 sm:max-h-48'} overflow-y-auto pr-1`}>
              {sortedWithdrawalHistory.map((withdrawal) => (
                  /* List Item Text Adjusted */
                  <li key={withdrawal.id} className={`flex items-center justify-between ${isMobile ? 'text-[10px]' : 'text-[10px] sm:text-xs lg:text-sm'} border-b border-neutral-100 pb-1`}>
                    <div className="flex items-center">
                      <BuildingLibraryIcon className={`${isMobile ? 'h-3' : 'h-3 sm:h-4'} mr-1 text-neutral-400 flex-shrink-0`} />
                      <span className="text-neutral-700 break-words">
                        <span className="font-medium text-green-700">{formatCurrency(withdrawal.amount)}</span> to {withdrawal.destinationAccount}
                      </span>
                    </div>
                    {/* Date Text Adjusted */}
                    <span className="text-neutral-500 whitespace-nowrap ml-1">{format(new Date(withdrawal.date), 'MMM d, yy')}</span>
                  </li>
                ))}
            </ul>
          ) : (
            /* Empty State Text Adjusted */
            <p className={`${isMobile ? 'text-[10px]' : 'text-[11px] sm:text-xs lg:text-sm'} text-neutral-500 italic`}>No withdrawal history yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default RewardsSummaryWidget;
