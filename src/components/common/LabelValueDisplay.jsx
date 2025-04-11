import React from 'react';

// --- Helper Component for Label/Value Pairs --- 
// Moved from CardDetailPage for reusability
const LabelValueDisplay = ({ label, value, labelSize = 'text-[11px] sm:text-xs lg:text-sm', valueSize = 'text-sm sm:text-base', valueStyle = 'font-semibold', valueColor = 'text-neutral-darker', className = '', labelSlot, valueSlot }) => {
  // Conditionally render value or valueSlot
  const renderValue = valueSlot ? valueSlot : <p className={`${valueSize} ${valueStyle} ${valueColor}`}>{value}</p>;

  return (
    <div className={className}>
      <p className={`text-neutral-600 ${labelSize} mb-0.5`}> 
        {labelSlot} {/* Render icon or prefix if provided */}
        {label && <span className={labelSlot ? 'ml-1.5' : ''}>{label}</span>} {/* Add space if labelSlot exists */}
      </p>
      {renderValue}
    </div>
  );
};

export default LabelValueDisplay;
