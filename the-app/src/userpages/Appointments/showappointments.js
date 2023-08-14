import React, { useState, useEffect } from 'react';

function ShowUserAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {            
            const userData = JSON.parse(user);
            console.log(userData); // Add this line to check the userData object         
            fetchUserAppointments(userData.user.id); //Fetch appointments based on userId
        }
    }, []);
    
    
    const fetchUserAppointments = (userId) => {
        // Make an API call to fetch the user's appointments based on their ID        
        fetch(`http://127.0.0.1:8000/api/appointments?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
            })
            .catch((error) => {
                console.error('Error fetching user appointments:', error);
            });
    };


    return (
      <div>
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>My appointments</h1>
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Docotor</th>
                                <th>Date</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Treated</th>
                                {appointments.some((appointment) => (appointment.diagnose && appointment.diagnose !== "") || (appointment.room_department && appointment.room_department !== "")) && (
                                    <th>Diagnose/Accomodation</th>
                                )}
                                {appointments.some(appointment => appointment.note !== null) && (
                                    <th>Note</th>
                                )}
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
                                                {/* Display 'diagnose' column if it is not null */}
                                                {appointments.some(appointment => (appointment.diagnose && appointment.diagnose !== "") || (appointment.room_department && appointment.room_department !== "")) ? (
                                                    <td>
                                                        {appointment.diagnose && appointment.diagnose !== "" ? (
                                                            appointment.diagnose
                                                        ) : (
                                                            // Display 'room_department' column if 'diagnose' is null and 'room_department' is not null
                                                            appointment.room_department && appointment.room_department !== "" ? (
                                                                appointment.room_department
                                                            ) : (
                                                                "------" // Display an empty string if both 'diagnose' and 'room_department' are null
                                                            )
                                                        )}
                                                    </td>
                                                ) : null}
                                                {appointments.some(appointment => appointment.note !== null) ? (
                                                    <td>{appointment.note !== null ? appointment.note : "------"}</td>
                                                ) : null}
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

export default ShowUserAppointments