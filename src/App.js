import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import DrugSelector from './components/DrugSelector';
import DiluentSelector from './components/DiluentSelector';
import CompatibilityResults from './components/CompatibilityResults';
import Footer from './components/Footer';
import { useCompatibilityChecker } from './data/useCompatibilityChecker';

function App() {
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [selectedDiluent, setSelectedDiluent] = useState('NS'); // Default to Normal Saline
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  const { loading, error, checkCompatibility } = useCompatibilityChecker();

  const handleCheckCompatibility = () => {
    if (selectedDrugs.length === 0) return;
    
    const result = checkCompatibility(selectedDrugs, selectedDiluent);
    setCompatibilityResult(result);
  };

  return (
    <div className="App">
      <Header />
      <Disclaimer />
      <main className="app-content">
        {loading ? (
          <p>Loading drug compatibility data...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <DrugSelector 
              selectedDrugs={selectedDrugs} 
              setSelectedDrugs={setSelectedDrugs} 
            />
            <DiluentSelector 
              selectedDiluent={selectedDiluent} 
              setSelectedDiluent={setSelectedDiluent} 
            />
            <button 
              className="check-button" 
              onClick={handleCheckCompatibility}
              disabled={selectedDrugs.length === 0}
            >
              Check Compatibility
            </button>
            {compatibilityResult && (
              <CompatibilityResults result={compatibilityResult} />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
