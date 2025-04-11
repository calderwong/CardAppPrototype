import React, { useState, useEffect } from 'react';
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const WalletIntegrationModal = ({ 
  isOpen, 
  onClose, 
  walletType, 
  cardData,
  onAddComplete
}) => {
  // States to track the integration process
  const [stage, setStage] = useState('initial'); // initial, verifying, scanning, success, error
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('initial');
      setProgress(0);
      setErrorMessage('');
    }
  }, [isOpen]);

  // Simulate the integration process
  const startIntegration = () => {
    setStage('verifying');
    setProgress(0);
    
    // Simulate verification progress
    const verificationInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(verificationInterval);
          // Move to scanning stage after verification
          setStage('scanning');
          // Start scan progress
          startScanProgress();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  // Simulate scanning process
  const startScanProgress = () => {
    setProgress(0);
    
    // Simulate scan progress
    const scanInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          // Randomly decide success or failure for demo purposes
          if (Math.random() > 0.2) { // 80% success rate
            setStage('success');
          } else {
            setStage('error');
            setErrorMessage('Your bank could not verify this card for digital wallet. Please contact customer support.');
          }
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  // Rendering helpers for each stage
  const renderInitialStage = () => (
    <>
      <div className="p-6 text-center">
        <DevicePhoneMobileIcon className={`h-16 w-16 mx-auto mb-4 ${walletType === 'Apple Pay' ? 'text-black' : 'text-blue-500'}`} />
        <h3 className="text-lg font-medium text-neutral-800 mb-2">
          Add Card to {walletType}
        </h3>
        <p className="text-sm text-neutral-600 mb-6">
          This will securely add your card ending in {cardData?.last4} to your {walletType} wallet for contactless payments.
        </p>
        
        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
          <div className="flex items-start">
            <div className="mr-4 flex-shrink-0">
              <ShieldCheckIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-neutral-800 mb-1">Secure Process</h4>
              <p className="text-xs text-neutral-600">
                Your card details are encrypted and securely transmitted to {walletType}. We never store your full card details.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={startIntegration}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${walletType === 'Apple Pay' ? 'bg-black hover:bg-gray-800' : 'bg-blue-500 hover:bg-blue-600'} transition duration-150 mb-3`}
        >
          Continue to {walletType}
        </button>
        
        <button
          onClick={onClose}
          className="w-full py-2 px-4 rounded-md font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition duration-150"
        >
          Cancel
        </button>
      </div>
    </>
  );
  
  const renderVerifyingStage = () => (
    <div className="p-6 text-center">
      <div className="animate-pulse mb-4">
        <ShieldCheckIcon className="h-16 w-16 mx-auto text-primary" />
      </div>
      <h3 className="text-lg font-medium text-neutral-800 mb-2">
        Verifying Your Card
      </h3>
      <p className="text-sm text-neutral-600 mb-6">
        We're securely verifying your card details with your bank...
      </p>
      
      {/* Progress bar */}
      <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm text-neutral-700">Card validated</span>
        </div>
        <div className="flex items-center">
          {progress >= 40 ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <ArrowPathIcon className="h-5 w-5 text-neutral-500 mr-2 animate-spin" />
          )}
          <span className="text-sm text-neutral-700">Checking eligibility</span>
        </div>
        <div className="flex items-center">
          {progress >= 70 ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <ArrowPathIcon className="h-5 w-5 text-neutral-500 mr-2 animate-spin" />
          )}
          <span className="text-sm text-neutral-700">Preparing secure connection</span>
        </div>
      </div>
    </div>
  );
  
  const renderScanningStage = () => (
    <div className="p-6 text-center">
      <div className="mb-4 relative">
        <QrCodeIcon className="h-24 w-24 mx-auto text-neutral-800" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-primary animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-primary animate-pulse"></div>
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-neutral-800 mb-2">
        Connecting to {walletType}
      </h3>
      <p className="text-sm text-neutral-600 mb-6">
        {walletType === 'Apple Pay' 
          ? 'Your iPhone should prompt you shortly. Please follow the instructions on your device.'
          : 'Your Android device should prompt you shortly. Please follow the instructions on your device.'}
      </p>
      
      {/* Progress bar */}
      <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-6">
        <div 
          className={`h-2.5 rounded-full ${walletType === 'Apple Pay' ? 'bg-black' : 'bg-blue-500'}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-xs text-neutral-500 mb-4">
        If you don't receive a prompt on your device, try opening your {walletType} app manually.
      </div>
      
      <button
        onClick={onClose}
        className="py-2 px-4 rounded-md font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition duration-150"
      >
        Cancel
      </button>
    </div>
  );
  
  const renderSuccessStage = () => (
    <div className="p-6 text-center">
      <div className="mb-4">
        <CheckCircleIcon className={`h-16 w-16 mx-auto ${walletType === 'Apple Pay' ? 'text-black' : 'text-blue-500'}`} />
      </div>
      
      <h3 className="text-lg font-medium text-neutral-800 mb-2">
        Card Added Successfully!
      </h3>
      <p className="text-sm text-neutral-600 mb-6">
        Your card ending in {cardData?.last4} has been added to {walletType}.
      </p>
      
      {/* Card visualization */}
      <div className={`w-full max-w-xs mx-auto rounded-xl shadow-md overflow-hidden mb-6 ${walletType === 'Apple Pay' ? 'bg-gradient-to-r from-neutral-800 to-black' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
        <div className="p-5">
          <div className="flex justify-between items-start mb-6">
            <CreditCardIcon className="h-8 w-8 text-white opacity-90" />
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${walletType === 'Apple Pay' ? 'bg-white text-black' : 'bg-white text-blue-800'}`}>
              {walletType}
            </div>
          </div>
          
          <div className="text-white opacity-90 mb-1 text-xs">CARD NUMBER</div>
          <div className="text-white font-medium mb-4">•••• •••• •••• {cardData?.last4}</div>
          
          <div className="flex justify-between">
            <div>
              <div className="text-white opacity-90 mb-1 text-xs">CARDHOLDER</div>
              <div className="text-white font-medium">{cardData?.cardHolder}</div>
            </div>
            <div className="text-right">
              <div className="text-white opacity-90 mb-1 text-xs">EXPIRES</div>
              <div className="text-white font-medium">{cardData?.expiry}</div>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => {
          onAddComplete(walletType);
          onClose();
        }}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${walletType === 'Apple Pay' ? 'bg-black hover:bg-gray-800' : 'bg-blue-500 hover:bg-blue-600'} transition duration-150`}
      >
        Done
      </button>
    </div>
  );
  
  const renderErrorStage = () => (
    <div className="p-6 text-center">
      <div className="mb-4">
        <ExclamationCircleIcon className="h-16 w-16 mx-auto text-red-500" />
      </div>
      
      <h3 className="text-lg font-medium text-neutral-800 mb-2">
        Something Went Wrong
      </h3>
      <p className="text-sm text-neutral-600 mb-6">
        {errorMessage || `We couldn't add your card to ${walletType} at this time.`}
      </p>
      
      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6 text-left">
        <h4 className="text-sm font-medium text-neutral-800 mb-1">What you can try:</h4>
        <ul className="text-xs text-neutral-700 list-disc pl-4 space-y-1">
          <li>Contact your bank to ensure digital wallet is enabled for this card</li>
          <li>Check your internet connection</li>
          <li>Try again later</li>
          <li>Call customer support at 1-800-555-CARD for assistance</li>
        </ul>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={startIntegration}
          className="flex-1 py-3 px-4 rounded-md font-medium text-neutral-800 bg-neutral-200 hover:bg-neutral-300 transition duration-150"
        >
          Try Again
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 px-4 rounded-md font-medium text-white bg-primary hover:bg-primary-dark transition duration-150"
        >
          Close
        </button>
      </div>
    </div>
  );
  
  // Don't render anything if modal is closed
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <DevicePhoneMobileIcon className={`h-5 w-5 mr-2 ${walletType === 'Apple Pay' ? 'text-black' : 'text-blue-500'}`} />
            <h2 className="text-lg font-semibold text-neutral-800">{walletType} Integration</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content - conditionally render based on stage */}
        {stage === 'initial' && renderInitialStage()}
        {stage === 'verifying' && renderVerifyingStage()}
        {stage === 'scanning' && renderScanningStage()}
        {stage === 'success' && renderSuccessStage()}
        {stage === 'error' && renderErrorStage()}
      </div>
    </div>
  );
};

export default WalletIntegrationModal;
