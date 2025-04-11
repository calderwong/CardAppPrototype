import React, { useState, useMemo } from 'react';
import { mockTransactions } from '../data/mockData.js';
import {
  ExclamationTriangleIcon,
  FlagIcon,
  XMarkIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ClockIcon,
  CalendarDaysIcon,
  MapPinIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

function ReportForm({
  onSubmit,
  onClose,
  reportType,
  setReportType,
  keepNumber,
  setKeepNumber,
  disputedTransactions,
  handleDisputeChange,
  cardId
}) {
  // Add multi-step form state
  const [step, setStep] = useState(1);
  const [lastTransactionDate, setLastTransactionDate] = useState('');
  const [lastTransactionLocation, setLastTransactionLocation] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [contactPreference, setContactPreference] = useState('email');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    sameAsBilling: true
  });
  const [loading, setLoading] = useState(false);

  // Filter transactions based on the cardId passed from CardDetailPage
  const cardTransactions = useMemo(() => {
    return mockTransactions.filter(t => t.cardId === cardId);
  }, [cardId]);

  // Get today's date formatted for max date in date pickers
  const today = useMemo(() => {
    return format(new Date(), 'yyyy-MM-dd');
  }, []);

  // Function to handle form submission with loading state
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      onSubmit({
        ...e,
        reportDetails: {
          reportType,
          keepNumber: reportType === 'lost' ? keepNumber : false,
          lastTransactionDate,
          lastTransactionLocation,
          additionalDetails,
          contactPreference,
          shippingAddress: shippingAddress.sameAsBilling ? 'Use billing address on file' : shippingAddress,
          disputedTransactions: reportType === 'stolen' ? disputedTransactions : {}
        }
      });
      setLoading(false);
    }, 1500);
  };

  // Navigate to next step
  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3));
  };

  // Navigate to previous step
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Step 1: Initial report type selection and basic details
  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Report Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-neutral-dark mb-2">What happened to your card?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setReportType('lost')}
            className={`flex items-start p-4 rounded-lg border ${
              reportType === 'lost' 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-neutral-200 hover:bg-neutral-50'
            } transition-colors`}
          >
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium text-neutral-800">Lost Card</div>
              <p className="text-xs text-neutral-600 mt-1">
                I can't find my card but don't believe it was stolen.
              </p>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setReportType('stolen')}
            className={`flex items-start p-4 rounded-lg border ${
              reportType === 'stolen' 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-neutral-200 hover:bg-neutral-50'
            } transition-colors`}
          >
            <FlagIcon className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
            <div className="text-left">
              <div className="font-medium text-neutral-800">Stolen Card</div>
              <p className="text-xs text-neutral-600 mt-1">
                I believe my card was stolen or used fraudulently.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Last transaction details */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-dark">When did you last use your card?</label>
        <div className="flex items-center">
          <CalendarDaysIcon className="h-5 w-5 text-neutral-500 mr-2" />
          <input
            type="date"
            max={today}
            value={lastTransactionDate}
            onChange={(e) => setLastTransactionDate(e.target.value)}
            className="flex-1 border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-dark">Where did you last use your card?</label>
        <div className="flex items-center">
          <MapPinIcon className="h-5 w-5 text-neutral-500 mr-2" />
          <input
            type="text"
            placeholder="Merchant or location"
            value={lastTransactionLocation}
            onChange={(e) => setLastTransactionLocation(e.target.value)}
            className="flex-1 border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
          />
        </div>
      </div>

      {/* Conditional Fields: Lost Card */}
      {reportType === 'lost' && (
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-neutral-800 mb-1">Replacement Card Options</h4>
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="keepNumber"
                  checked={keepNumber}
                  onChange={(e) => setKeepNumber(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                />
                <label htmlFor="keepNumber" className="ml-2 text-sm text-neutral-700">
                  Keep the same card number (if available)
                </label>
              </div>
              <p className="text-xs text-neutral-500">
                Note: Keeping the same number may take longer to process and is subject to bank approval.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Step 2: Details specific to report type
  const renderStep2 = () => (
    <div className="space-y-4">
      {/* Report type specific content */}
      {reportType === 'stolen' ? (
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <ShieldCheckIcon className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-sm font-medium text-neutral-800">Select Suspicious Transactions</h3>
          </div>
          <p className="text-xs text-neutral-600 mb-3">
            Review your recent transactions and select any that you don't recognize or that you suspect are fraudulent.
          </p>
          <div className="max-h-52 overflow-y-auto border rounded-lg p-1">
            {(cardTransactions && cardTransactions.length > 0) ? (
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Dispute
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Merchant
                    </th>
                    <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {cardTransactions.map((tx) => (
                    <tr key={tx.id} className={`${disputedTransactions[tx.id] ? 'bg-red-50' : ''} hover:bg-neutral-50 cursor-pointer`} onClick={() => handleDisputeChange(tx.id)}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          checked={!!disputedTransactions[tx.id]}
                          onChange={() => handleDisputeChange(tx.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-neutral-700">
                        {tx.date}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="text-xs font-medium text-neutral-800">{tx.merchantName}</div>
                        <div className="text-xs text-neutral-500">{tx.description?.substring(0, 20) || ''}</div>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-right font-medium">
                        <span className={tx.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                          {tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-4 text-center text-sm text-neutral-500">
                No recent transactions found for this card.
              </div>
            )}
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Selected transactions will be included in your fraud report. You may be contacted for additional information.
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-neutral-800 mb-1">What to do next</h4>
                <p className="text-xs text-neutral-600">
                  Continue looking for your card while we process your report. If you find it, contact us immediately to cancel this report.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-neutral-dark">Additional details about the loss (optional)</label>
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="When and where do you think you lost the card?"
              rows={3}
              className="w-full border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
            ></textarea>
          </div>
        </div>
      )}

      {/* Contact preference */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-dark">How should we contact you about this report?</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${contactPreference === 'email' ? 'border-primary bg-primary bg-opacity-5' : 'border-neutral-200'}`}>
            <input
              type="radio"
              name="contactPreference"
              value="email"
              checked={contactPreference === 'email'}
              onChange={() => setContactPreference('email')}
              className="h-4 w-4 text-primary focus:ring-primary border-neutral-300"
            />
            <span className="ml-2 text-sm text-neutral-700">Email</span>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${contactPreference === 'phone' ? 'border-primary bg-primary bg-opacity-5' : 'border-neutral-200'}`}>
            <input
              type="radio"
              name="contactPreference"
              value="phone"
              checked={contactPreference === 'phone'}
              onChange={() => setContactPreference('phone')}
              className="h-4 w-4 text-primary focus:ring-primary border-neutral-300"
            />
            <span className="ml-2 text-sm text-neutral-700">Phone</span>
          </label>
          
          <label className={`flex items-center p-3 border rounded-md cursor-pointer ${contactPreference === 'text' ? 'border-primary bg-primary bg-opacity-5' : 'border-neutral-200'}`}>
            <input
              type="radio"
              name="contactPreference"
              value="text"
              checked={contactPreference === 'text'}
              onChange={() => setContactPreference('text')}
              className="h-4 w-4 text-primary focus:ring-primary border-neutral-300"
            />
            <span className="ml-2 text-sm text-neutral-700">Text Message</span>
          </label>
        </div>
      </div>
    </div>
  );

  // Step 3: Shipping and confirmation
  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-neutral-800 mb-1">Almost Done</h4>
            <p className="text-xs text-neutral-600">
              Please confirm your shipping details for your replacement card.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center mb-2">
          <input 
            type="checkbox" 
            id="sameAsBilling"
            checked={shippingAddress.sameAsBilling}
            onChange={(e) => setShippingAddress({...shippingAddress, sameAsBilling: e.target.checked})}
            className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
          />
          <label htmlFor="sameAsBilling" className="ml-2 text-sm font-medium text-neutral-700">
            Ship to my billing address on file
          </label>
        </div>
        
        {!shippingAddress.sameAsBilling && (
          <div className="p-4 border border-neutral-200 rounded-lg space-y-3">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Street Address</label>
              <input
                type="text"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                className="w-full border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">City</label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  className="w-full border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1">State</label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  className="w-full border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Zip Code</label>
              <input
                type="text"
                value={shippingAddress.zipCode}
                onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                className="w-full border-neutral-300 focus:ring-primary focus:border-primary rounded-md shadow-sm text-sm"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-neutral-800 mb-2">Report Summary</h4>
        <dl className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-1">
            <dt className="text-neutral-500">Report Type:</dt>
            <dd className="text-neutral-800 font-medium capitalize">{reportType}</dd>
          </div>
          {reportType === 'stolen' && (
            <div className="grid grid-cols-2 gap-1">
              <dt className="text-neutral-500">Disputed Transactions:</dt>
              <dd className="text-neutral-800 font-medium">{Object.values(disputedTransactions).filter(Boolean).length}</dd>
            </div>
          )}
          {reportType === 'lost' && (
            <div className="grid grid-cols-2 gap-1">
              <dt className="text-neutral-500">Keep Same Number:</dt>
              <dd className="text-neutral-800 font-medium">{keepNumber ? 'Yes' : 'No'}</dd>
            </div>
          )}
          <div className="grid grid-cols-2 gap-1">
            <dt className="text-neutral-500">Contact Method:</dt>
            <dd className="text-neutral-800 font-medium capitalize">{contactPreference}</dd>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <dt className="text-neutral-500">Shipping:</dt>
            <dd className="text-neutral-800 font-medium">{shippingAddress.sameAsBilling ? 'Billing Address' : 'Custom Address'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );

  // Render functions for each step
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-neutral-darker flex items-center">
            {reportType === 'lost' ? (
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
            ) : (
              <FlagIcon className="h-5 w-5 text-red-500 mr-2" />
            )}
            Report Card {reportType === 'lost' ? 'Lost' : 'Stolen'}
          </h3>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Progress steps */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === stepNumber ? 'bg-primary text-white' : 
                  step > stepNumber ? 'bg-primary-light text-white' : 
                  'bg-neutral-200 text-neutral-600'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="text-xs mt-1 text-center">
                  {stepNumber === 1 && 'Details'}
                  {stepNumber === 2 && (reportType === 'stolen' ? 'Transactions' : 'Additional Info')}
                  {stepNumber === 3 && 'Shipping'}
                </div>
              </div>
            ))}
          </div>
          <div className="relative flex items-center justify-between mt-1">
            <div className="absolute left-0 right-0 h-1 top-1/2 -translate-y-1/2 bg-neutral-200">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-in-out" 
                style={{ width: `${(step - 1) * 50}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step content */}
          {renderStepContent()}
          
          {/* Navigation buttons */}
          <div className="mt-6 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              >
                Cancel
              </button>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center"
              >
                Continue
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Report
                    <CheckCircleIcon className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;
