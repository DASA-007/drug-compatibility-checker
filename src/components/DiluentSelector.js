import React from 'react';
import '../styles/DiluentSelector.css';

function DiluentSelector({ selectedDiluent, setSelectedDiluent }) {
  const handleDiluentChange = (e) => {
    setSelectedDiluent(e.target.value);
  };

  return (
    <div className="diluent-selector">
      <h2>Select Diluent</h2>
      <div className="diluent-options">
        <label className={`diluent-option ${selectedDiluent === 'NS' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="diluent"
            value="NS"
            checked={selectedDiluent === 'NS'}
            onChange={handleDiluentChange}
          />
          <span className="diluent-label">Normal Saline (0.9% Sodium Chloride)</span>
        </label>
        
        <label className={`diluent-option ${selectedDiluent === 'WFI' ? 'selected' : ''}`}>
          <input
            type="radio"
            name="diluent"
            value="WFI"
            checked={selectedDiluent === 'WFI'}
            onChange={handleDiluentChange}
          />
          <span className="diluent-label">Water for Injection (WFI)</span>
        </label>
      </div>
    </div>
  );
}

export default DiluentSelector;
