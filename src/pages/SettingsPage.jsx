import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  // Load token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('mapboxAccessToken');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

  const handleSaveToken = (e) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      localStorage.setItem('mapboxAccessToken', mapboxToken.trim());
      setSavedMessage('Token saved successfully!');
      // Clear message after a few seconds
      setTimeout(() => setSavedMessage(''), 3000);
    } else {
      localStorage.removeItem('mapboxAccessToken'); // Clear if input is empty
      setSavedMessage('Token removed.');
       setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const handleInputChange = (e) => {
    setMapboxToken(e.target.value);
     if (savedMessage) {
        setSavedMessage(''); // Clear message when user types again
     } 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-neutral-darker mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-neutral-light max-w-lg mx-auto">
        <h2 className="text-lg font-semibold text-primary-dark mb-4">Mapbox Configuration</h2>
        <p className="text-sm text-neutral-dark mb-4">
          Enter your Mapbox Access Token below. This is required for the travel notification destination autocomplete and map features. 
          You can get a free token from <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>.
        </p>
        
        <form onSubmit={handleSaveToken}>
          <div className="mb-4">
            <label htmlFor="mapboxToken" className="block text-sm font-medium text-neutral-dark mb-1">Mapbox Access Token</label>
            <input 
              type="text" 
              id="mapboxToken"
              value={mapboxToken}
              onChange={handleInputChange}
              placeholder="pk.eyJ1..."
              className="w-full p-2 border border-neutral-medium rounded-md focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
             <button 
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
             >
                Save Token
             </button>
             {savedMessage && (
                <span className="text-sm text-green-600 ml-4">{savedMessage}</span>
             )} 
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
