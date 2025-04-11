import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card.jsx'; 

// Helper function to format card number with spaces
const formatCardNumber = (value) => {
  const cleaned = value.replace(/\D+/g, ''); // Remove non-digits
  const matches = cleaned.match(/\d{1,4}/g); // Group into 4s
  return matches ? matches.join(' ') : '';
};

// Helper function to format expiry date (MM/YY)
const formatExpiryDate = (value) => {
  const cleaned = value.replace(/\D+/g, ''); // Remove non-digits
  if (cleaned.length >= 3) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

function AddCardPage({ onAddCard }) { 
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
    type: 'Visa', // Default or detect based on number
    cardType: 'credit', // Add cardType state, default to 'credit'
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on input name
    if (name === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      // Allow only digits for CVV
      formattedValue = value.replace(/\D+/g, '');
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation logic
    console.log('Submitting new card:', cardDetails);
    
    // Prepare data for submission (e.g., remove formatting)
    const submissionData = {
      ...cardDetails,
      number: cardDetails.number.replace(/\s+/g, ''), // Remove spaces for submission
      // Potentially split expiry into month/year
    };

    if (onAddCard) {
      onAddCard(submissionData); // Pass cleaned data
    }

    navigate('/');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-primary-dark mb-6">Add New Card</h2>

      {/* Card Preview uses formatted state directly */}
      <div className="mb-8 flex justify-center">
        <Card cardData={{
          last4: cardDetails.number.replace(/\s+/g, '').slice(-4), // Use cleaned number for last4
          holder: cardDetails.holder || 'Card Holder Name',
          expiry: cardDetails.expiry || 'MM/YY',
          type: cardDetails.type,
          cardType: cardDetails.cardType // Pass cardType to preview
        }} />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Card Number Input */}
          <div className="md:col-span-2">
            <label htmlFor="number" className="block text-sm font-medium text-neutral-dark mb-1">Card Number</label>
            <input
              type="text"
              id="number"
              name="number"
              required
              value={cardDetails.number} // Display formatted value
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono tracking-wider" // Added monospace font
              placeholder="0000 0000 0000 0000"
              maxLength={19} // 16 digits + 3 spaces
              inputMode="numeric" // Hint for numeric keyboard on mobile
            />
          </div>

          {/* Card Holder */}
          <div className="md:col-span-2">
            <label htmlFor="holder" className="block text-sm font-medium text-neutral-dark mb-1">Card Holder Name</label>
            <input
              type="text"
              id="holder"
              name="holder"
              required
              value={cardDetails.holder}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent uppercase" // Added uppercase style
              placeholder="NAME AS IT APPEARS ON CARD"
            />
          </div>

          {/* Expiry Date Input */}
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-neutral-dark mb-1">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              required
              value={cardDetails.expiry} // Display formatted value
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono" // Added monospace font
              placeholder="MM/YY"
              maxLength={5} // MM/YY
              inputMode="numeric"
            />
          </div>

          {/* CVV Input */}
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-neutral-dark mb-1">CVV</label>
            <input
              type="text" // Use text for masking or password for hiding
              id="cvv"
              name="cvv"
              required
              value={cardDetails.cvv}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono" // Added monospace font
              placeholder="123"
              maxLength={4}
              inputMode="numeric"
            />
          </div>
        </div>

        {/* Card Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-dark mb-2">Card Type</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="cardType"
                value="credit"
                checked={cardDetails.cardType === 'credit'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-primary focus:ring-primary border-neutral-medium"
              />
              <span className="ml-2 text-sm text-neutral-darker">Credit</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="cardType"
                value="debit"
                checked={cardDetails.cardType === 'debit'}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-primary focus:ring-primary border-neutral-medium"
              />
              <span className="ml-2 text-sm text-neutral-darker">Debit</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end space-x-3">
           <button
            type="button" 
            onClick={() => navigate('/')} 
            className="bg-neutral-medium hover:bg-neutral-dark text-neutral-darker font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Add Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCardPage;
