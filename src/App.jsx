import React, { useState, createContext } from 'react'; 
import { HashRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'; 
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/Auth/LoginPage.jsx'; 
import SignupPage from './pages/Auth/SignupPage.jsx'; 
import AddCardPage from './pages/AddCardPage.jsx'; 
import CardDetailPage from './pages/CardDetailPage.jsx'; 
import DocumentationPage from './pages/DocumentationPage.jsx'; 
import SettingsPage from './pages/SettingsPage.jsx'; 
import TransactionDetailPage from './pages/TransactionDetailPage.jsx'; 
import { mockCards } from './data/mockData.js';

// GitHub Logo SVG Component
const GitHubLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// Create a context for view mode
export const ViewModeContext = createContext('browser');

function App() {
  // Centralized state for cards
  const [cards, setCards] = useState(mockCards); // Initialize with data from mockData.js
  const [viewMode, setViewMode] = useState('browser'); // State for view mode

  // Function to add a new card (basic implementation)
  const addCard = (newCardData) => {
    setCards(prevCards => [
      ...prevCards,
      { 
        ...newCardData, 
        id: prevCards.length > 0 ? Math.max(...prevCards.map(c => c.id)) + 1 : 1, // Simple ID generation
        // Add default/derived fields if needed
        fullNumber: `${newCardData.type === 'Amex' ? '3777 777777 ' : newCardData.number.substring(0,4) + ' **** **** '}${newCardData.last4 || newCardData.number.slice(-4)}`, // Example generation
        balance: '$0.00', // Default balance
        limit: '$1,000' // Default limit
      }
    ]);
  };

  return (
    <Router>
      <ViewModeContext.Provider value={viewMode}>
        <div className="min-h-screen bg-neutral-light">
          {/* Basic Header/Nav Placeholder */}
          <header className="bg-primary shadow-md p-4 flex justify-between items-center rounded-b-lg">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                <Link to="/" className="hover:text-neutral-light transition duration-150">Card Management App</Link> 
              </h1>
              
              {/* GitHub Link with Badge */}
              <a
                href="https://github.com/calderwong/CardAppPrototype"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-neutral-darker hover:bg-black text-white px-3 py-1 rounded-lg text-sm transition-all duration-200 shadow-sm"
              >
                <span className=""><GitHubLogo /></span>
                <span>GitHub</span>
                <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">v1.0</span>
              </a>
            </div>
            
            {/* Basic Navigation & View Toggle */}
            <nav className="flex items-center space-x-6">
              {/* View Mode Toggle - Improved visibility & rounded corners */}
              <div className="flex items-center space-x-2 bg-primary-dark p-1 rounded-xl shadow-sm">
                <button
                  onClick={() => setViewMode('browser')}
                  className={`px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 ${viewMode === 'browser' ? 'bg-white text-primary shadow-sm' : 'text-white bg-primary-dark hover:bg-primary-light'}`}
                >
                  Browser
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 ${viewMode === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-white bg-primary-dark hover:bg-primary-light'}`}
                >
                  Mobile
                </button>
              </div>

              {/* Original Nav Links */}
              <ul className="flex space-x-4">
                <li><Link to="/login" className="text-white hover:text-neutral-light transition duration-150">Login</Link></li>
                <li><Link to="/signup" className="text-white hover:text-neutral-light transition duration-150">Sign Up</Link></li>
                <li>
                  <NavLink
                    to="/documentation"
                    className={({ isActive }) => `bg-red-700 text-white hover:bg-red-600 px-3 py-2 rounded-xl text-sm font-medium transition ease-in-out duration-200 shadow-sm ${isActive ? 'bg-red-600' : ''}`}
                  >
                    Reference Docs
                  </NavLink>
                </li>          
                <li>
                  <NavLink 
                    to="/settings" 
                    className={({ isActive }) => `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary-dark text-white shadow-sm' : 'text-white hover:bg-primary-dark hover:text-white'}`}
                  >
                    Settings
                  </NavLink>
                </li>          
              </ul>
            </nav>
          </header>

          {/* Conditionally apply mobile frame - Soften corners */}
          {viewMode === 'mobile' ? (
            <div className="mt-6 mb-6 flex justify-center">
              {/* Outer frame - Softer corners and subtle shadow */}
              <div className="w-[390px] h-[844px] border-[14px] border-black rounded-[60px] shadow-2xl overflow-hidden bg-white relative transition-all duration-300">
                {/* Notch/Speaker area placeholder - Softer corners */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-2xl z-10 flex items-center justify-center">
                  <div className="w-[60px] h-[6px] bg-neutral-700 rounded-full"></div> {/* Speaker grille */}
                </div>
                {/* Inner screen area */}
                <main className="h-full overflow-y-auto pt-[40px]"> {/* Removed padding - let component handle it */}
                  <Routes>
                    {/* Routes remain the same */}
                    <Route path="/" element={<Dashboard cards={cards} />} />
                    <Route path="/login" element={<LoginPage />} /> 
                    <Route path="/signup" element={<SignupPage />} /> 
                    <Route path="/add-card" element={<AddCardPage onAddCard={addCard} />} /> 
                    <Route path="/card/:id" element={<CardDetailPage cards={cards} setCards={setCards} />} />
                    <Route path="/transaction/:id" element={<TransactionDetailPage />} /> 
                    <Route path="/documentation" element={<DocumentationPage />} />        
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            // Original Browser view layout
            <main className="p-4">
              <Routes>
                {/* Routes remain the same */}
                <Route path="/" element={<Dashboard cards={cards} />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/signup" element={<SignupPage />} /> 
                <Route path="/add-card" element={<AddCardPage onAddCard={addCard} />} /> 
                <Route path="/card/:id" element={<CardDetailPage cards={cards} setCards={setCards} />} />
                <Route path="/transaction/:id" element={<TransactionDetailPage />} />
                <Route path="/documentation" element={<DocumentationPage />} />        
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          )}

          {/* Basic Footer Placeholder - Softer corners */}
          <footer className="bg-neutral-medium text-center p-2 text-sm text-neutral-dark mt-8 rounded-t-lg shadow-inner">
            2025 Card Management Prototype
          </footer>
        </div>
      </ViewModeContext.Provider>
    </Router>
  );
}

export default App;
