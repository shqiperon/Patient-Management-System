import React, { useEffect, useState } from 'react';

function BestNurse() {
  const [nurses, setNurses] = useState([]);

  useEffect(() => {
    fetchNurses();
  }, []);

  const fetchNurses = () => {
    fetch('http://127.0.0.1:8000/api/nurses')
      .then((response) => response.json())
      .then((data) => {
        setNurses(data);
      })
      .catch((error) => {
        console.error('Error fetching nurses:', error);
      });
  };

  return (
    <div className="container py-4">
      <h1>Best Nurses</h1>
      {nurses.length > 0 ? (
        <div className="nurse-container">
          {nurses.map((nurse) => (
            <div key={nurse.id} className="nurse-card">
              <img src={nurse.image} alt={nurse.name} className="nurse-image" />
              <div className="nurse-info">
                <h5 className="nurse-name">{nurse.name}</h5>
                <p className="nurse-specialty">Specialty: {nurse.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No nurses available.</p>
      )}
    </div>
  );
}

export default BestNurse;
