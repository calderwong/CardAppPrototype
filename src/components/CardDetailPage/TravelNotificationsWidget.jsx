import React from 'react';
import TravelMap from "@/components/TravelMap";

// Assuming formatDateRange is a utility function passed as a prop or imported
// If imported, add: import { formatDateRange } from '../../utils/dateUtils'; // Example path

function TravelNotificationsWidget({ travelNotifications, formatDateRange }) {
  if (!travelNotifications || travelNotifications.length === 0) {
    return null; // Don't render anything if there are no notifications
  }

  return (
    <div className="mt-8 lg:mt-10 bg-blue-50 p-4 lg:p-6 rounded-lg border border-blue-200 shadow-sm">
      <h3 className="text-lg lg:text-2xl font-semibold text-blue-800 mb-3 lg:mb-4">Active Travel Notifications</h3>
      <ul className="space-y-2 lg:space-y-3">
        {travelNotifications.map(note => (
          <li key={note.id} className="text-sm lg:text-base text-blue-700 bg-white p-2 lg:p-4 rounded border border-blue-100">
            <strong className="block text-blue-900">{formatDateRange(note.startDate, note.endDate)}</strong>
            Destinations: {note.locations.map(loc => loc.label).join('; ')} 
          </li>
        ))}
      </ul>
      {/* Render the map below the list */} 
      <div className="mt-4 lg:mt-6">
        <TravelMap travelNotifications={travelNotifications} /> 
      </div>
    </div>
  );
}

export default TravelNotificationsWidget;
