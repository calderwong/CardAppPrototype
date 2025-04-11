import React, { useContext, useState } from 'react';
import {
  CreditCardIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ShieldCheckIcon,
  XMarkIcon,
  FingerPrintIcon,
  ExclamationTriangleIcon, // For Report
  FlagIcon, // For Report
  DevicePhoneMobileIcon, // For Digital Wallets
} from '@heroicons/react/24/outline';
import LabelValueDisplay from '../common/LabelValueDisplay';
import { ViewModeContext } from '../../App';

const CardDetailsWidget = ({ 
  cardData, 
  showSensitive, 
  copiedField, 
  toggleSensitive, 
  handleCopyToClipboard, 
  formatCardNumber,
  onReportLost,
  onReportStolen,
  onAddToWallet
}) => {
  // Get view mode from context
  const viewMode = useContext(ViewModeContext);
  const isMobile = viewMode === 'mobile';

  // Add state for 2FA verification process
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);

  // Extract necessary fields for clarity using the correct property names from mockData.js
  const {
    cardHolder,
    fullCardNumber,
    last4,
    status,
    cvv,
    expiry
  } = cardData || {};

  // Handle the initial reveal request
  const handleRevealRequest = (field) => {
    // If already revealed, hide it again
    if (showSensitive[field] === 'revealed') {
      toggleSensitive(field);
      return;
    }
    
    // Start the 2FA process
    if (showSensitive[field] === 'hidden') {
      toggleSensitive(field);
    }
  };

  // Handle verification code submission
  const handleVerifyCode = (field) => {
    // Simulate verification (in a real app, this would validate against a server)
    // Here we'll just accept any 6-digit code for demonstration
    if (verificationCode.length === 6 && /^\d+$/.test(verificationCode)) {
      setVerificationError(false);
      setVerificationCode(''); // Clear the code for next use
      // Change status to verifying
      toggleSensitive(field); 
      // Simulate network delay and then reveal
      setTimeout(() => {
        toggleSensitive(field);
      }, 1500);
    } else {
      setVerificationError(true);
    }
  };

  // Render the appropriate verification modal
  const renderVerificationModal = (field) => {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg p-4">
        <div className="bg-white p-5 rounded-lg shadow-md max-w-xs w-full">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-neutral-800">Verify Identity</h4>
            <button 
              onClick={() => toggleSensitive(field)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mb-4 text-center">
            <FingerPrintIcon className="h-16 w-16 text-primary mx-auto mb-2" />
            <p className="text-sm text-neutral-600 mb-2">
              For your security, we need to verify your identity before showing sensitive information.
            </p>
            <p className="text-xs text-neutral-500 mb-4">
              Enter the 6-digit code sent to your registered device.
            </p>
          </div>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
              className={`w-full px-3 py-2 border ${verificationError ? 'border-red-500' : 'border-neutral-300'} rounded-md text-center font-mono text-lg`}
            />
            {verificationError && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid 6-digit code</p>
            )}
          </div>
          
          <button
            onClick={() => handleVerifyCode(field)}
            className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 rounded-md transition duration-200"
          >
            Verify & Show
          </button>
        </div>
      </div>
    );
  };

  // Render verification processing state
  const renderVerifyingState = (field) => {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 rounded-lg">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
          <div className="animate-pulse flex space-x-2 items-center">
            <ShieldCheckIcon className="h-6 w-6 text-primary" />
            <span className="text-neutral-700">Verifying...</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-neutral-200 relative">
      <h3 className="text-lg font-semibold text-neutral-darker mb-4">Card Details</h3>
      
      {/* Basic Info */}
      <div className="mb-4 pb-3 border-b border-neutral-100 space-y-3">
        <LabelValueDisplay label="Cardholder" value={cardHolder || ''} className="flex justify-between items-center" />
        <LabelValueDisplay label="Card Ending In" value={last4 || '----'} className="flex justify-between items-center" />
        {/* Status with conditional badge - Uses valueSlot */}
        <LabelValueDisplay
          label="Status"
          className="flex justify-between items-center"
          valueSlot={ 
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {status}
            </span>
          }
        />
      </div>

      {/* Sensitive Info */}
      <div className="space-y-4 relative mb-6">
        {/* Card Number with blur/copy */}
        <div className="flex justify-between items-center relative">
          <div className="flex items-center">
            <CreditCardIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Card Number</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`${showSensitive.number === 'revealed' ? 'font-mono' : 'font-mono blur-[4px] select-none'}`}>
              {showSensitive.number === 'revealed' ? formatCardNumber(fullCardNumber) : '**** **** **** ' + (last4 || '****')}
            </span>
            <button 
              onClick={() => handleRevealRequest('number')} 
              className="text-neutral-400 hover:text-neutral-600"
            >
              {showSensitive.number === 'revealed' ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
            {showSensitive.number === 'revealed' && (
              <button 
                onClick={() => handleCopyToClipboard(fullCardNumber, 'number')} 
                className="text-neutral-400 hover:text-neutral-600" 
                title="Copy Card Number"
              >
                {copiedField === 'number' ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          {showSensitive.number === 'prompting' && renderVerificationModal('number')}
          {showSensitive.number === 'verifying' && renderVerifyingState('number')}
        </div>
        
        {/* CVV with blur/copy */}
        <div className="flex justify-between items-center relative">
          <div className="flex items-center">
            <LockClosedIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">CVV</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`font-mono ${showSensitive.cvv === 'revealed' ? '' : 'blur-[4px] select-none'}`}>
              {showSensitive.cvv === 'revealed' ? cvv : '***'}
            </span>
            <button 
              onClick={() => handleRevealRequest('cvv')} 
              className="text-neutral-400 hover:text-neutral-600"
            >
              {showSensitive.cvv === 'revealed' ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
            {showSensitive.cvv === 'revealed' && (
              <button 
                onClick={() => handleCopyToClipboard(cvv, 'cvv')} 
                className="text-neutral-400 hover:text-neutral-600" 
                title="Copy CVV"
              >
                {copiedField === 'cvv' ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          {showSensitive.cvv === 'prompting' && renderVerificationModal('cvv')}
          {showSensitive.cvv === 'verifying' && renderVerifyingState('cvv')}
        </div>
        
        {/* Expiry Date with blur/copy */}
        <div className="flex justify-between items-center relative">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-neutral-500" />
            <span className="text-sm text-neutral-600 font-medium">Expiry Date</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`font-mono ${showSensitive.expiry === 'revealed' ? '' : 'blur-[4px] select-none'}`}>
              {showSensitive.expiry === 'revealed' ? expiry : '**/**'}
            </span>
            <button 
              onClick={() => handleRevealRequest('expiry')} 
              className="text-neutral-400 hover:text-neutral-600"
            >
              {showSensitive.expiry === 'revealed' ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
            {showSensitive.expiry === 'revealed' && (
              <button 
                onClick={() => handleCopyToClipboard(expiry, 'expiry')} 
                className="text-neutral-400 hover:text-neutral-600" 
                title="Copy Expiry Date"
              >
                {copiedField === 'expiry' ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ClipboardDocumentIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          {showSensitive.expiry === 'prompting' && renderVerificationModal('expiry')}
          {showSensitive.expiry === 'verifying' && renderVerifyingState('expiry')}
        </div>
      </div>

      {/* Card Actions Section */}
      <div className="pt-2 border-t border-neutral-100">
        <h4 className="text-sm font-medium text-neutral-700 mb-3">Card Actions</h4>
        
        {/* Security Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
          <button
            onClick={onReportLost}
            className="flex items-center justify-center sm:justify-start px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <ExclamationTriangleIcon className="h-4 w-4 mr-1.5 text-yellow-500" />
            Report Lost
          </button>
          
          <button
            onClick={onReportStolen}
            className="flex items-center justify-center sm:justify-start px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <FlagIcon className="h-4 w-4 mr-1.5 text-red-500" />
            Report Stolen
          </button>
        </div>
        
        {/* Digital Wallet Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={() => onAddToWallet('Apple Pay')}
            className="flex items-center justify-center sm:justify-start px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <DevicePhoneMobileIcon className="h-4 w-4 mr-1.5 text-black" />
            Add to Apple Pay
          </button>
          
          <button
            onClick={() => onAddToWallet('Google Pay')}
            className="flex items-center justify-center sm:justify-start px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <DevicePhoneMobileIcon className="h-4 w-4 mr-1.5 text-blue-500" />
            Add to Google Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsWidget;
