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

// Banana Icon SVG Component
const BananaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
    <path d="M390.41,74.25C382.65,25.73,333.68-2.47,283.55,16.9,245.12,24.67,213.27,52.44,195.3,87.62c-38.4-28.08-94.83-3-95.67,45.82,0,.89,0,1.8,0,2.77-18.6,18.14-32,44.47-35.41,78.05-1.06,10.54-.93,20.19,0,29.32-40,44.79-58.93,97.07-58.07,149.46.67,41.76,25.44,79.13,66.19,79.13,8.27,0,17-.93,26.11-3,.53,3.86,6.67,14.4,30.31,23.07,29.71,10.94,73.64,7.47,109.6-26.53,11.07-10.4,21.2-22.54,30.13-36.54,22.08-6.13,75.09-29.19,127.82-85.55,37.07-39.47,36.81-69.31,29.32-85.55C449,228.9,406.41,176.19,390.41,74.25Zm40,174.57c5.6,12,5.33,36.14-27.47,71-46.67,50-95.14,73.46-118.42,81a8,8,0,0,0-4.46,3.68c-8.27,13.54-17.86,26-28.26,36-29.71,28-66.19,32.54-91.1,23.2-10.27-3.86-18.8-9.73-19.47-12.8a8.13,8.13,0,0,0-6.66-6c-11.47,2.53-21.61,3.6-30.28,3.6-32.54,0-52-31.07-52.54-63.48-1.06-65.75,28.93-121.24,56.4-152.45a8.14,8.14,0,0,0,2.13-6.93,128.78,128.78,0,0,1-.8-26c3.06-30.94,15.87-54.94,33.33-71.55a8.08,8.08,0,0,0,2.53-6c-.13-.93-.13-1.8-.13-2.54.66-35.2,41.2-53,69.12-28.4a8,8,0,0,0,11.47-1.33c15.33-34.27,45-62.24,79.76-68.64,42.15-16.27,82.55,7.74,89.22,48.8C412.41,159.18,437.48,227.95,430.41,248.82Z" fill="#FFD700"/>
    <path d="M357.6,217.75c-11.22,0-33.11-18.14-48-32.28C289.21,166.38,271.3,150,255.57,150a8,8,0,0,0,0,16c10.34,0,26.66,15.34,45.14,32.94C316.24,213.63,340.38,233.76,357.6,233.75a8,8,0,0,0,0-16Z" fill="#FFD700"/>
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

          {/* Footer with Banana Icon and Speech Bubble */}
          <footer className="bg-neutral-medium p-4 text-center text-sm text-neutral-dark mt-8 rounded-t-lg shadow-inner relative">
            <div className="mb-5 flex justify-center items-start">
              <div className="relative flex items-start">
                <div className="mr-2 mt-1">
                  <BananaIcon />
                </div>
                <div className="relative max-w-xs bg-white p-3 rounded-xl shadow-md">
                  <div className="absolute left-[-10px] top-[10px] w-0 h-0 border-t-[8px] border-r-[12px] border-b-[8px] border-transparent border-r-white"></div>
                  <p className="text-sm text-left font-medium">
                    "You gotta' be kidding me, WHO is going to pay $1M/yr for this? No idea, Harry, but you got a ways to go before you're a wizard like me ;)"
                  </p>
                  <p className="text-xs text-gray-500 text-right mt-1 italic">*inside_joke</p>
                </div>
              </div>
            </div>
            <div>2025 Card Management Prototype</div>
          </footer>
        </div>
      </ViewModeContext.Provider>
    </Router>
  );
}

export default App;
