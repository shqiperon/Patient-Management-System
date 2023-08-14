import React, { useEffect, useState } from 'react';

function Bestdoctor() {
  const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    fetchdoctors();
  }, []);

  const fetchdoctors = () => {
    fetch('http://127.0.0.1:8000/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        setdoctors(data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  };

  return (
    <div className="container py-4">
      <h1>Best doctors</h1>
      {doctors.length > 0 ? (
        <div className="doctor-container">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img src={doctor.image} alt={doctor.name} className="doctor-image" />
              <div className="doctor-info">
                <h5 className="doctor-name">{doctor.name}</h5>
                <p className="doctor-specialty">Specialty: {doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No doctors available.</p>
      )}
    </div>
  );
}

export default Bestdoctor;
