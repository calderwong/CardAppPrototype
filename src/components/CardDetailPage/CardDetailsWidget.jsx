import React from 'react';
import {
  CreditCardIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import LabelValueDisplay from '../common/LabelValueDisplay';

const CardDetailsWidget = ({ 
  cardData, 
  showSensitive, 
  copiedField, 
  toggleSensitive, 
  handleCopyToClipboard, 
  formatCardNumber 
}) => {

  // Extract necessary fields for clarity (optional, but can help)
  const {
    cardholderName,
    cardNumber,
    status,
    cvv,
    expiryDate
  } = cardData;

  return (
    <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg border border-neutral-200">
      <h3 className="text-lg lg:text-2xl font-semibold text-neutral-darker mb-4">Card Details</h3>
      {/* Basic Info */}
      <div className="mb-3 lg:mb-4 pb-3 lg:pb-4 border-b border-neutral-100 space-y-1">
        <LabelValueDisplay label="Cardholder" value={cardholderName} className="flex justify-between items-center" />
        <LabelValueDisplay label="Card Ending In" value={cardNumber ? cardNumber.slice(-4) : '----'} className="flex justify-between items-center" />
        {/* Status with conditional badge - Uses valueSlot */}
        <LabelValueDisplay
          label="Status"
          className="flex justify-between items-center"
          valueSlot={ 
            <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status}
            </span>
          }
        />
      </div>

      {/* Sensitive Info */}
      <div className="space-y-3 lg:space-y-4">
        {/* Card Number with blur/copy - Uses valueSlot */}
        <LabelValueDisplay
          label="Card Number"
          labelSlot={<CreditCardIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
          className="flex justify-between items-center"
          valueSlot={ 
            <div className="flex items-center space-x-2">
              <span className={showSensitive.number ? 'font-mono' : 'font-mono blur-[4px] select-none'}>
                {showSensitive.number ? formatCardNumber(cardNumber) : '**** **** **** ****'}
              </span>
              <button onClick={() => toggleSensitive('number')} className="text-neutral-400 hover:text-neutral-600">
                {showSensitive.number ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
              <button onClick={() => handleCopyToClipboard(cardNumber, 'number')} className="text-neutral-400 hover:text-neutral-600" title="Copy Card Number">
                {copiedField === 'number' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
              </button>
            </div>
          }
        />
        {/* CVV with blur/copy - Uses valueSlot */}
        <LabelValueDisplay
          label="CVV"
          labelSlot={<LockClosedIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
          className="flex justify-between items-center"
          valueSlot={ 
            <div className="flex items-center space-x-2">
              <span className={showSensitive.cvv ? 'font-mono' : 'font-mono blur-[4px] select-none'}>
                {showSensitive.cvv ? cvv : '***'}
              </span>
               <button onClick={() => toggleSensitive('cvv')} className="text-neutral-400 hover:text-neutral-600">
                {showSensitive.cvv ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
               <button onClick={() => handleCopyToClipboard(cvv, 'cvv')} className="text-neutral-400 hover:text-neutral-600" title="Copy CVV">
                {copiedField === 'cvv' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
              </button>
            </div>
          }
        />
        {/* Expiry Date with blur/copy - Uses valueSlot */}
        <LabelValueDisplay
          label="Expiry Date"
          labelSlot={<CalendarDaysIcon className="h-4 w-4 mr-1.5 text-neutral-400" />}
          className="flex justify-between items-center"
          valueSlot={ 
            <div className="flex items-center space-x-2">
              <span className={showSensitive.expiry ? 'font-mono' : 'font-mono blur-[4px] select-none'}>
                {showSensitive.expiry ? expiryDate : '**/**'}
              </span>
               <button onClick={() => toggleSensitive('expiry')} className="text-neutral-400 hover:text-neutral-600">
                {showSensitive.expiry ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
               <button onClick={() => handleCopyToClipboard(expiryDate, 'expiry')} className="text-neutral-400 hover:text-neutral-600" title="Copy Expiry Date">
                 {copiedField === 'expiry' ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CardDetailsWidget;
