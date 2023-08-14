import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

function EditTechnician() {
  const [inputs, setInputs] = useState({});
  const [specialities, setSpecialities] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { edit } = location.state || {};

  useEffect(() => {
    if (edit) {
      setInputs(edit);
    } else {
      getTechnician();
    }
    getSpecialities();
  }, []);

  function getTechnician() {
    axios.get(`http://127.0.0.1:8000/api/labtechnicians/${id}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  function getSpecialities() {
    // Fetching specialities with the value based on the laboratory test name available
    console.log("Fetching specialities...");
    axios.get(`http://127.0.0.1:8000/api/laboratorytests`).then(function (response) {
      console.log(response.data);
      setSpecialities(response.data.laboratorytests); // update the state with the response data
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/labtechnicians/${id}`, inputs).then(function (response) {
      console.log(response.data);
      window.location.href = '/doctorpages/labtechnician/Indextech';
    });
  }

  const handleImageChange = (event) => {
    setInputs(inputs => ({ ...inputs, image: event.target.files[0] }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit lab technician</h1>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="form-control"
            value={inputs.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="speciality">Speciality</label>
          <select
            name="speciality"
            id="speciality"
            className="form-control"
            value={inputs.speciality}
            onChange={handleChange}
            required
          >
            <option value="">Select a speciality</option>
            {Array.isArray(specialities) && specialities.map((speciality) => (
              <option key={speciality.id} value={speciality.name}>
                {speciality.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditTechnician;
