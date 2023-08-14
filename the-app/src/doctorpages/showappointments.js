import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";



function ShowAppointments() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
          setIsLoggedIn(true);
          const userData = JSON.parse(user);
          console.log(userData); // Add this line to check the userData object
          fetchUserName(userData.user.id); // Fetch the user's name based on their ID
          
        }
      }, []);
    
    
    
      const fetchUserName = (userId) => {
        // Make an API call to fetch the user's name based on their ID
        // Replace the API_ENDPOINT with the actual endpoint URL
        fetch(`http://127.0.0.1:8000/api/users/${userId}`)
          .then((response) => response.json())
          .then((data) => {
            setName(data.name);
          })
          .catch((error) => {
            console.error('Error fetching user name:', error);
          });
      };
    
      
    
    
    
      const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setName('');
      };
    function FetchAppointments() {
        fetch('http://127.0.0.1:8000/api/showappointment')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAppointments(data.showappointment)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        FetchAppointments()
    }, []);

    const approve = (id) => {

        const formData = new FormData();
        formData.append("status", appointments.status);

        // Update the 'status' column in the 'appointments' table
        axios.get(`http://127.0.0.1:8000/api/approved/${id}`, { status: appointments.status })
            .then((response) => {
                console.log(response.data);
                // Redirect to the test requests index page
                window.location.href = "/doctorpages/showappointments";
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const cancel = (id) => {

        const formData = new FormData();
        formData.append("status", appointments.status);

        // Update the 'status' column in the 'appointments' table
        axios.get(`http://127.0.0.1:8000/api/canceled/${id}`, { status: appointments.status })
            .then((response) => {
                console.log(response.data);
                // Redirect to the test requests index page
                window.location.href = "/doctorpages/showappointments";
            })
            .catch((error) => {
                console.error(error);
            });
    };



    return (
        <div>
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Appointments</h1>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Customer name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Doctor appointed to </th>
                            <th>Date</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Treated</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            appointments && appointments.length > 0 ? (
                                appointments
                                    .map(appointment => (
                                        <tr key={appointment.id}>

                                            <td>{appointment.name}</td>
                                            <td>{appointment.email}</td>
                                            <td>{appointment.phone}</td>
                                            <td>{appointment.doctor}</td>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.message}</td>
                                            <td>{appointment.status}</td>
                                            <td>{appointment.treated}</td>
                                            <td>
                                                {
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => approve(appointment.id)}
                                                        disabled={appointment.status === 'approved'}
                                                    >
                                                        Approve
                                                    </button>

                                                }
                                                &nbsp;
                                                {
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => cancel(appointment.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={9}>No appointments items found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </div>

    );
}

export default ShowAppointments