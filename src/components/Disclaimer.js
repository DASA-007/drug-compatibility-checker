import React from 'react';
import '../styles/Disclaimer.css';

function Disclaimer() {
  return (
    <div className="disclaimer">
      <h2>Important Disclaimer</h2>
      <p>
        This tool provides information based on published compatibility data and is intended for reference only. 
        It does not replace clinical judgment, pharmacist consultation, or the need to consult official drug 
        monographs and local guidelines. Data may not be exhaustive or cover all concentrations/conditions. 
        Use with caution and verify critical information.
      </p>
    </div>
  );
}

export default Disclaimer;
