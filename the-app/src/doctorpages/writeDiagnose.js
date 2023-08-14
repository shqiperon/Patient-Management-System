import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

function WriteDiagnose() {

  const [inputs, setInputs] = useState({})
  const { id } = useParams();
  const location = useLocation();
  const { appointment } = location.state || {};


  useEffect(() => {
    if (appointment) {
      setInputs(appointment);
    } else {
      getWriteDiagnose();
    }
  }, []);

  function getWriteDiagnose() {
    axios.get(`http://127.0.0.1:8000/api/sendtoroom/${id}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (inputs.diagnose && inputs.diagnose.toLowerCase().includes('test')) {
      formData.append("note", inputs.note);
      axios.put(`http://127.0.0.1:8000/api/updatetable/${id}`, inputs)
        .then((response) => {
          console.log(response.data);
          // Update the 'note' column in the 'appointments' table
          axios.post(`http://127.0.0.1:8000/api/updateNoteInAdvance/${id}`, { note: inputs.note })
            .then((response) => {
              console.log(response.data);
              // Redirect to the lab patients page
              window.location.href = "/doctorpages/showApprovedAppointments";
            })
            .catch((error) => {
              console.error(error);
            });
        })
    } else {
      axios.put(`http://127.0.0.1:8000/api/updatetable/${id}`, inputs)
        .then(function (response) {
          console.log(response.data);
          window.location.href = '/doctorpages/showApprovedAppointments';
        });
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Write Diagnose</h1>
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
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={inputs.email || ''}
            readOnly
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
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="doctor">Doctor appointed to</label>
          <input
            type="text"
            name="doctor"
            id="doctor"
            className="form-control"
            value={inputs.doctor}
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="date">Date appointed to</label>
          <input
            type="date"
            name="date"
            id="date"
            className="form-control"
            value={inputs.date}
            readOnly
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="doctor">Message</label>
          <input
            type="text"
            name="message"
            id="message"
            className="form-control"
            value={inputs.message}
            readOnly
          />
        </div>
        <div className="form-outline">
          <label class="form-label" for="diagnose">Write the diagnosis for the patient needs </label>
          <textarea
            type="textarea"
            name="diagnose"
            id="diagnose"
            className="form-control"
            rows="4"
            value={inputs.diagnose}
            onChange={handleChange}
            required></textarea>          
        </div>
        <br />
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default WriteDiagnose