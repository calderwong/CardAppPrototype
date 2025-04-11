import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  BuildingStorefrontIcon, 
  MapPinIcon, 
  PhoneIcon, 
  CalendarDaysIcon,
  CreditCardIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
  ShieldExclamationIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { mockTransactions, mockCards } from '../data/mockData';
import { ViewModeContext } from '../App';

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Helper function to format date
const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

function TransactionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const viewMode = useContext(ViewModeContext);
  const isMobile = viewMode === 'mobile';

  useEffect(() => {
    // Simulate API fetch with mock data
    try {
      // Find the transaction by ID
      const foundTransaction = mockTransactions.find(t => t.id === Number(id));
      if (!foundTransaction) {
        setError('Transaction not found');
        setLoading(false);
        return;
      }

      setTransaction(foundTransaction);
      
      // Find the card associated with this transaction
      const foundCard = mockCards.find(c => c.id === foundTransaction.cardId);
      setCard(foundCard);
      
      setLoading(false);
    } catch (err) {
      setError('Error loading transaction details');
      setLoading(false);
    }
  }, [id]);

  // Function to get status color and icon
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Completed':
        return {
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          icon: <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
        };
      case 'Pending':
        return {
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-100',
          icon: <ClockIcon className="h-5 w-5 text-yellow-600 mr-2" />
        };
      case 'Processing':
        return {
          color: 'text-blue-700',
          bgColor: 'bg-blue-100',
          icon: <ArrowPathIcon className="h-5 w-5 text-blue-600 mr-2" />
        };
      case 'Refunded':
        return {
          color: 'text-purple-700',
          bgColor: 'bg-purple-100',
          icon: <ArrowPathIcon className="h-5 w-5 text-purple-600 mr-2" />
        };
      case 'Declined':
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          icon: <XCircleIcon className="h-5 w-5 text-red-600 mr-2" />
        };
      default:
        return {
          color: 'text-red-700',
          bgColor: 'bg-red-100',
          icon: <ExclamationCircleIcon className="h-5 w-5 text-red-600 mr-2" />
        };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto ${isMobile ? 'mt-4' : 'mt-8'}`}>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-primary hover:text-primary-dark"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl lg:text-3xl font-semibold text-neutral-darker">Error</h1>
        </div>
        <div className="bg-red-100 p-4 rounded-md text-red-700 mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto ${isMobile ? 'mt-4' : 'mt-8'}`}>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 text-primary hover:text-primary-dark"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-xl lg:text-3xl font-semibold text-neutral-darker">Transaction Not Found</h1>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md text-yellow-700 mb-4">
          The requested transaction could not be found.
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Get status display data
  const statusDisplay = getStatusDisplay(transaction.status);

  return (
    <div className={`bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto ${isMobile ? 'mt-2' : 'mt-8'}`}>
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-primary hover:text-primary-dark"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className={`${isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-semibold text-neutral-darker`}>
          Transaction Details
        </h1>
      </div>

      {/* Transaction Summary Card */}
      <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-neutral-darker`}>
              {transaction.merchantName}
            </h2>
            <p className={`text-neutral-dark ${isMobile ? 'text-sm' : ''}`}>
              {formatDate(transaction.date)}
            </p>
          </div>
          <div className="text-right">
            <div className={`${isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-bold ${
              transaction.status === 'Refunded' ? 'text-purple-700' : 'text-neutral-darker'
            }`}>
              {transaction.status === 'Refunded' ? '-' : ''}{formatCurrency(transaction.amount)}
            </div>
            {card && card.rewardsRate > 0 && transaction.status === 'Completed' && (
              <div className="text-xs text-green-600 font-medium mt-1">
                +{formatCurrency(transaction.amount * card.rewardsRate)} reward
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`px-3 py-1 rounded-full ${statusDisplay.bgColor} ${statusDisplay.color} text-sm flex items-center`}>
            {statusDisplay.icon}
            {transaction.status}
          </div>
        </div>
        
        {/* Display additional information based on status */}
        {transaction.status === 'Declined' && transaction.declineReason && (
          <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700 flex items-start">
            <ShieldExclamationIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium mb-1">Transaction Declined</div>
              <div>{transaction.declineReason}</div>
            </div>
          </div>
        )}
        
        {transaction.status === 'Refunded' && (
          <div className="mt-3 p-3 bg-purple-50 border border-purple-100 rounded text-sm text-purple-700 flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium mb-1">Refund Information</div>
              {transaction.originalTransactionDate && (
                <div>Original purchase: {formatDate(transaction.originalTransactionDate)}</div>
              )}
              {transaction.refundReason && (
                <div>Reason: {transaction.refundReason}</div>
              )}
            </div>
          </div>
        )}
        
        {transaction.status === 'Processing' && transaction.processingDetails && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded text-sm text-blue-700 flex items-start">
            <ClockIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium mb-1">Processing Information</div>
              <div>{transaction.processingDetails}</div>
            </div>
          </div>
        )}
      </div>

      {/* Details Grid */}
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 gap-6'} mb-8`}>
        {/* Merchant Details */}
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <h3 className="text-md lg:text-lg font-semibold text-neutral-darker mb-3 flex items-center">
            <BuildingStorefrontIcon className="h-5 w-5 mr-2 text-neutral-400" />
            Merchant Information
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-500">Name</p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker font-medium`}>
                {transaction.merchantName}
              </p>
            </div>
            
            {transaction.merchantAddress && (
              <div>
                <p className="text-sm text-neutral-500 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 text-neutral-400" />
                  Address
                </p>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker`}>
                  {transaction.merchantAddress}
                </p>
              </div>
            )}
            
            {transaction.merchantPhone && (
              <div>
                <p className="text-sm text-neutral-500 flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-1 text-neutral-400" />
                  Phone
                </p>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker`}>
                  {transaction.merchantPhone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <h3 className="text-md lg:text-lg font-semibold text-neutral-darker mb-3 flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-neutral-400" />
            Transaction Details
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-500 flex items-center">
                <CalendarDaysIcon className="h-4 w-4 mr-1 text-neutral-400" />
                Date
              </p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker`}>
                {formatDate(transaction.date)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500 flex items-center">
                <TagIcon className="h-4 w-4 mr-1 text-neutral-400" />
                Category
              </p>
              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker`}>
                {transaction.category}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-neutral-500 flex items-center">
                <CreditCardIcon className="h-4 w-4 mr-1 text-neutral-400" />
                Card Used
              </p>
              <div className="flex items-center">
                <div className={`${isMobile ? 'text-sm' : 'text-base'} text-neutral-darker`}>
                  {card ? `${card.cardType} ****${transaction.cardLast4}` : `****${transaction.cardLast4}`}
                  {card && card.status === 'Locked' && (
                    <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Locked
                    </span>
                  )}
                </div>
                {card && (
                  <Link to={`/card/${card.id}`} className="ml-2 text-xs text-primary hover:text-primary-dark underline">
                    View Card
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Only if lat/long available) */}
      {transaction.latitude && transaction.longitude && (
        <div className="mb-6">
          <h3 className="text-md lg:text-lg font-semibold text-neutral-darker mb-3 flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2 text-neutral-400" />
            Location
          </h3>
          <div className="h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
            <p className="text-neutral-500">Map would display here with location: {transaction.latitude}, {transaction.longitude}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 transition duration-200"
        >
          Back
        </button>
        
        {/* Conditional Buttons Based on Transaction Status */}
        {transaction.status === 'Completed' && (
          <>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              Report Issue
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
            >
              Export Receipt
            </button>
          </>
        )}
        
        {transaction.status === 'Pending' && (
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
          >
            Check Status
          </button>
        )}
        
        {transaction.status === 'Declined' && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            Contact Support
          </button>
        )}
        
        {transaction.status === 'Processing' && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Check Status
          </button>
        )}
        
        {transaction.status === 'Refunded' && (
          <button
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-200"
          >
            View Refund Details
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionDetailPage;
