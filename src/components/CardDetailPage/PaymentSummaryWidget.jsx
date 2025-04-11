import React from 'react';
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

const PaymentSummaryWidget = ({ cardData, formatCurrency, formatDate }) => {
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
    <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border border-neutral-200">
      <h3 className="text-lg lg:text-2xl font-semibold text-neutral-darker mb-4">Payment Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Core Payment Info */}
        <div className="space-y-3 lg:space-y-4">
          <LabelValueDisplay
            label="Statement Balance"
            value={formatCurrency(statementBalance)}
            labelSlot={<ReceiptPercentIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
            className="flex justify-between items-center"
          />
          <LabelValueDisplay
            label="Minimum Payment"
            value={formatCurrency(minPayment)}
            labelSlot={<BanknotesIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
            className="flex justify-between items-center"
          />
          <LabelValueDisplay
            label="Payment Due Date"
            value={paymentDueDate ? formatDate(paymentDueDate) : 'N/A'}
            labelSlot={<CalendarDaysIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
            className="flex justify-between items-center"
          />
        </div>

        {/* Column 2: Autopay & Last Payment */}
        <div className="space-y-3 lg:space-y-4">
          <LabelValueDisplay
            label="Autopay Status"
            labelSlot={<ClockIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
            className="flex justify-between items-center"
            valueSlot={
              <span className={`flex items-center text-xs lg:text-sm font-medium ${autopayStatus ? 'text-green-600' : 'text-red-600'}`}>
                {autopayStatus ? (
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                ) : (
                  <XCircleIcon className="h-4 w-4 mr-1" />
                )}
                {autopayStatus ? 'On' : 'Off'}
              </span>
            }
          />
          <LabelValueDisplay
            label="Last Payment"
            labelSlot={<InformationCircleIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
            className="flex justify-between items-center"
            valueSlot={
              lastPaymentDate ? (
                <span className="text-xs lg:text-sm text-right">
                  {formatCurrency(lastPaymentAmount)} on {formatDate(lastPaymentDate)}
                </span>
              ) : (
                <span className="text-xs lg:text-sm text-neutral-500 italic">No recent payments</span>
              )
            }
          />
          {/* Placeholder for potential future actions like 'Make Payment' button */}
          <div></div> 
        </div>
      </div>
      {/* Optional: Add Make Payment button or other actions here */}
       {/* <div className="mt-6 text-center">
         <button className="btn btn-primary btn-sm lg:btn-md">Make a Payment</button>
       </div> */}
    </div>
  );
};

export default PaymentSummaryWidget;
