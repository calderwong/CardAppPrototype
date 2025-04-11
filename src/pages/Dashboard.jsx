import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, LabelList
} from 'recharts';

import Card from '../components/Card/Card.jsx';
import TransactionList from '../components/TransactionList';
import { CATEGORIES, mockTransactions } from '../data/mockData.js';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

// Colors for the Pie Chart slices
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF5733'];

// Mock Monthly Time Series Spending Data
const generateMonthlyTimeSeriesData = (transactions = mockTransactions) => {
  const data = [];
  const today = new Date();
  // Generate for 13 months back to ensure T12M has 12 full previous months
  for (let i = 12; i >= 0; i--) { 
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    // Use a stable format, display formatting happens later
    const monthStr = date.toISOString().slice(0, 7); // YYYY-MM
    const card1Spend = transactions.filter(t => t.cardId === 1).filter(t => t.date.startsWith(monthStr)).reduce((sum, t) => sum + t.amount, 0);
    const card2Spend = transactions.filter(t => t.cardId === 2).filter(t => t.date.startsWith(monthStr)).reduce((sum, t) => sum + t.amount, 0);
    const card3Spend = transactions.filter(t => t.cardId === 3).filter(t => t.date.startsWith(monthStr)).reduce((sum, t) => sum + t.amount, 0);
    data.push({
      month: monthStr, 
      card1: card1Spend,
      card2: card2Spend,
      card3: card3Spend,
      total: card1Spend + card2Spend + card3Spend,
    });
  }
  return data;
};
const monthlyTimeSeriesData = generateMonthlyTimeSeriesData();

// Mock Daily Time Series Spending Data (Last ~65 Days)
const generateDailyTimeSeriesData = (transactions = mockTransactions) => {
  const data = [];
  const today = new Date();
  for (let i = 65; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10); // YYYY-MM-DD
    const card1Spend = transactions.filter(t => t.cardId === 1).filter(t => t.date === dateStr).reduce((sum, t) => sum + t.amount, 0);
    const card2Spend = transactions.filter(t => t.cardId === 2).filter(t => t.date === dateStr).reduce((sum, t) => sum + t.amount, 0);
    const card3Spend = transactions.filter(t => t.cardId === 3).filter(t => t.date === dateStr).reduce((sum, t) => sum + t.amount, 0);
    data.push({
      dateStr: dateStr,
      card1: card1Spend,
      card2: card2Spend,
      card3: card3Spend,
      total: card1Spend + card2Spend + card3Spend,
    });
  }
  return data;
};
const dailyTimeSeriesData = generateDailyTimeSeriesData();

// Card colors for Line Chart
const LINE_COLORS = { card1: '#8884d8', card2: '#82ca9d', card3: '#ffc658', total: '#ff7300' }; 

const monthlyGoal = 1500; // Example goal

function Dashboard({ cards, filterCardId = null }) { 
  // State to manage which transaction is expanded
  const [expandedTransactionId, setExpandedTransactionId] = useState(null);
  // State for line chart timeframe
  const [timeframe, setTimeframe] = useState('TM'); // TM, LM, LQ, T12M
  // State for budget category filtering
  const [selectedBudgetCategory, setSelectedBudgetCategory] = useState(null);

  // Function to toggle transaction expansion
  const toggleTransaction = (id) => {
    setExpandedTransactionId(prevId => (prevId === id ? null : id));
  };

  // Helper to get date boundaries for timeframes
  const getTimeframeBoundaries = (timeframe) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed
    const currentDate = today.getDate();

    let startDate, endDate;

    switch (timeframe) {
      case 'TM': 
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = today; // Up to today
        break;
      case 'LM':
        startDate = new Date(currentYear, currentMonth - 1, 1);
        endDate = new Date(currentYear, currentMonth, 0); // Last day of last month
        break;
      case 'LQ':
        startDate = new Date(currentYear, currentMonth - 3, 1);
        endDate = new Date(currentYear, currentMonth, 0); // Use transactions up to end of last month
        break;
      case 'T12M':
      default:
        startDate = new Date(currentYear, currentMonth - 12, 1);
        endDate = new Date(currentYear, currentMonth, 0); // Use transactions up to end of last month
        break;
    }

    // Return dates adjusted for timezone comparison (using ISO strings ensures consistency)
    // Ensure end date includes the entire day
    endDate.setHours(23, 59, 59, 999);
  
    return {
      startStr: startDate.toISOString().slice(0, 10),
      endStr: endDate.toISOString().slice(0, 10),
    };
  };

  // --- Filter transactions by card ID *first* if filterCardId is provided --- START ---
  const baseTransactions = useMemo(() => {
    if (filterCardId !== null) {
      return mockTransactions.filter(t => t.cardId === filterCardId);
    }
    return mockTransactions; // Use all transactions if no filter
  }, [filterCardId]);
  // --- Filter transactions by card ID *first* if filterCardId is provided --- END ---

  // --- Dynamic Data Calculation based on Timeframe (using baseTransactions) --- 

  // 1. Filter transactions based on the selected timeframe
  const timeFilteredTransactions = useMemo(() => {
    const { startStr, endStr } = getTimeframeBoundaries(timeframe);
    // Filter base (potentially card-filtered) transactions by date
    return baseTransactions.filter(t => {
      const transactionDate = t.date; // Already YYYY-MM-DD
      return transactionDate >= startStr && transactionDate <= endStr;
    });
  }, [timeframe, baseTransactions]); // Depend on baseTransactions

  // 2. Calculate budget data for Pie Chart from filtered transactions
  const budgetDataForPeriod = useMemo(() => {
    const categoryTotals = timeFilteredTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(categoryTotals)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0); // Only show categories with spending in the period

  }, [timeFilteredTransactions]);

  // 3. Calculate total spending for the summary text from filtered transactions
  const totalSpendingForPeriod = useMemo(() => {
    return timeFilteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  }, [timeFilteredTransactions]);

  // Filter transactions for the selected budget category
  const filteredBudgetTransactions = selectedBudgetCategory
    ? timeFilteredTransactions.filter(t => t.category === selectedBudgetCategory)
    : timeFilteredTransactions; // If no category selected, use time-filtered list

  // Find card details for legend - simple lookup assuming IDs match keys
  const cardDetails = useMemo(() => {
    if (!cards) return {};
    return cards.reduce((acc, card) => {
      acc[card.id] = card; // Assuming card has an 'id'
      return acc;
    }, {});
  }, [cards]);

  // Helper function to get a readable label for the timeframe
  const timeframeLabel = (tf) => {
    switch (tf) {
      case 'TM': return 'This Month';
      case 'LM': return 'Last Month';
      case 'LQ': return 'Last Quarter';
      case 'T12M': return 'Last 12 Months';
      default: return '';
    }
  };

  // Helper to generate monthly aggregate spending data
  const generateMonthlyTimeSeriesData = (transactions) => {
    const monthlyData = {}; // Use object for easier aggregation: { 'YYYY-MM': amount }
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    twelveMonthsAgo.setDate(1); // Start from the beginning of that month
    const twelveMonthsAgoStr = twelveMonthsAgo.toISOString().slice(0, 7); // YYYY-MM

    transactions.forEach(t => {
      const monthKey = t.date.slice(0, 7); // YYYY-MM
      // Only include data from the last 12 months for this calculation
      if (monthKey >= twelveMonthsAgoStr) {
          monthlyData[monthKey] = (monthlyData[monthKey] || 0) + t.amount;
      }
    });

    // Convert to array and sort for the chart
    return Object.entries(monthlyData)
      .map(([dateStr, amount]) => ({ dateStr, amount }))
      .sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  };

  // Helper to generate daily aggregate spending data for the current/last month
  const generateDailyTimeSeriesData = (transactions) => {
    const dailyData = {}; // { 'YYYY-MM-DD': amount }
    const relevantTransactions = transactions.filter(t => {
        // Filter for roughly the last 60 days to cover TM and LM easily
        const date = new Date(t.date);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        return date >= sixtyDaysAgo;
    });

    relevantTransactions.forEach(t => {
      dailyData[t.date] = (dailyData[t.date] || 0) + t.amount;
    });

    // Convert to array and sort
    return Object.entries(dailyData)
      .map(([dateStr, amount]) => ({ dateStr, amount }))
      .sort((a, b) => a.dateStr.localeCompare(b.dateStr));
  };

  // Generate time series data using only the base transactions (already filtered by card if applicable)
  const monthlyTimeSeriesDataForCard = useMemo(() => generateMonthlyTimeSeriesData(baseTransactions), [baseTransactions]);
  const dailyTimeSeriesDataForCard = useMemo(() => generateDailyTimeSeriesData(baseTransactions), [baseTransactions]);

  // Process time series data based on selected timeframe
  const getChartData = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-indexed

    switch (timeframe) {
      case 'TM': {
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).toISOString().slice(0, 10);
        // Use data generated for the specific card (or all if no filter)
        return dailyTimeSeriesDataForCard.filter(d => d.dateStr >= firstDayOfMonth);
      }
      case 'LM': {
        const firstDayLastMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastDayLastMonth = new Date(currentYear, currentMonth, 0); // Day 0 of current month is last day of previous
        const startStr = firstDayLastMonth.toISOString().slice(0, 10);
        const endStr = lastDayLastMonth.toISOString().slice(0, 10);
        // Use data generated for the specific card (or all if no filter)
        return dailyTimeSeriesDataForCard.filter(d => d.dateStr >= startStr && d.dateStr <= endStr);
      }
      case 'LQ': {
        // Last 3 full months (monthly data)
        const firstMonthOfQuarter = new Date(currentYear, currentMonth - 3, 1).toISOString().slice(0, 7); // YYYY-MM
        const lastMonthOfQuarter = new Date(currentYear, currentMonth - 1, 1).toISOString().slice(0, 7); // YYYY-MM
        // Use data generated for the specific card (or all if no filter)
        return monthlyTimeSeriesDataForCard.filter(m => m.dateStr >= firstMonthOfQuarter && m.dateStr <= lastMonthOfQuarter);
      }
      case 'T12M':
      default:
        // Last 12 full months (monthly data)
        const firstMonthT12M = new Date(currentYear, currentMonth - 12, 1).toISOString().slice(0, 7); // YYYY-MM
        const lastMonthT12M = new Date(currentYear, currentMonth - 1, 1).toISOString().slice(0, 7); // YYYY-MM
        // Use data generated for the specific card (or all if no filter)
        return monthlyTimeSeriesDataForCard.filter(m => m.dateStr >= firstMonthT12M && m.dateStr <= lastMonthT12M);
    }
  };

  const chartData = getChartData();
  const isDailyView = timeframe === 'TM' || timeframe === 'LM';

  return (
    <div className="space-y-8"> {/* Main container div */} 
      {/* Top Cards - Only show if NOT on Card Detail Page */} 
      {!filterCardId && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <Link key={card.id} to={`/card/${card.id}`}>
              <Card cardData={card} />
            </Link>
          ))}
          {cards.length > 3 && (
             <div className="flex items-center justify-center bg-neutral-lightest p-4 rounded-lg shadow-sm border border-neutral-light">
                <Link to="/" className="text-sm font-medium text-primary hover:underline">View All Cards</Link>
            </div>
          )}
        </div>
      )}

      {/* Timeframe Selection */} 
      <div className="flex justify-end items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-neutral-dark">Spending Period:</span>
          {['TM', 'LM', 'LQ', 'T12M'].map((tf) => (
              <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      timeframe === tf ? 'bg-primary text-white' : 'bg-neutral-light text-neutral-dark hover:bg-neutral-medium'
                  }`}
              >
                  {tf === 'TM' ? 'This Month' : tf === 'LM' ? 'Last Month' : tf === 'LQ' ? 'Last Quarter' : 'Last 12 Months'}
              </button>
          ))}
      </div>


      {/* Charts Row */} 
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Budget Pie Chart - Takes up 2/5 width */} 
        <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-neutral-darker mb-1">Budget Breakdown</h3>
          <p className="text-sm text-neutral-dark mb-4">Total Spent ({timeframeLabel(timeframe)}): {formatCurrency(totalSpendingForPeriod)}</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetDataForPeriod}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onClick={(data) => setSelectedBudgetCategory(data.name)} // Set category on click
                className="cursor-pointer"
              >
                {budgetDataForPeriod.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
                 {/* External Labels */} 
                 <LabelList
                    dataKey="name"
                    position="outside"
                    offset={15}
                    formatter={(value) => value} // Display category name
                    className="text-xs fill-neutral-dark"
                  />
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
               <Legend
                 align="center" // Centered legend
                 verticalAlign="bottom" // Positioned below chart
                 iconType="circle" // Use circle icons
                 wrapperStyle={{ paddingTop: '20px' }} // Add some space above legend
                 formatter={(value, entry) => ( // Custom legend text
                    <span className="text-xs text-neutral-dark">{value} ({formatCurrency(entry.payload.value)})</span>
                  )}
                />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Timeline Chart - Takes up 3/5 width */} 
        <div className="lg:col-span-3 bg-white p-4 lg:p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-neutral-darker mb-6">Spending Over Time ({timeframeLabel(timeframe)})</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={getChartData()} // Use dynamically calculated chart data
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
              <XAxis
                dataKey="dateStr" // Use the pre-formatted date string
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={(tick) => {
                   // Basic formatting: Show MM/DD for daily, YYYY-MM for monthly
                   if (timeframe === 'TM' || timeframe === 'LM') return tick.slice(5); // MM-DD
                   return tick.slice(0, 7); // YYYY-MM
                }}
                angle={-30} // Angle ticks slightly if needed
                textAnchor="end"
                height={50} // Increase height to prevent overlap
                interval="preserveStartEnd" // Show first and last tick
              />
              <YAxis tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(value) => formatCurrency(value)} width={80} />
              <Tooltip formatter={(value) => formatCurrency(value)} labelFormatter={(label) => `Date: ${label}`}/>
              <Legend verticalAlign="top" height={36}/>
              <Line type="monotone" dataKey="amount" name="Spending" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conditionally render TransactionList ONLY IF NOT FILTERING BY CARD ID (i.e., on main dashboard) */} 
      {!filterCardId && (
        <div className="mt-8">
          {/* Add a header and clear button if a category is selected */} 
          {selectedBudgetCategory && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-neutral-darker">
                Transactions for: {selectedBudgetCategory}
              </h3>
              <button 
                onClick={() => setSelectedBudgetCategory(null)}
                className="text-sm text-primary hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}
          <TransactionList 
            transactions={filteredBudgetTransactions} 
            title={selectedBudgetCategory ? `Filtered Transactions` : "All Recent Transactions"} // Adjust title
          />
        </div>
      )}

      {/* Commented out redundant section
      {selectedBudgetCategory && (
        <div className="mt-8">
          <TransactionList 
            transactions={filteredBudgetTransactions} 
            title={`Transactions: ${selectedBudgetCategory}`}
          />
        </div>
      )}
      */}
    </div> // End Main container div
  );
}

export default Dashboard;
