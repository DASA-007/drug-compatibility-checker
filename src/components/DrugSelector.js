import React, { useState, useEffect } from 'react';
import '../styles/DrugSelector.css';

function DrugSelector({ selectedDrugs, setSelectedDrugs }) {
  const [availableDrugs, setAvailableDrugs] = useState([
    'morphine', 'hydromorphone', 'fentanyl', 'methadone', 
    'midazolam', 'clonazepam', 'haloperidol', 'cyclizine', 
    'hyoscine butylbromide', 'glycopyrrolate'
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filteredSuggestions = availableDrugs
      .filter(drug => 
        !selectedDrugs.includes(drug) && 
        drug.toLowerCase().includes(inputValue.toLowerCase())
      );
    
    setSuggestions(filteredSuggestions);
  }, [inputValue, availableDrugs, selectedDrugs]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addDrug = (drug) => {
    if (selectedDrugs.length < 3 && !selectedDrugs.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const removeDrug = (drugToRemove) => {
    setSelectedDrugs(selectedDrugs.filter(drug => drug !== drugToRemove));
  };

  return (
    <div className="drug-selector">
      <h2>Select Drugs (1-3)</h2>
      
      <div className="selected-drugs">
        {selectedDrugs.length === 0 ? (
          <p className="no-drugs-message">No drugs selected</p>
        ) : (
          selectedDrugs.map((drug, index) => (
            <div key={index} className="selected-drug">
              <span>{drug}</span>
              <button 
                className="remove-drug-btn" 
                onClick={() => removeDrug(drug)}
                aria-label={`Remove ${drug}`}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      
      {selectedDrugs.length < 3 && (
        <div className="drug-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to search drugs..."
            className="drug-input"
            aria-label="Search for drugs"
          />
          
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((drug, index) => (
                <li 
                  key={index} 
                  onClick={() => addDrug(drug)}
                  className="suggestion-item"
                >
                  {drug}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default DrugSelector;
