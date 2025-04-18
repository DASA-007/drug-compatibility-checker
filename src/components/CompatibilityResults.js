import React from 'react';
import '../styles/CompatibilityResults.css';

function CompatibilityResults({ result }) {
  return (
    <div className={`compatibility-results ${result.compatible ? 'compatible' : 'incompatible'}`}>
      <h2>Compatibility Results</h2>
      <div className="result-icon">
        {result.compatible ? '✓' : '✗'}
      </div>
      <div className="result-status">
        {result.compatible ? 'Compatible' : 'Incompatible'}
      </div>
      {result.message && (
        <p className="result-message">{result.message}</p>
      )}
      {result.notes && (
        <p className="result-notes">{result.notes}</p>
      )}
    </div>
  );
}

export default CompatibilityResults;
