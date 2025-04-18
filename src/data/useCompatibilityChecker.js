import React, { useState, useEffect } from 'react';
import compatibilityData from '../data/compatibility-data.json';

// Custom hook to fetch and process compatibility data
export const useCompatibilityChecker = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // In a real app, this would be a fetch call to an API
      // For this demo, we're using the imported JSON directly
      setData(compatibilityData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load compatibility data');
      setLoading(false);
    }
  }, []);

  const checkCompatibility = (drugs, diluent) => {
    if (!data || !drugs || drugs.length === 0 || !diluent) {
      return null;
    }

    // Sort drugs alphabetically to match the format in our dataset
    const sortedDrugs = [...drugs].sort();
    
    // First check for exact match in our dataset
    const exactMatch = data.combinations.find(combo => {
      if (combo.diluent !== diluent) return false;
      if (combo.drugs.length !== sortedDrugs.length) return false;
      
      // Check if all drugs match (they're already sorted)
      return JSON.stringify(combo.drugs.sort()) === JSON.stringify(sortedDrugs);
    });

    if (exactMatch) {
      return {
        compatible: exactMatch.compatible,
        message: exactMatch.compatible 
          ? 'These drugs are compatible in the selected diluent.' 
          : 'These drugs are NOT compatible in the selected diluent.',
        notes: exactMatch.notes
      };
    }

    // If no exact match for 2 or 3 drugs, check if any pair is incompatible
    if (sortedDrugs.length > 1) {
      for (let i = 0; i < sortedDrugs.length; i++) {
        for (let j = i + 1; j < sortedDrugs.length; j++) {
          const pairToCheck = [sortedDrugs[i], sortedDrugs[j]].sort();
          
          const pairMatch = data.combinations.find(combo => {
            if (combo.diluent !== diluent) return false;
            if (combo.drugs.length !== 2) return false;
            return JSON.stringify(combo.drugs.sort()) === JSON.stringify(pairToCheck);
          });

          if (pairMatch && !pairMatch.compatible) {
            return {
              compatible: false,
              message: `${pairToCheck[0]} and ${pairToCheck[1]} are NOT compatible in the selected diluent.`,
              notes: pairMatch.notes
            };
          }
        }
      }
    }

    // If we have no data on this combination
    return {
      compatible: null,
      message: 'No compatibility data available for this combination.',
      notes: 'Please consult a pharmacist or official drug references.'
    };
  };

  return { data, loading, error, checkCompatibility };
};

export default useCompatibilityChecker;
