import React from 'react';
import { CreditCardIcon } from '@heroicons/react/24/solid'; // Test with a different icon

// Component for displaying a single card with enhanced visuals
function Card({ cardData }) { 
  // Destructure with defaults, including cardDesign and accountType
  const { 
    last4, 
    holder, 
    expiry, 
    type = 'Default', // Visa, Mastercard etc.
    accountType = 'N/A', // Credit or Debit
    cardDesign = 'bg-gradient-to-br from-gray-500 to-gray-700' // Default gradient if none provided
  } = cardData || {};

  // Use props or provide defaults
  const cardNumber = last4 ? `•••• •••• •••• ${last4}` : "•••• •••• •••• 0000";
  const cardHolder = holder || "Card Holder Name";
  const expiryDate = expiry || "MM/YY";
  let logoText = 'BANK'; // Default logo text

  // Determine logo based on card type
  switch (type.toLowerCase()) {
    case 'visa':
      logoText = 'VISA';
      break;
    case 'mastercard':
      logoText = 'Mastercard';
      break;
    case 'amex':
      logoText = 'AMEX';
      break;
    default:
      // Keep default style
      break;
  }

  // Determine account type label, handle potential undefined/null
  const accountLabel = typeof accountType === 'string' ? accountType.toUpperCase() : '';

  return (
    // Use cardDesign prop directly for the background gradient
    <div className={`group text-white p-5 rounded-xl shadow-lg w-[320px] h-[190px] flex flex-col justify-between font-mono relative overflow-hidden ${cardDesign} hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200 ease-out`}> 
      {/* Top section: Chip and Logo */}
      <div className="flex justify-between items-start">
        {/* EMV Chip Placeholder (using CreditCardIcon as test) */}
        <div className="w-10 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md flex items-center justify-center opacity-80">
           <CreditCardIcon className="w-6 h-6 text-neutral-darker" /> {/* Use the imported CreditCardIcon */}
           {/* <span className="text-xs font-bold text-yellow-800">CHIP</span> */} {/* Removed text, using icon */}
        </div>
        {/* Card Logo Placeholder */}
        <div className="text-right">
          <span className="text-xl font-bold italic opacity-80 tracking-wider">{logoText}</span>
        </div>
        {/* NEW: Account Type Label (Top Right) */}
        {accountLabel && (
          <span className="absolute top-2 right-3 bg-black bg-opacity-30 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {accountLabel}
          </span>
        )}
      </div>

      {/* Middle section: Card Number */}
      <div className="text-center text-xl tracking-widest my-2 font-semibold">
        {cardNumber} 
      </div>

      {/* Bottom section: Holder and Expiry */}
      <div className="flex justify-between text-xs items-end">
        <div>
          <span className="font-light block text-[10px] opacity-70">Card Holder</span>
          <span className="font-medium tracking-wide uppercase text-sm block">{cardHolder}</span> 
        </div>
        <div>
          <span className="font-light block text-[10px] opacity-70">Expires</span>
          <span className="font-medium tracking-wide text-sm">{expiryDate}</span> 
        </div>
      </div>
    </div>
  );
}

export default Card;
