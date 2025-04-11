import { useState } from 'react'; 
import { Routes, Route, Link, NavLink } from 'react-router-dom'; 
import './App.css';
import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/Auth/LoginPage.jsx'; 
import SignupPage from './pages/Auth/SignupPage.jsx'; 
import AddCardPage from './pages/AddCardPage.jsx'; 
import CardDetailPage from './pages/CardDetailPage.jsx'; 
import DocumentationPage from './pages/DocumentationPage.jsx'; 
import SettingsPage from './pages/SettingsPage.jsx'; 
import { mockCards } from './data/mockData.js';

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
    <div className="min-h-screen bg-neutral-light">
      {/* Basic Header/Nav Placeholder */}
      <header className="bg-primary shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          <Link to="/" className="hover:text-neutral-light transition duration-150">Card Management App</Link> 
        </h1>
        {/* Basic Navigation & View Toggle */}
        <nav className="flex items-center space-x-6">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-primary-dark p-1 rounded-lg">
            <button
              onClick={() => setViewMode('browser')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'browser' ? 'bg-white text-primary' : 'text-primary-lightest hover:bg-primary-light hover:text-white'}`}
            >
              Browser
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'mobile' ? 'bg-white text-primary' : 'text-primary-lightest hover:bg-primary-light hover:text-white'}`}
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
                className={({ isActive }) => `bg-red-700 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition ease-in-out duration-150 ${isActive ? 'bg-red-600' : ''}`}
              >
                Reference Docs
              </NavLink>
            </li>          
            <li>
              <NavLink 
                to="/settings" 
                className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary-dark text-white' : 'text-primary-lightest hover:bg-primary-dark hover:text-white'}`}
              >
                Settings
              </NavLink>
            </li>          
          </ul>
        </nav>
      </header>

      {/* Conditionally apply mobile frame */}
      {viewMode === 'mobile' ? (
        <div className="mt-6 mb-6 flex justify-center">
          {/* Outer frame */}
          <div className="w-[390px] h-[844px] border-[14px] border-black rounded-[50px] shadow-xl overflow-hidden bg-white relative">
            {/* Notch/Speaker area placeholder */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[30px] bg-black rounded-b-xl z-10 flex items-center justify-center">
              <div className="w-[60px] h-[6px] bg-neutral-700 rounded-full"></div> {/* Speaker grille */}
            </div>
            {/* Inner screen area */}
            <main className="p-4 h-full overflow-y-auto pt-[40px]"> {/* pt to account for notch */}
              <Routes>
                {/* Routes remain the same */}
                <Route path="/" element={<Dashboard cards={cards} />} />
                <Route path="/login" element={<LoginPage />} /> 
                <Route path="/signup" element={<SignupPage />} /> 
                <Route path="/add-card" element={<AddCardPage onAddCard={addCard} />} /> 
                <Route path="/card/:id" element={<CardDetailPage cards={cards} setCards={setCards} />} />
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
            <Route path="/" element={<Dashboard cards={cards} />} /> { /* Pass cards */ }
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/signup" element={<SignupPage />} /> 
            <Route path="/add-card" element={<AddCardPage onAddCard={addCard} />} /> { /* Pass addCard function */ }
            <Route path="/card/:id" element={<CardDetailPage cards={cards} setCards={setCards} />} /> { /* Pass cards and setCards */ }
            <Route path="/documentation" element={<DocumentationPage />} />        
            <Route path="/settings" element={<SettingsPage />} /> {/* Add Settings Route */}
          </Routes>
        </main>
      )}

      {/* Basic Footer Placeholder */}
      <footer className="bg-neutral-medium text-center p-2 text-sm text-neutral-dark mt-8">
        2025 Card Management Prototype
      </footer>
    </div>
  );
}

export default App;
