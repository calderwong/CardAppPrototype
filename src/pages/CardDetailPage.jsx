import { useState, useEffect, useMemo, useRef, useContext } from 'react'; // Added useContext
import { useParams, useNavigate, Link } from 'react-router-dom'; // Consolidated imports
// Make sure BanknotesIcon, ArrowDownTrayIcon, ClockIcon are imported from heroicons
import {
  CreditCardIcon, LockClosedIcon, LockOpenIcon, // Basic card
  EyeIcon, EyeSlashIcon, // View/hide sensitive details
  ArrowRightIcon, ArrowDownTrayIcon, XMarkIcon, // Navigation, downloads, close
  CheckCircleIcon, BanknotesIcon, FlagIcon, // Status indicators, Money, Report
  ExclamationTriangleIcon, LockClosedIcon as LockClosedSolidIcon, // Alerts, Lock (solid)
  GlobeAltIcon, CalendarDaysIcon, ClockIcon, // Travel, Calendar, Clock
  ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, // Navigation
  SparklesIcon, ArrowPathIcon, PlusIcon, // Rewards, Refresh, Add/Plus
  CurrencyDollarIcon, ReceiptPercentIcon, // Payments, Rewards Rate
  ChevronDownIcon, ChevronUpIcon, // Dropdowns/Expand
  QuestionMarkCircleIcon // Added for Rewards
} from '@heroicons/react/24/outline';
// Import mockTransactions and mockBankAccounts if not already done
import { mockTransactions, mockBankAccounts } from '../data/mockData';
import { ViewModeContext } from '../App'; // Import ViewModeContext
import TransactionList from '../components/TransactionList';
import ConfirmationModal from '../components/ConfirmationModal';
import TravelNotificationModal from '../components/TravelNotificationModal';
import TravelMap from '../components/TravelMap'; // Import map component
import { Switch } from '@headlessui/react';
import ReportForm from '../components/ReportForm';
import Dashboard from './Dashboard'; // Likely unused here, but keeping for now
import { format } from 'date-fns'; // Import date formatting
import Card from '../components/Card/Card'; // Re-added missing import
import LabelValueDisplay from '../components/common/LabelValueDisplay'; // Import the extracted component
import CardDetailsWidget from '../components/CardDetailPage/CardDetailsWidget'; // Import the new widget
import PaymentSummaryWidget from '../components/CardDetailPage/PaymentSummaryWidget'; // Import the PaymentSummaryWidget
import RewardsSummaryWidget from '../components/CardDetailPage/RewardsSummaryWidget'; // Import the RewardsSummaryWidget
import TransactionDashboardWidget from '../components/CardDetailPage/TransactionDashboardWidget'; // Import the TransactionDashboardWidget
import TravelNotificationsWidget from '../components/CardDetailPage/TravelNotificationsWidget'; // Import the TravelNotificationsWidget
import CardTransactionListWidget from '../components/CardDetailPage/CardTransactionListWidget'; // Import the CardTransactionListWidget

function CardDetailPage({ cards, setCards }) {
  const { id } = useParams();
  const numericCardId = parseInt(id);
  const viewMode = useContext(ViewModeContext); // Access the view mode context
  const isMobile = viewMode === 'mobile'; // Create a helper flag

  // Ref for scrolling to the full payment section
  const paymentSectionRef = useRef(null);

  // --- State Declarations (Initialize with simple defaults) ---
  const [isLocked, setIsLocked] = useState(false);
  const [isOnlineFrozen, setIsOnlineFrozen] = useState(false);
  const [isAtmFrozen, setIsAtmFrozen] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState('lost');
  const [keepNumber, setKeepNumber] = useState(false);
  const [disputedTransactions, setDisputedTransactions] = useState({});
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [temporaryCardNumber, setTemporaryCardNumber] = useState('');
  const [disputeCount, setDisputeCount] = useState(0);
  const [showTravelModal, setShowTravelModal] = useState(false);
  const [travelNotifications, setTravelNotifications] = useState([]);
  const [copiedField, setCopiedField] = useState(null);
  const [revealStatus, setRevealStatus] = useState({ number: 'hidden', cvv: 'hidden', expiry: 'hidden' });
  // Payment related state
  const [paymentTypeToSchedule, setPaymentTypeToSchedule] = useState('Minimum');
  const [autoPaySelection, setAutoPaySelection] = useState('Minimum');
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // State for withdrawal modal
  const [selectedWithdrawalAccount, setSelectedWithdrawalAccount] = useState(mockBankAccounts[0]?.id || ''); // State for selected bank account
  const [showWithdrawalSuccess, setShowWithdrawalSuccess] = useState(false); // State for success message
  // Added missing state from usage below - assuming defaults
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState('');
  const [selectedAutopayAccount, setSelectedAutopayAccount] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // Added missing state


  // --- Calculate Derived Data (useMemo AFTER useState) ---
  const cardData = useMemo(() => {
    if (isNaN(numericCardId)) return null; // Handle invalid ID format
    // Use the 'cards' prop passed down from App.jsx
    return cards.find(c => c.id === numericCardId);
  }, [numericCardId, cards]); // Add cards to dependency array

  // Calculate total potential rewards earned (for display context, actual balance is cardData.rewardsBalance)
  const totalRewardsEarned = useMemo(() => {
    if (!cardData || !cardData.rewardsRate || cardData.rewardsRate <= 0) {
      return 0;
    }
    // Assuming mockTransactions is imported and stable
    return mockTransactions
      .filter(t => t.cardId === cardData.id && t.status === 'Completed')
      .reduce((sum, transaction) => sum + (transaction.amount * cardData.rewardsRate), 0);
  }, [cardData]); // Recalculate only when cardData changes

  // --- Effect to Sync State with cardData (useEffect AFTER useMemo and useState) ---
  useEffect(() => {
    if (!cardData) return; // Don't run if cardData is not yet available

    // Reset general state
    setRevealStatus({ number: 'hidden', cvv: 'hidden', expiry: 'hidden' });
    setCopiedField(null);
    setShowReportForm(false);
    // Reset lock/freeze based on actual card data
    setIsLocked(cardData.isLocked || false);
    setIsOnlineFrozen(cardData.isOnlineFrozen || false);
    setIsAtmFrozen(cardData.isAtmFrozen || false);
    setTravelNotifications(cardData.travelNotifications || []);
    // Reset payment states based on new card data
    if (cardData.accountType === 'Credit') {
      setAutoPaySelection(cardData.autoPayEnabled ? cardData.autoPayType : 'Minimum');
      setPaymentTypeToSchedule('Minimum'); // Default schedule type
      // Assuming these should also be potentially reset/set based on cardData
      setSelectedPaymentAccount(cardData.scheduledPayment?.accountId || '');
      setSelectedAutopayAccount(cardData.autoPayAccountId || '');
    } else {
        // Reset payment state if not a credit card
        setAutoPaySelection('Minimum');
        setPaymentTypeToSchedule('Minimum');
        setSelectedPaymentAccount('');
        setSelectedAutopayAccount('');
    }
    setShowPaymentHistory(false);
  }, [cardData]); // Rerun only when cardData changes

  // --- Loading / Not Found State ---
  if (!cardData) {
    return (
      <div className="container mx-auto p-4 text-center">
         <Link to="/" className="text-primary hover:underline inline-flex items-center mb-4">
           <ArrowLeftIcon className="h-5 w-5 mr-1" />
           Back to Dashboard
         </Link>
        <p className="text-lg text-neutral-dark">
          {isNaN(numericCardId) ? 'Invalid Card ID.' : 'Loading card details or card not found...'}
        </p>
      </div>
    );
  }

  const handleDisputeChange = (txId) => {
    setDisputedTransactions(prev => ({
      ...prev,
      [txId]: !prev[txId]
    }));
  };

  // --- Per-Field Sensitive Details Handlers ---
  const handleReveal = (field) => {
    setRevealStatus(prev => ({ ...prev, [field]: 'prompting' }));
  };

  const handleConfirm = (field) => {
    setRevealStatus(prev => ({ ...prev, [field]: 'verifying' }));
    // Simulate network delay/verification process
    setTimeout(() => {
      setRevealStatus(prev => ({ ...prev, [field]: 'revealed' }));
    }, 1500); // Simulate 1.5 seconds delay
  };

  const handleHide = (field) => {
    setRevealStatus(prev => ({ ...prev, [field]: 'hidden' }));
  };

  // Placeholder for missing handlers used in commented code - to avoid runtime errors if uncommented
  const toggleSensitive = (field) => {
    console.log("toggleSensitive called for", field);
    // Basic toggle logic (example)
    setRevealStatus(prev => ({
        ...prev,
        [field]: prev[field] === 'hidden' ? 'revealed' : 'hidden'
    }));
  };

  const formatCardNumber = (number) => {
    // Basic formatting (example)
    return number ? number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim() : '**** **** **** ****';
  };


  // Helper to format dates nicely
  const formatDateRange = (start, end) => {
    const startDate = format(start, 'MMM d, yyyy');
    const endDate = end ? format(end, 'MMM d, yyyy') : 'Ongoing'; // Handle open-ended trips
    return `${startDate} - ${endDate}`;
  };

  // --- Copy to Clipboard Handler ---
  const handleCopyToClipboard = (textToCopy, fieldName) => {
    if (!navigator.clipboard) {
      // Clipboard API not available (e.g., insecure context)
      console.error('Clipboard API not available.');
      // Optionally show an error message to the user
      return;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField(null);
      }, 1500); // Hide status after 1.5 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // Optionally show an error message to the user
    });
  };

  // --- Helper Functions ---
  const formatCurrency = (amount) => {
    // Added check for valid number
    if (typeof amount !== 'number' || isNaN(amount)) {
      return '$--.--'; // Or some other placeholder
    }
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      // Ensure dateString is treated as UTC if only date part is provided
      const date = new Date(dateString.includes('T') ? dateString : dateString + 'T00:00:00');
      return date.toLocaleDateString('en-US', options);
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Invalid Date';
    }
  };

  // --- Update Card Data Helper ---
  const updateCardData = (updatedFields) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === numericCardId ? { ...card, ...updatedFields } : card
      )
    );
  };

  // --- Payment Handlers ---
  const handleSchedulePayment = () => {
    if (!selectedPaymentAccount) {
        console.error("No payment account selected");
        // Maybe show an error message to the user
        return;
    }
    const amountToPay = paymentTypeToSchedule === 'Minimum'
      ? cardData.minPayment
      : cardData.statementBalance;

    updateCardData({
      scheduledPayment: {
        date: cardData.dueDate, // Schedule for the due date
        amount: amountToPay,
        type: paymentTypeToSchedule,
        accountId: selectedPaymentAccount // Store the selected account ID
      }
    });
    setShowPaymentSuccess(true); // Show success message
    setTimeout(() => setShowPaymentSuccess(false), 3000); // Hide after 3s

    console.log(`Scheduled ${paymentTypeToSchedule} payment of ${formatCurrency(amountToPay)} for ${formatDate(cardData.dueDate)} from account ${selectedPaymentAccount}`);
  };

  const handleCancelScheduledPayment = () => {
    updateCardData({ scheduledPayment: null });
    console.log('Cancelled scheduled payment');
  };

  const handleToggleAutoPay = (enabled) => {
    if (enabled && !selectedAutopayAccount) {
      console.error("Cannot enable autopay without selecting an account.");
      // Optionally prevent the switch toggle or show a message
      return;
    }
    updateCardData({
      autoPayEnabled: enabled,
      // Reset type if disabling, otherwise use current selection or default to Minimum
      autoPayType: enabled ? autoPaySelection : null,
      autoPayAccountId: enabled ? selectedAutopayAccount : null // Store/clear account ID
    });
    console.log(`Autopay ${enabled ? 'enabled' : 'disabled'} ${enabled ? `with type ${autoPaySelection} from account ${selectedAutopayAccount}` : ''}`);
  };

  const handleAutoPayTypeChange = (type) => {
    setAutoPaySelection(type);
    // Only update card data if autopay is already enabled
    if (cardData.autoPayEnabled) {
      updateCardData({ autoPayType: type });
      console.log(`Autopay type set to: ${type}`);
    }
  };

  // Added missing handler from usage below
  const handleAutopayAccountChange = (accountId) => {
    setSelectedAutopayAccount(accountId);
     // If autopay is currently enabled, update the card data immediately
    if (cardData.autoPayEnabled) {
       updateCardData({ autoPayAccountId: accountId });
       console.log(`Autopay account updated to: ${accountId}`);
    }
  };


  const handleSubmitReport = (e) => {
    e.preventDefault();
    const currentDisputeCount = Object.values(disputedTransactions).filter(Boolean).length;

    console.log('Submitting Report:', {
      cardId: cardData.id,
      reportType,
      ...(reportType === 'lost' && { keepNumber }),
      ...(reportType === 'stolen' && { disputedCount: currentDisputeCount, disputedIds: Object.keys(disputedTransactions).filter(id => disputedTransactions[id]) })
    });

    setTemporaryCardNumber('4999 1111 2222 3333');
    setDisputeCount(currentDisputeCount);
    setReportSubmitted(true);
    setShowReportForm(false);
    updateCardData({ isLocked: true }); // Update card data via prop
  };

  const getArrivalDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleAddToWallet = (walletType) => {
    console.log(`Attempting to add card ending in ${cardData.last4} to ${walletType}...`);
    alert(`Simulating adding card to ${walletType}. Check console for details.`);
  };

  const cardTransactions = useMemo(() => {
    if (!numericCardId) return [];
    return mockTransactions.filter(t => t.cardId === numericCardId);
  }, [numericCardId]);

  // --- Event Handlers ---

  // Toggle card lock status (Placeholder) - Modified to use updateCardData
  const handleLockToggle = () => {
    const newLockStatus = !isLocked;
    setIsLocked(newLockStatus); // Update local state immediately for UI responsiveness
    updateCardData({ isLocked: newLockStatus }); // Update global state
  };

  const handleSaveTravelNotification = (notification) => {
    const newNotifications = [...travelNotifications, notification];
    setTravelNotifications(newNotifications); // Update local state
    updateCardData({ travelNotifications: newNotifications }); // Update global state
    setShowTravelModal(false);
  };

  // --- Scroll Handler ---
  const handleScrollToPayments = () => {
    paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Rewards Withdrawal Handler (Updated) ---
  const handleWithdrawConfirm = () => {
    // 1. Guard Clause & Get Data
    if (!cardData || cardData.rewardsBalance <= 0 || !selectedWithdrawalAccount) {
      console.error("Withdrawal conditions not met.");
      setShowWithdrawModal(false); // Close modal even on error
      return;
    }

    const withdrawalAmount = cardData.rewardsBalance;
    const destinationAccount = mockBankAccounts.find(acc => acc.id === selectedWithdrawalAccount);

    if (!destinationAccount) {
      console.error("Selected bank account not found.");
      setShowWithdrawModal(false);
      return;
    }
    const destinationAccountName = `${destinationAccount.type} (...${destinationAccount.accountNumber.slice(-4)})`; // Corrected template literal

    console.log(`Withdrawing: ${formatCurrency(withdrawalAmount)} to ${destinationAccountName}`);

    // 2. Create new history entry
    const newHistoryEntry = {
      id: `w-${Date.now()}`, // Simple unique ID
      amount: withdrawalAmount,
      date: new Date().toISOString(), // Use ISO string for consistency
      destination: destinationAccountName,
    };

    // 3. Update the global cards state via setCards prop
    setCards(prevCards =>
      prevCards.map(card => {
        if (card.id === cardData.id) {
          // Return a *new* card object with updated rewards info
          return {
            ...card,
            rewardsBalance: 0, // Reset balance after withdrawal
            rewardsWithdrawalHistory: [...(card.rewardsWithdrawalHistory || []), newHistoryEntry],
          };
        }
        return card; // Return other cards unchanged
      })
    );

    // 4. Close modal and show success message
    setShowWithdrawModal(false);
    setShowWithdrawalSuccess(true); // Show success message

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowWithdrawalSuccess(false);
    }, 3000);
  };

  return (
    <div className={`p-4 lg:p-6 max-w-4xl mx-auto ${isMobile ? 'px-2' : ''}`}>
      {/* Breadcrumbs */}
      <nav className="text-sm mb-4 text-neutral-dark" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-sm text-primary hover:underline">Dashboard</Link>
            <svg className="h-5 w-5 text-neutral-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </li>
          <li className="flex items-center">
            <span className="text-sm text-neutral-dark">Card Details</span>
          </li>
        </ol>
      </nav>

      {/* Report Submitted Message */}
      {reportSubmitted && (
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md border border-green-500">
          <h2 className="text-xl lg:text-2xl font-semibold text-green-700 mb-4">Report Submitted Successfully</h2>
          <p className="text-lg lg:text-xl text-neutral-dark mb-3">
            Your card ending in {cardData.last4} has been reported as <strong>{reportType === 'lost' ? 'Lost' : 'Stolen'}</strong>.
            {reportSubmitted && reportType === 'stolen' && disputeCount > 0 &&
              ` ${disputeCount} transaction${disputeCount > 1 ? 's are' : ' is'} being disputed.`
            }
            {reportSubmitted && reportType === 'stolen' && disputeCount === 0 &&
              ` No transactions were marked for dispute.`
            }
          </p>
          <p className="text-lg lg:text-xl text-neutral-dark mb-6">
            A replacement card is being processed and will arrive by approximately <strong>{getArrivalDate()}</strong>.
          </p>

          <div className="bg-neutral-light p-4 lg:p-6 rounded border border-neutral-medium">
            <h3 className="text-lg lg:text-xl font-semibold text-primary-dark mb-2">Your Temporary Virtual Card</h3>
            <p className="font-mono text-xl lg:text-2xl tracking-wider text-neutral-darker mb-2 bg-white p-2 lg:p-4 rounded inline-block shadow-sm">{temporaryCardNumber}</p>
            <p className="text-xs lg:text-sm text-neutral-dark">
              Please use this temporary card number for purchases before your physical card arrives by mail to your address on file.
            </p>
          </div>
        </div>
      )}

      {/* --- Default View (Before Submission) --- */}
      {!reportSubmitted && (
        <div>
          {/* Conditional rendering based on view mode */}
          {isMobile ? (
            <>
              {/* MOBILE VIEW - Stacked layout (unchanged) */}
              <div className="mb-6 flex justify-center">
                <Card cardData={cardData} />
              </div>
              
              {cardData.accountType === 'Credit' && (
                <div className="bg-white p-4 rounded-lg shadow-lg mb-6 border border-neutral-200">
                  <h4 className="text-md font-semibold text-neutral-darker mb-3">Payment Summary</h4>
                  <div className="space-y-2 text-xs sm:text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-dark">Card Holder</span>
                      <span className="font-medium text-neutral-darker">{cardData.cardHolder}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-dark pt-1">Card Number</span>
                      <div className="text-right">
                        <p className="text-md font-mono text-neutral-darker">{cardData.fullCardNumber ? formatCardNumber(cardData.fullCardNumber) : '**** **** **** ' + cardData.last4}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleScrollToPayments}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm mt-3"
                  >
                    View Full Payment Details
                  </button>
                </div>
              )}
              
              <div className="mb-6">
                <CardDetailsWidget
                  cardData={cardData}
                  showSensitive={revealStatus} 
                  copiedField={copiedField}
                  toggleSensitive={toggleSensitive}
                  handleCopyToClipboard={handleCopyToClipboard}
                  formatCardNumber={formatCardNumber}
                />
              </div>
              
              <div className="mb-6">
                <PaymentSummaryWidget
                  cardData={cardData}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </div>
              
              {cardData.rewardsRate > 0 && (
                <div className="mb-6">
                  <RewardsSummaryWidget
                    cardData={cardData}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                    setShowWithdrawModal={setShowWithdrawModal}
                    showWithdrawalSuccess={showWithdrawalSuccess}
                    totalRewardsEarned={totalRewardsEarned}
                  />
                </div>
              )}
              
              <div className="mb-6">
                <TravelNotificationsWidget
                  travelNotifications={travelNotifications}
                  formatDateRange={formatDateRange}
                />
              </div>
              
              <div className="mb-6">
                <TransactionDashboardWidget cards={cards} filterCardId={numericCardId} />
              </div>
            </>
          ) : (
            <>
              {/* BROWSER VIEW - Optimized layout */}
              {/* Row 1: Card Image & Card Details with flexible column widths */}
              <div className="flex flex-wrap mb-6">
                {/* Column 1: Card Image + Quick Access - Fixed width based on card dimensions */}
                <div style={{ width: "340px" }} className="pr-6">
                  {/* Container to maintain card aspect ratio */}
                  <div className="mb-4">
                    <Card cardData={cardData} />
                  </div>
                  
                  {/* Quick Access Panel */}
                  {cardData.accountType === 'Credit' && (
                    <div className="bg-white p-4 rounded-xl shadow-md border border-neutral-200 mb-4">
                      <h4 className="text-md font-semibold text-neutral-darker mb-2">Quick Access</h4>
                      <div className="space-y-1 text-xs mb-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-dark">Card Holder</span>
                          <span className="font-medium text-neutral-darker">{cardData.cardHolder}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-neutral-dark">Card Number</span>
                          <span className="font-mono text-neutral-darker">{cardData.last4}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleScrollToPayments}
                        className="w-full bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-3 rounded-lg transition duration-200 text-xs"
                      >
                        View Full Payment Details
                      </button>
                    </div>
                  )}
                  
                  {/* Travel Notifications */}
                  <div className="mb-4">
                    <TravelNotificationsWidget
                      travelNotifications={travelNotifications}
                      formatDateRange={formatDateRange}
                    />
                  </div>
                </div>
                
                {/* Column 2: Flexible content that wraps around the card */}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Card Details - Full width on medium screens, half width on large screens */}
                    <div className="lg:col-span-2">
                      <CardDetailsWidget
                        cardData={cardData}
                        showSensitive={revealStatus} 
                        copiedField={copiedField}
                        toggleSensitive={toggleSensitive}
                        handleCopyToClipboard={handleCopyToClipboard}
                        formatCardNumber={formatCardNumber}
                      />
                    </div>
                    
                    {/* Payment Summary - Responsive column sizing */}
                    <div className="lg:col-span-1">
                      <PaymentSummaryWidget
                        cardData={cardData}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                      />
                    </div>
                    
                    {/* Rewards Summary (if applicable) - Responsive column sizing */}
                    {cardData.rewardsRate > 0 && (
                      <div className="lg:col-span-1">
                        <RewardsSummaryWidget
                          cardData={cardData}
                          formatCurrency={formatCurrency}
                          formatDate={formatDate}
                          setShowWithdrawModal={setShowWithdrawModal}
                          showWithdrawalSuccess={showWithdrawalSuccess}
                          totalRewardsEarned={totalRewardsEarned}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Row 2: Full-width Transaction Dashboard */}
              <div className="mb-6">
                <div className="bg-white p-4 rounded-xl shadow-md border border-neutral-200">
                  <TransactionDashboardWidget 
                    cards={cards} 
                    filterCardId={numericCardId}
                  />
                </div>
              </div>
            </>
          )}
          
          {/* Separator */}
          <hr className="my-6 border-neutral-light" />

          {/* Transaction List - Full width for both views */}
          <CardTransactionListWidget
            transactions={cardTransactions}
            rewardsRate={cardData?.rewardsRate}
          />

          {/* Credit Card Payment Section - Full width for both views */}
          {cardData.accountType === 'Credit' && (
            <div ref={paymentSectionRef} className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg mt-6 md:mt-8 lg:mt-10 border border-neutral-200">
              {/* Heading Adjusted */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-darker mb-4 md:mb-6">Credit Card Payments</h3>

              {/* Payment Summary Recap - Uses LabelValueDisplay (already sized) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 lg:mb-6 p-3 md:p-4 lg:p-6 bg-neutral-lightest rounded-md border border-neutral-light">
                <LabelValueDisplay
                  label="Payment Due"
                  valueSlot={
                    <span className="text-lg lg:text-2xl font-semibold text-neutral-darker">{formatDate(cardData.dueDate)}</span>
                  }
                  labelSize="text-[10px] sm:text-xs" // Extra small label for this compact area
                  className="flex flex-col items-start"
                  labelSlot={<CalendarDaysIcon className="h-3 w-3 sm:h-4 mr-1 text-primary inline-block mb-0.5" />}
                />
                <LabelValueDisplay
                  label="Minimum Payment"
                  valueSlot={
                    <span className="text-lg lg:text-2xl font-semibold text-red-700">{formatCurrency(cardData.minPayment)}</span>
                  }
                  labelSize="text-[10px] sm:text-xs" // Extra small label
                  className="flex flex-col items-start"
                  labelSlot={<CurrencyDollarIcon className="h-3 w-3 sm:h-4 mr-1 text-red-600 inline-block mb-0.5" />}
                />
                <LabelValueDisplay
                  label="Statement Balance"
                  valueSlot={
                    <span className="text-lg lg:text-2xl font-semibold text-blue-700">{formatCurrency(cardData.statementBalance)}</span>
                  }
                  labelSize="text-[10px] sm:text-xs" // Extra small label
                  className="flex flex-col items-start"
                  labelSlot={<ReceiptPercentIcon className="h-3 w-3 sm:h-4 mr-1 text-blue-600 inline-block mb-0.5" />}
                />
              </div> {/* Correct closing tag for the grid div */}

              {/* Scheduled Payment Info - Adjusted Sizes */}
              {cardData.scheduledPayment ? (
                <div className="mb-6 lg:mb-8 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-md text-[11px] sm:text-xs lg:text-sm text-blue-700 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p><span className="font-semibold">Payment Scheduled:</span> {formatCurrency(cardData.scheduledPayment.amount)} ({cardData.scheduledPayment.type})</p>
                    <p>Scheduled Date: {formatDate(cardData.scheduledPayment.date)}</p>
                    <p>From Account: ...{mockBankAccounts.find(acc => acc.id === cardData.scheduledPayment.accountId)?.accountNumber.slice(-4) || 'N/A'}</p>
                  </div>
                  <button onClick={handleCancelScheduledPayment} className="mt-2 sm:mt-0 text-red-600 hover:text-red-800 underline text-[11px] sm:text-xs font-medium self-start sm:self-center">
                    Cancel Payment
                  </button>
                </div>
              ) : (
                 // Show success message if just scheduled
                 showPaymentSuccess && (
                    <div className="mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-md text-xs sm:text-sm flex items-center">
                        <CheckCircleIcon className="h-4 sm:h-5 mr-1 sm:mr-2 text-green-600" />
                        Payment successfully scheduled!
                    </div>
                 )
              )}

              {/* Make Payment / Schedule Payment Section - Adjusted Sizes */}
              {!cardData.scheduledPayment && !showPaymentSuccess && ( // Hide section if payment was just scheduled
                <div className="mb-6 lg:mb-8 p-4 md:p-6 border border-neutral-200 rounded-md">
                  {/* Heading Adjusted */}
                  <h4 className="text-md sm:text-lg font-semibold text-neutral-darker mb-3 md:mb-4">Schedule a Payment</h4>
                  {/* Paragraph Adjusted */}
                  <p className="text-sm sm:text-base text-neutral-dark mb-3 md:mb-4">Select amount to pay by {formatDate(cardData.dueDate)}:</p>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4 lg:mb-6">
                    {/* Radio Option 1: Minimum Payment - Label Adjusted */}
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="Minimum"
                        checked={paymentTypeToSchedule === 'Minimum'}
                        onChange={(e) => setPaymentTypeToSchedule(e.target.value)}
                        className="form-radio h-3 w-3 sm:h-4 text-primary focus:ring-primary border-neutral-300"
                      />
                      <span className="text-[11px] sm:text-xs lg:text-sm">
                        Minimum: <span className="font-semibold">{formatCurrency(cardData.minPayment)}</span>
                      </span>
                    </label>
                    {/* Radio Option 2: Statement Balance - Label Adjusted */}
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentType"
                        value="Statement Balance"
                        checked={paymentTypeToSchedule === 'Statement Balance'}
                        onChange={(e) => setPaymentTypeToSchedule(e.target.value)}
                        className="form-radio h-3 w-3 sm:h-4 text-primary focus:ring-primary border-neutral-300"
                      />
                      <span className="text-[11px] sm:text-xs lg:text-sm">
                        Statement Balance: <span className="font-semibold">{formatCurrency(cardData.statementBalance)}</span>
                      </span>
                    </label>
                    {/* TODO: Add 'Other Amount' option later */}
                  </div>

                  {/* Bank Account Dropdown - Label and Select Adjusted */}
                  <div className="mb-4 lg:mb-6">
                    <label htmlFor="bankAccount" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">Pay From:</label>
                    <select
                        id="bankAccount"
                        name="bankAccount"
                        value={selectedPaymentAccount}
                        onChange={(e) => setSelectedPaymentAccount(e.target.value)}
                        className="mt-1 block w-full max-w-xs pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md shadow-sm"
                    >
                        <option value="">Select Bank Account</option>
                        {mockBankAccounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.type} (...{account.accountNumber.slice(-4)})
                            </option>
                        ))}
                    </select>
                  </div>

                  {/* Button Adjusted */}
                  <button
                    onClick={handleSchedulePayment}
                    disabled={!selectedPaymentAccount || !paymentTypeToSchedule}
                    className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CalendarDaysIcon className="h-4 sm:h-5 mr-2" />
                    Schedule Payment
                  </button>
                </div>
              )}

              {/* Autopay Setup Section - Adjusted Sizes */}
              <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 lg:mb-4">
                  {/* Heading Adjusted */}
                  <h4 className="text-md sm:text-lg font-semibold text-neutral-darker mb-2 sm:mb-0">Automatic Payments</h4>
                  <div className="flex items-center space-x-3">
                    {/* Status Indicator Adjusted */}
                    <span className={`text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block ${cardData.autoPayEnabled ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
                        Autopay is {cardData.autoPayEnabled ? 'ON' : 'OFF'}
                    </span>
                    <Switch
                      checked={cardData.autoPayEnabled || false}
                      onChange={handleToggleAutoPay}
                      className={`${cardData.autoPayEnabled ? 'bg-primary' : 'bg-neutral-200'}
                        relative inline-flex h-5 w-9 lg:h-6 lg:w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer`}
                    >
                      <span className="sr-only">Toggle Automatic Payments</span>
                      <span
                          className={`${cardData.autoPayEnabled ? 'translate-x-5 lg:translate-x-6' : 'translate-x-1'}
                          inline-block h-3 w-3 lg:h-4 lg:w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>
                </div>

                {/* Autopay Configuration Options */}
                {/* (Show options whether enabled or not, allow configuration before enabling) */}
                <div className="mt-4 lg:mt-6 pt-4 border-t border-neutral-100">
                  {/* Paragraph Adjusted */}
                  <p className="text-sm sm:text-base text-neutral-dark mb-3 lg:mb-4">Automatically pay:</p>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                    {/* Radio Option 1: Minimum Payment - Label Adjusted */}
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="autoPaySelection"
                        value="Minimum"
                        checked={autoPaySelection === 'Minimum'}
                        onChange={(e) => handleAutoPayTypeChange(e.target.value)}
                        className="form-radio h-3 w-3 sm:h-4 text-primary focus:ring-primary border-neutral-300"
                        disabled={false} // Always allow selection change
                      />
                      <span className="text-[11px] sm:text-xs lg:text-sm">
                        Minimum Payment (<span className="font-semibold">{formatCurrency(cardData.minPayment)}</span>)
                      </span>
                    </label>
                    {/* Radio Option 2: Statement Balance - Label Adjusted */}
                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="autoPaySelection"
                        value="Statement Balance"
                        checked={autoPaySelection === 'Statement Balance'}
                        onChange={(e) => handleAutoPayTypeChange(e.target.value)}
                        className="form-radio h-3 w-3 sm:h-4 text-primary focus:ring-primary border-neutral-300"
                        disabled={false} // Always allow selection change
                      />
                      <span className="text-[11px] sm:text-xs lg:text-sm">
                        Statement Balance (<span className="font-semibold">{formatCurrency(cardData.statementBalance)}</span>)
                      </span>
                    </label>
                  </div>

                   {/* Bank Account Dropdown for Autopay - Label and Select Adjusted */}
                  <div className="mt-4 lg:mt-6">
                    <label htmlFor="autopayBankAccount" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">From Account:</label>
                    <select
                        id="autopayBankAccount"
                        name="autopayBankAccount"
                        value={selectedAutopayAccount}
                        onChange={(e) => handleAutopayAccountChange(e.target.value)} // Use correct handler
                        className="mt-1 block w-full max-w-xs pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md shadow-sm"
                        disabled={false} // Always allow selection change
                    >
                        <option value="">Select Bank Account</option>
                        {mockBankAccounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.type} (...{account.accountNumber.slice(-4)})
                            </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
        )}
        </div>
      )}

      {/* Modals Section */}
      {showReportForm && (
        <ReportForm
          onSubmit={handleSubmitReport}
          onClose={() => setShowReportForm(false)}
          reportType={reportType}
          setReportType={setReportType}
          keepNumber={keepNumber}
          setKeepNumber={setKeepNumber}
          disputedTransactions={disputedTransactions}
          handleDisputeChange={handleDisputeChange}
          cardId={numericCardId}
        />
      )}

      {showTravelModal && (
        <TravelNotificationModal
          onClose={() => setShowTravelModal(false)}
          onSave={handleSaveTravelNotification}
        />
      )}

      <ConfirmationModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={handleWithdrawConfirm}
        title="Withdraw Rewards Balance"
        confirmText="Confirm Withdrawal"
        confirmButtonClass="bg-green-600 hover:bg-green-700 text-white"
        iconType="success" // Using success icon for withdrawal confirmation
      >
        {/* Placeholder for withdrawal details - Amount input and Bank Account select */}
        <p className="text-sm lg:text-base text-neutral-700 mb-4">
          Please confirm you wish to withdraw your current rewards balance of
          <strong className='text-green-700'> {formatCurrency(cardData?.rewardsBalance || 0)}</strong>.
        </p>

        {/* Bank Account Selector */}
        <div className="mt-4 lg:mt-6">
          <label htmlFor="bankAccountSelect" className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">Withdraw To:</label>
          <select
              id="bankAccountSelect"
              name="bankAccountSelect"
              value={selectedWithdrawalAccount}
              onChange={(e) => setSelectedWithdrawalAccount(e.target.value)}
              className="mt-1 block w-full max-w-xs pl-3 pr-10 py-1.5 sm:py-2 text-xs sm:text-base border-neutral-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:text-base rounded-md shadow-sm"
          >
              {mockBankAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                      {account.type} (...{account.accountNumber.slice(-4)})
                  </option>
              ))}
          </select>
        </div>

        <p className="text-xs lg:text-sm text-neutral-500 mt-4">
          (Amount input will be added here if needed.)
        </p>
      </ConfirmationModal>
    </div>
  );
}
export default CardDetailPage;