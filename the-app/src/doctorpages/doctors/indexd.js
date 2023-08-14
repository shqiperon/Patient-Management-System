import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/doctors")
      .then((response) => response.json())
      .then((data) => setDoctors(data.doctors))
      .catch((error) => console.error(error));
  }, []);

  function DeleteDoctor(id) {
    fetch(`http://127.0.0.1:8000/api/doctors/${id}`, { method: 'DELETE' })
      .then(() => {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      })
      .catch(error => console.error(error));
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
        DeleteDoctor(id)
    }
}
  const sendToEdit = (id) => {
    const edit = doctors.find(doctor => doctor.id === id);
    if (edit) {
      navigate(`/doctorpages/doctors/edit/${id}`, { state: { edit } });
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Doctors List</h1>
        <div>
          <Link to="/doctorpages/doctors/Create" className="btn btn-sm btn-outline-primary">
            Create
          </Link>
          &nbsp;
          <Link to="/doctorpages/doctorhomepage" className="btn btn-sm btn-outline-primary">
            Back
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Speciality</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.speciality}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000/storage/doctors/${doctor.image}`}
                  alt={doctor.name}
                  style={{ height: "90px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => sendToEdit(doctor.id)}
                >
                  Edit
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsList;