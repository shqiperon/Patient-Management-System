import React, { useEffect, useState } from 'react';

function Besttechniclab() {
  const [techniclabs, settechniclabs] = useState([]);

  useEffect(() => {
    fetchtechniclabs();
  }, []);

  const fetchtechniclabs = () => {
    fetch('http://127.0.0.1:8000/api/techniclabs')
      .then((response) => response.json())
      .then((data) => {
        settechniclabs(data);
      })
      .catch((error) => {
        console.error('Error fetching techniclabs:', error);
      });
  };

  return (
    <div className="container py-4">
      <h1>Best techniclabs</h1>
      {techniclabs.length > 0 ? (
        <div className="techniclab-container">
          {techniclabs.map((techniclab) => (
            <div key={techniclab.id} className="techniclab-card">
              <img src={techniclab.image} alt={techniclab.name} className="techniclab-image" />
              <div className="techniclab-info">
                <h5 className="techniclab-name">{techniclab.name}</h5>
                <p className="techniclab-specialty">Specialty: {techniclab.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No techniclabs available.</p>
      )}
    </div>
  );
}

export default Besttechniclab;
