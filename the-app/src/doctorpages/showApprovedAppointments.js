import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';



function ShowApprovedAppointments() {
    const [showapproved, setapproved] = useState([]);
    const navigate = useNavigate();

    function FetchApprovedAppointments() {
        fetch('http://127.0.0.1:8000/api/showappointment')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setapproved(data.showappointment)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        FetchApprovedAppointments()
    }, []);

    const sendToRoom = (id) => {
        const appointment = showapproved.find(approve => approve.id === id);
        if (appointment) {
            navigate(`/doctorpages/sendToRoom/${id}`, { state: { appointment } });
        }
    };

    const writeDiagnose = (id) => {
        const appointment = showapproved.find(approve => approve.id === id);
        if (appointment) {
            navigate(`/doctorpages/writeDiagnose/${id}`, { state: { appointment } });
        }
    };


    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column justify-content-between align-items-left mb-4">
                    <h1>Approved appointments</h1>
                    <h5>that need to be treated</h5>
                </div>
                <Link to="/doctorpages/doctorhomepage" className="btn btn-sm btn-outline-primary">
                    Back
                </Link>
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

                            showapproved && showapproved.length > 0 ? (
                                showapproved
                                    .filter(approve => approve.status.toLowerCase() === 'approved' && approve.treated.toLowerCase() === "no")
                                    .map(approve => (
                                        <tr key={approve.id}>

                                            <td>{approve.name}</td>
                                            <td>{approve.email}</td>
                                            <td>{approve.phone}</td>
                                            <td>{approve.doctor}</td>
                                            <td>{approve.date}</td>
                                            <td>{approve.message}</td>
                                            <td>{approve.status}</td>
                                            <td>{approve.treated}</td>
                                            <td>
                                                {
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => sendToRoom(approve.id)}
                                                    >
                                                        Send to Room
                                                    </button>

                                                }
                                                &nbsp;
                                                {
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => writeDiagnose(approve.id)}
                                                    >
                                                        Write diagnose
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={9}>No approved items found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowApprovedAppointments