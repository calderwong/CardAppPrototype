import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

function TravelNotificationModal({ onClose, onSave }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  // Store selected location objects { label, value, coordinates }
  const [selectedDestinations, setSelectedDestinations] = useState([null]);

  // --- Handlers for AsyncSelect ---
  const handleDestinationChange = (index, selectedOption) => {
    const newDestinations = [...selectedDestinations];
    newDestinations[index] = selectedOption; // Store the whole selected object
    setSelectedDestinations(newDestinations);
  };

  const addDestination = () => {
    setSelectedDestinations([...selectedDestinations, null]);
  };

  const removeDestination = (index) => {
    if (selectedDestinations.length > 1) { // Keep at least one
      const newDestinations = selectedDestinations.filter((_, i) => i !== index);
      setSelectedDestinations(newDestinations);
    }
  };

  // --- Mapbox Geocoding API Fetch --- 
  const loadOptions = debounce(async (inputValue, callback) => {
    const mapboxToken = localStorage.getItem('mapboxAccessToken'); // Read token from localStorage
    
    if (!inputValue || inputValue.length < 3 || !mapboxToken) { // Check if token exists
      callback([]);
      return;
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(inputValue)}.json?access_token=${mapboxToken}&autocomplete=true&types=place,locality,region,country`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const options = data.features.map(feature => ({
        label: feature.place_name, // Text displayed
        value: feature.id,        // Unique ID
        coordinates: feature.center // [longitude, latitude]
      }));
      callback(options);
    } catch (error) {
      console.error("Error fetching Mapbox suggestions:", error);
      callback([]);
    }
  }, 500); // Debounce requests

  const handleSave = () => {
    if (endDate && endDate < startDate) {
      alert('End date must be after start date.');
      return;
    }
    // Ensure at least one destination is selected and valid
    const validDestinations = selectedDestinations.filter(d => d && d.label && d.coordinates);
    if (validDestinations.length === 0) {
        alert('Please select at least one valid destination.');
        return;
    }

    onSave({
      id: Date.now(),
      startDate,
      endDate,
      // Pass the array of valid location objects 
      locations: validDestinations, 
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-darker">Add Travel Notification</h2>
          <button onClick={onClose} className="text-neutral-dark hover:text-neutral-darker">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-neutral-dark mb-4">
          Going somewhere? Let us know so we can ensure your card stays active as you travel.
        </p>

        {/* Date Range Picker */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-dark mb-1">Travel Dates</label>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            calendarClassName="rounded-lg border-none shadow-sm"
            dayClassName={() => "hover:bg-primary-lightest rounded-full"}
            todayButton="Today"
            minDate={new Date()} // Prevent selecting past dates
          />
          {/* Display selected dates for clarity */}
          <div className="text-xs text-neutral-dark mt-1">
            {startDate && `Start: ${startDate.toLocaleDateString()}`}
            {endDate && ` - End: ${endDate.toLocaleDateString()}`}
          </div>
        </div>

        {/* Destinations */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-dark mb-2">Destinations</label>
          {selectedDestinations.map((selectedOption, index) => (
            <div key={index} className="flex items-center mb-2">
              <AsyncSelect
                className="react-select-container flex-grow"
                classNamePrefix="react-select"
                cacheOptions
                loadOptions={loadOptions} 
                defaultOptions // Load some initial options if needed, or just wait for typing
                placeholder={`Search for Destination ${index + 1}...`}
                value={selectedOption}
                onChange={(e) => handleDestinationChange(index, e)}
                noOptionsMessage={({ inputValue }) => {
                  const token = localStorage.getItem('mapboxAccessToken');
                  if (!token) return "Mapbox token missing (Set in Settings)";
                  if (inputValue.length < 3) return "Keep typing...";
                  return "No results found";
                }} 
                styles={{ 
                    container: (base) => ({ ...base, width: '100%' }),
                    input: (base) => ({ ...base, paddingLeft: '0.5rem' }),
                    placeholder: (base) => ({ ...base, color: '#9ca3af' }), // Tailwind gray-400
                }}
              />
              {selectedDestinations.length > 1 && (
                <button
                  onClick={() => removeDestination(index)}
                  className="ml-2 text-red-500 hover:text-red-700 p-1"
                  title="Remove Destination"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addDestination}
            className="mt-1 text-sm text-primary hover:text-primary-dark flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" /> Add Another Destination
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-neutral-light hover:bg-neutral-medium text-neutral-darker font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Save Notification
          </button>
        </div>
      </div>
    </div>
  );
}

export default TravelNotificationModal;
