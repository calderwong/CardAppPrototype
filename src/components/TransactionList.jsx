import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

function TransactionList({ transactions, title = "Recent Transactions", rewardsRate = 0 }) {

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-neutral-darker mb-4">{title}</h3>
        <p className="text-neutral-dark">No transactions to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-neutral-darker mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-light">
          <thead className="bg-neutral-lightest">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Merchant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Card
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-light">
            {transactions.map((transaction) => {
              // Calculate rewards only if rate is positive and transaction is completed
              const canEarnRewards = rewardsRate > 0 && transaction.status === 'Completed';
              const rewardAmount = canEarnRewards ? transaction.amount * rewardsRate : 0;

              return (
                <tr key={transaction.id} className="hover:bg-neutral-lightest transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-darker">
                    {transaction.merchantName}
                    {/* Optional: Add address/phone tooltip or icon */} 
                    {(transaction.merchantAddress || transaction.merchantPhone) && (
                      <span className="ml-2 group relative">
                        <InformationCircleIcon className="h-4 w-4 text-neutral inline-block cursor-help" />
                        <div className="absolute hidden group-hover:block bg-neutral-dark text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap -mt-10 -ml-4">
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
                    <div>{formatCurrency(transaction.amount)}</div>
                    {/* Display Rewards if applicable */}
                    {canEarnRewards && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        +{formatCurrency(rewardAmount)} ({rewardsRate * 100}%)
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                    `}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">
                    **** {transaction.cardLast4}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary hover:text-primary-dark">
                    {/* Link to a potential future Transaction Detail Page */} 
                    <Link to={`/transaction/${transaction.id}`} className="text-primary hover:text-primary-dark">
                      View
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
