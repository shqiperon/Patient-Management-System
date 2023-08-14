import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

function EditNurse() {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const { edit } = location.state || {};

  useEffect(() => {
    if (edit) {
      setInputs(edit);
    } else {
      getnurse();
    }  
  }, []);

  function getnurse() {
    axios.get(`http://127.0.0.1:8000/api/nurses/${id}`).then(function(response){
      console.log(response.data);
      setInputs(response.data);
    });
  }
   const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values =>  ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/nurses/${id}`, inputs)
      .then(function(response) {
        console.log(response.data);
        window.location.href = '/nursepages/indexn';
      });
  }
  
  const handleImageChange = (event) => {
    setInputs(inputs => ({ ...inputs, image: event.target.files[0] }));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit nurse</h1>
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

export default EditNurse;
