import React, { useContext } from 'react';
import {
  BanknotesIcon,
  CalendarDaysIcon,
  ReceiptPercentIcon,
  ClockIcon,
  CheckCircleIcon, // For Autopay On
  XCircleIcon,     // For Autopay Off
  InformationCircleIcon // For Last Payment
} from '@heroicons/react/24/outline';
import LabelValueDisplay from '../common/LabelValueDisplay'; // Import the common component
import { ViewModeContext } from '../../App';

const PaymentSummaryWidget = ({ cardData, formatCurrency, formatDate }) => {
  const viewMode = useContext(ViewModeContext);
  const isMobile = viewMode === 'mobile';

  // Destructure for easier access, providing defaults
  const {
    statementBalance = 0,
    minPayment = 0,
    paymentDueDate = null,
    autopayStatus = false,
    lastPaymentDate = null,
    lastPaymentAmount = 0
  } = cardData || {};

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-neutral-200">
      <h3 className="text-lg font-semibold text-neutral-darker mb-4">Payment Summary</h3>
      
      {/* Statement Balance */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ReceiptPercentIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Statement Balance</span>
          </div>
          <span className="text-md font-semibold text-neutral-800">{formatCurrency(statementBalance)}</span>
        </div>
      </div>
      
      {/* Autopay Status */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Autopay Status</span>
          </div>
          <span className={`flex items-center text-sm font-medium ${autopayStatus ? 'text-green-600' : 'text-red-600'}`}>
            {autopayStatus ? (
              <CheckCircleIcon className="h-4 w-4 mr-1" />
            ) : (
              <XCircleIcon className="h-4 w-4 mr-1" />
            )}
            {autopayStatus ? 'On' : 'Off'}
          </span>
        </div>
      </div>
      
      {/* Minimum Payment */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BanknotesIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Minimum Payment</span>
          </div>
          <span className="text-md font-semibold text-neutral-800">{formatCurrency(minPayment)}</span>
        </div>
      </div>
      
      {/* Last Payment */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <InformationCircleIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Last Payment</span>
          </div>
          {lastPaymentDate ? (
            <span className="text-sm text-neutral-600">
              {formatCurrency(lastPaymentAmount)} on {formatDate(lastPaymentDate)}
            </span>
          ) : (
            <span className="text-sm text-neutral-500 italic">No recent payments</span>
          )}
        </div>
      </div>
      
      {/* Payment Due Date */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Payment Due Date</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-md font-semibold text-neutral-800">
              {paymentDueDate ? formatDate(paymentDueDate) : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Optional: Make Payment button */}
      {/* <div className="mt-5">
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded-lg transition duration-200 text-sm">
          Make a Payment
        </button>
      </div> */}
    </div>
  );
};

export default PaymentSummaryWidget;
