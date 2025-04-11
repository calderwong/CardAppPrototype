// Categories for consistency
export const CATEGORIES = {
  GROCERIES: 'Groceries',
  DINING: 'Dining Out',
  TRANSPORT: 'Transport',
  SHOPPING: 'Shopping',
  UTILITIES: 'Utilities',
  ENTERTAINMENT: 'Entertainment',
  TRAVEL: 'Travel',
  OTHER: 'Other',
};

// Enhanced Mock Transactions Data with Categories
export const mockTransactions = [
  // --- Card 1 Transactions (Mixed Dates) ---
  {
    id: 1,
    merchantName: 'Grocery Mart',
    amount: 75.50,
    date: '2025-04-09',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.GROCERIES,
    merchantAddress: '123 Market St, Anytown, CA 90210',
    merchantPhone: '555-123-4567',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    id: 3,
    merchantName: 'The Coffee Shop',
    amount: 5.75,
    date: '2025-04-08',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.DINING,
    merchantAddress: '789 Bean Ave, Anytown, CA 90210',
    merchantPhone: '555-111-2222',
    // No lat/lon for this one
  },
  {
    id: 6,
    merchantName: 'Movie Tickets Inc.',
    amount: 28.50,
    date: '2025-04-04',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.ENTERTAINMENT,
    merchantAddress: '1 Cinema Way, Anytown, CA 90210',
    merchantPhone: '555-333-4444',
    latitude: 34.0600,
    longitude: -118.2600
  },
  {
    id: 7,
    merchantName: 'Another Grocery Run',
    amount: 62.30,
    date: '2025-04-02',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.GROCERIES,
    merchantAddress: '123 Market St, Anytown, CA 90210',
    merchantPhone: '555-123-4567',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    id: 9,
    merchantName: 'Hardware Store',
    amount: 55.20,
    date: '2025-03-15',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.SHOPPING,
    merchantAddress: '1 Tool St, Anytown, CA 90210',
    merchantPhone: '555-888-9999',
  },
  {
    id: 10,
    merchantName: 'Bookstore Cafe',
    amount: 22.80,
    date: '2025-02-20',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.DINING,
    merchantAddress: '3 Read Lane, Anytown, CA 90210',
    merchantPhone: '555-777-6666',
  },
  {
    id: 11,
    merchantName: 'Airline Ticket',
    amount: 345.00,
    date: '2024-11-10',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.TRAVEL,
    merchantAddress: 'N/A - Online',
    merchantPhone: '800-FLY-HIGH',
  },
  {
    id: 12,
    merchantName: 'Streaming Service',
    amount: 15.99,
    date: '2024-07-01',
    status: 'Completed',
    cardId: 1,
    cardLast4: '1234',
    category: CATEGORIES.ENTERTAINMENT,
    merchantAddress: 'N/A - Online',
    merchantPhone: 'N/A',
  },

  // --- Card 2 Transactions (Mixed Dates) ---
  {
    id: 2,
    merchantName: 'Gas Station Plus',
    amount: 42.00,
    date: '2025-04-08',
    status: 'Pending',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.TRANSPORT,
    merchantAddress: '456 Fuel Rd, Anytown, CA 90210',
    merchantPhone: '555-987-6543',
    latitude: 34.0550,
    longitude: -118.2500
  },
  {
    id: 5,
    merchantName: 'Electricity Bill',
    amount: 95.00,
    date: '2025-04-05',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.UTILITIES,
    merchantAddress: 'N/A - Utility Co.',
    merchantPhone: '888-555-1212',
  },
  {
    id: 8,
    merchantName: 'Dinner with Friends',
    amount: 88.15,
    date: '2025-03-30',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.DINING,
    merchantAddress: '15 Eatery Place, Anytown, CA 90210',
    merchantPhone: '555-666-7777',
    latitude: 34.0480,
    longitude: -118.2450
  },
  {
    id: 13,
    merchantName: 'Pharmacy',
    amount: 25.60,
    date: '2025-04-01',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.OTHER,
    merchantAddress: '9 Health Way, Anytown, CA 90210',
    merchantPhone: '555-222-1111',
  },
  {
    id: 14,
    merchantName: 'Train Ticket',
    amount: 18.00,
    date: '2025-03-05',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.TRANSPORT,
    merchantAddress: 'Central Station, Anytown',
    merchantPhone: 'N/A',
  },
  {
    id: 15,
    merchantName: 'Clothing Store',
    amount: 78.50,
    date: '2025-01-15',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.SHOPPING,
    merchantAddress: '10 Fashion Ave, Anytown, CA 90210',
    merchantPhone: '555-444-3333',
  },
  {
    id: 16,
    merchantName: 'Gym Membership',
    amount: 50.00,
    date: '2024-09-01',
    status: 'Completed',
    cardId: 2,
    cardLast4: '5678',
    category: CATEGORIES.ENTERTAINMENT,
    merchantAddress: '20 Fit St, Anytown, CA 90210',
    merchantPhone: '555-121-2121',
  },

  // --- Card 3 Transactions (Mixed Dates) ---
  {
    id: 4,
    merchantName: 'Online Retailer X',
    amount: 129.99,
    date: '2025-04-07',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.SHOPPING,
    merchantAddress: 'N/A - Online',
    merchantPhone: '800-555-0000',
  },
  {
    id: 17,
    merchantName: 'Lunch Spot',
    amount: 14.75,
    date: '2025-04-03',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.DINING,
    merchantAddress: '30 Food St, Anytown, CA 90210',
    merchantPhone: '555-321-4321',
  },
  {
    id: 18,
    merchantName: 'Ride Share',
    amount: 11.20,
    date: '2025-03-22',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.TRANSPORT,
    merchantAddress: 'N/A - App',
    merchantPhone: 'N/A',
  },
  {
    id: 19,
    merchantName: 'Home Goods Store',
    amount: 99.00,
    date: '2025-02-10',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.SHOPPING,
    merchantAddress: '40 Decor Way, Anytown, CA 90210',
    merchantPhone: '555-999-8888',
  },
  {
    id: 20,
    merchantName: 'Concert Ticket',
    amount: 75.00,
    date: '2024-12-05',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.ENTERTAINMENT,
    merchantAddress: 'Music Hall, Anytown',
    merchantPhone: '555-MUSIC-GO',
  },
  {
    id: 21,
    merchantName: 'Internet Bill',
    amount: 65.00,
    date: '2024-08-15',
    status: 'Completed',
    cardId: 3,
    cardLast4: '9012',
    category: CATEGORIES.UTILITIES,
    merchantAddress: 'N/A - ISP',
    merchantPhone: '877-NET-FAST',
  },
];

export const mockCards = [
  {
    id: 1,
    fullCardNumber: '4123 4567 8901 1234',
    last4: '1234',
    cardHolder: 'Alice Wonderland',
    expiry: '12/26',
    cvv: '123',
    cardType: 'Visa',
    cardDesign: 'gradient-blue',
    status: 'Active',
    accountType: 'Debit',
  },
  {
    id: 2,
    fullCardNumber: '5555 6666 7777 5678',
    last4: '5678',
    cardHolder: 'Bob The Builder',
    expiry: '08/25',
    cvv: '456',
    cardType: 'Mastercard',
    cardDesign: 'gradient-purple',
    status: 'Active',
    accountType: 'Credit',
    paymentDueDate: '2025-05-01',
    minPaymentAmount: 31.55,
    statementBalance: 425.80,
    paymentHistory: [
      { date: '2025-04-02', amount: 29.00, type: 'Minimum' },
      { date: '2025-03-01', amount: 354.50, type: 'Statement' },
      { date: '2025-02-01', amount: 54.00, type: 'Other' },
    ],
    scheduledPayment: { amount: 31.55, type: 'Minimum', date: '2025-04-30' },
    autoPayEnabled: true,
    autoPayType: 'Minimum',
    rewardsRate: 0.015, // 1.5%
    rewardsBalance: 15.75, // ADDED SAMPLE BALANCE
    rewardsWithdrawalHistory: [],
  },
  {
    id: 3,
    fullCardNumber: '3710 123456 79012',
    last4: '9012',
    cardHolder: 'Charlie Chaplin',
    expiry: '01/27',
    cvv: '7890',
    cardType: 'Amex',
    cardDesign: 'gradient-green',
    status: 'Locked',
    accountType: 'Credit',
    paymentDueDate: '2025-05-01',
    minPaymentAmount: 37.10,
    statementBalance: 472.15,
    paymentHistory: [
      { date: '2025-04-02', amount: 31.00, type: 'Minimum' },
      { date: '2025-03-01', amount: 356.50, type: 'Statement' },
      { date: '2025-02-01', amount: 56.00, type: 'Other' },
    ],
    scheduledPayment: null,
    autoPayEnabled: false,
    autoPayType: null,
    rewardsRate: 0.015, // 1.5%
    rewardsBalance: 28.50, // ADDED SAMPLE BALANCE
    rewardsWithdrawalHistory: [],
  },
];

export const mockUser = {
  name: 'Cody W.',
};

// Mock Bank Accounts for Rewards Withdrawal
export const mockBankAccounts = [
  {
    id: 'chk1',
    type: 'Checking',
    accountNumber: '******1234',
    balance: 5420.11
  },
  {
    id: 'sav1',
    type: 'Savings',
    accountNumber: '******5678',
    balance: 12345.67
  }
];