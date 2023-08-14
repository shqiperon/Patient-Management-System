import React, { useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctor: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a request to the server to insert the data into the Appointments table
    fetch('http://127.0.0.1:8000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Appointment created:', data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          doctor: '',
          message: ''
        });
        setSubmitted(true);
      })
      .catch(error => {
        console.error('Appointment creation failed:', error);
        // Handle error scenarios
      });
  };

  return (
    <div>
      {submitted ? (
        <p>Appointment request submitted. Thank you!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <MDBRow className='mb-4'>
            <MDBCol>
              <MDBInput
                id='name'
                label='First name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            wrapperClass='mb-4'
            type='email'
            id='email'
            label='Email'
            value={formData.email}
            onChange={handleChange}
            required
          />

          <MDBInput
            wrapperClass='mb-4'
            type='tel'
            id='phone'
            label='Phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <MDBInput
            wrapperClass='mb-4'
            id='doctor'
            label='Doctor'
            value={formData.doctor}
            onChange={handleChange}
            required
          />

          <MDBInput
            wrapperClass='mb-4'
            textarea
            id='message'
            rows={4}
            label='Appointment requests'
            value={formData.message}
            onChange={handleChange}
          />

          <MDBBtn className='mb-4' type='submit' block>
            Submit appointment request
          </MDBBtn>
          
          <MDBBtn href="/doctorpages/ShowAppointments" className='mb-4' type='submit' block>
            ShowAppointments
          </MDBBtn>
        </form>
      )}
    </div>
  );
}