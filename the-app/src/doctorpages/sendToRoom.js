import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";


function SendToRoom() {

  const [inputs, setInputs] = useState({})
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { appointment } = location.state || {};


  useEffect(() => {
    if (appointment) {
      setInputs(appointment);
    } else {
      getSendToRoom();
    }
    getFreeRooms();
  }, []);

  function getSendToRoom() {
    axios.get(`http://127.0.0.1:8000/api/sendtoroom/${id}`).then(function (response) {
      console.log(response.data);
      setInputs(response.data);
    });
  }

  function getFreeRooms() {
    console.log("Fetching rooms...");
    axios.get(`http://127.0.0.1:8000/api/rooms`).then(function (response) {
      console.log(response.data);
      setRooms(response.data.rooms); // update the state with the response data
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/updatetable/${id}`, inputs)
      .then(function (response) {
        console.log(response.data);
        window.location.href = '/doctorpages/showApprovedAppointments';
      });
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Select a room for the patient</h1>
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
          <label htmlFor="doctor">Date appointed to</label>
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
        <div className="form-group mb-2">
          <label htmlFor="room_department">Free rooms</label>
          <select
            name="room_department"
            id="room_department"
            className="form-control"
            value={inputs.room_department}
            onChange={handleChange}
            required
          >
            <option value="">--select a free room--</option>
            {Array.isArray(rooms) && rooms.filter(room => room.status === 'FREE').map((room) => (
              <option key={room.id}>
                {room.room_number} - {room.department}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default SendToRoom