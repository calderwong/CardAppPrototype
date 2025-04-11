import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  InformationCircleIcon, 
  CalendarDaysIcon, 
  TagIcon, 
  CreditCardIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { ViewModeContext } from '../App';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

function TransactionList({ transactions, title = "Recent Transactions", rewardsRate = 0 }) {
  const viewMode = useContext(ViewModeContext);
  const isMobile = viewMode === 'mobile';

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300">
        <h3 className="text-lg font-semibold text-neutral-darker mb-4">{title}</h3>
        <p className="text-neutral-dark">No transactions to display.</p>
      </div>
    );
  }

  // Mobile card-based layout
  if (isMobile) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-300">
        <h3 className="text-lg font-semibold text-neutral-darker mb-4">{title}</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => {
            // Calculate rewards only if rate is positive and transaction is completed
            const canEarnRewards = rewardsRate > 0 && transaction.status === 'Completed';
            const rewardAmount = canEarnRewards ? transaction.amount * rewardsRate : 0;

            // Determine status styling
            let statusClass, statusIcon;
            switch(transaction.status) {
              case 'Completed':
                statusClass = 'bg-green-100 text-green-800';
                statusIcon = <CheckCircleIcon className="h-3 w-3 mr-1" />;
                break;
              case 'Pending':
                statusClass = 'bg-yellow-100 text-yellow-800';
                statusIcon = <ClockIcon className="h-3 w-3 mr-1" />;
                break;
              case 'Processing':
                statusClass = 'bg-blue-100 text-blue-800';
                statusIcon = <ArrowPathIcon className="h-3 w-3 mr-1" />;
                break;
              case 'Refunded':
                statusClass = 'bg-purple-100 text-purple-800';
                statusIcon = <ArrowPathIcon className="h-3 w-3 mr-1" />;
                break;
              case 'Declined':
                statusClass = 'bg-red-100 text-red-800';
                statusIcon = <XCircleIcon className="h-3 w-3 mr-1" />;
                break;
              default:
                statusClass = 'bg-neutral-100 text-neutral-800';
                statusIcon = <ExclamationCircleIcon className="h-3 w-3 mr-1" />;
            }

            return (
              <div key={transaction.id} className="border rounded-xl p-3 bg-neutral-50 transition-all duration-200 hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-neutral-darker">
                      {transaction.merchantName}
                    </div>
                    <div className="text-xs text-neutral-medium flex items-center">
                      <CalendarDaysIcon className="h-3 w-3 mr-1" />
                      {transaction.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${transaction.status === 'Refunded' ? 'text-purple-700' : 'text-neutral-darker'}`}>
                      {transaction.status === 'Refunded' ? '-' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    {canEarnRewards && (
                      <div className="text-xs text-green-600 font-medium">
                        +{formatCurrency(rewardAmount)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} items-center transition-colors duration-200`}>
                      {statusIcon}
                      {transaction.status}
                    </span>
                    {transaction.category && (
                      <span className="ml-2 text-xs text-neutral-medium flex items-center">
                        <TagIcon className="h-3 w-3 mr-1" />
                        {transaction.category}
                      </span>
                    )}
                  </div>
                  <Link to={`/transaction/${transaction.id}`} className="text-primary hover:text-primary-dark flex items-center text-sm transition-colors duration-200">
                    View <ArrowRightIcon className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop table-based layout
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300">
      <div className="p-4 border-b bg-neutral-lightest">
        <h3 className="text-lg font-semibold text-neutral-darker">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-neutral-lightest border-b border-neutral-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Merchant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                Card
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-neutral-darker">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-light">
            {transactions.map((transaction) => {
              const canEarnRewards = rewardsRate > 0 && transaction.status === 'Completed';
              const rewardAmount = canEarnRewards ? transaction.amount * rewardsRate : 0;

              // Determine status styling
              let statusClass, statusIcon;
              switch(transaction.status) {
                case 'Completed':
                  statusClass = 'bg-green-100 text-green-800';
                  statusIcon = <CheckCircleIcon className="h-3 w-3 mr-1" />;
                  break;
                case 'Pending':
                  statusClass = 'bg-yellow-100 text-yellow-800';
                  statusIcon = <ClockIcon className="h-3 w-3 mr-1" />;
                  break;
                case 'Processing':
                  statusClass = 'bg-blue-100 text-blue-800';
                  statusIcon = <ArrowPathIcon className="h-3 w-3 mr-1" />;
                  break;
                case 'Refunded':
                  statusClass = 'bg-purple-100 text-purple-800';
                  statusIcon = <ArrowPathIcon className="h-3 w-3 mr-1" />;
                  break;
                case 'Declined':
                  statusClass = 'bg-red-100 text-red-800';
                  statusIcon = <XCircleIcon className="h-3 w-3 mr-1" />;
                  break;
                default:
                  statusClass = 'bg-neutral-100 text-neutral-800';
                  statusIcon = <ExclamationCircleIcon className="h-3 w-3 mr-1" />;
              }

              return (
                <tr key={transaction.id} className="hover:bg-neutral-lightest transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-darker">
                    {transaction.merchantName}
                    {/* Optional: Add address/phone tooltip or icon */} 
                    {(transaction.merchantAddress || transaction.merchantPhone) && (
                      <span className="ml-2 group relative">
                        <InformationCircleIcon className="h-4 w-4 text-neutral inline-block cursor-help" />
                        <div className="absolute hidden group-hover:block bg-neutral-dark text-white text-xs rounded-lg py-2 px-3 z-10 whitespace-nowrap -mt-10 -ml-4 shadow-lg transition-opacity duration-200">
                          {transaction.merchantAddress && <div><MapPinIcon className="h-3 w-3 inline mr-1"/>{transaction.merchantAddress}</div>}
                          {transaction.merchantPhone && <div><PhoneIcon className="h-3 w-3 inline mr-1"/>{transaction.merchantPhone}</div>}
                        </div>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-darker text-right">
                    <div className={transaction.status === 'Refunded' ? 'text-purple-700' : ''}>
                      {transaction.status === 'Refunded' ? '-' : ''}{formatCurrency(transaction.amount)}
                    </div>
                    {/* Display Rewards if applicable */}
                    {canEarnRewards && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        +{formatCurrency(rewardAmount)} ({rewardsRate * 100}%)
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass} items-center transition-colors duration-200`}>
                      {statusIcon}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    **** {transaction.cardLast4}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link to={`/transaction/${transaction.id}`} className="text-primary hover:text-primary-dark transition-colors duration-200 flex items-center">
                      View <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
