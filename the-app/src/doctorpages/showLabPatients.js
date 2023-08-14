import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function ShowLabPatients() {
    const [showapproved, setapproved] = useState([]);
    const navigate = useNavigate();

    function FetchLabAppointments() {
        fetch('http://127.0.0.1:8000/api/showappointment')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setapproved(data.showappointment)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        FetchLabAppointments()
    }, []);

    const determineTest = (id) => {
        const appointment = showapproved.find(approve => approve.id === id);
        if (appointment) {
            navigate(`/doctorpages/determineTest/${id}`, { state: { appointment } });
        }
    };


    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Appointments that require laboratory tests</h2>
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
                            <th>Diagnose</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            showapproved && showapproved.length > 0 ? (
                                showapproved
                                    .filter(approve => approve.status.toLowerCase() === 'approved' && approve.treated.toLowerCase() === "yes" && approve.diagnose != null)
                                    .filter(approve => approve.diagnose.toLowerCase().includes('test') || approve.diagnose.toLowerCase().includes('lab'))
                                    .filter(approve => approve.note != 'laboratory test has been requested' && approve.note != 'your laboratory test is ready')
                                    .map(approve => (
                                        <tr key={approve.id}>

                                            <td>{approve.name}</td>
                                            <td>{approve.email}</td>
                                            <td>{approve.phone}</td>
                                            <td>{approve.doctor}</td>
                                            <td>{approve.date}</td>
                                            <td>{approve.message}</td>
                                            <td>{approve.status}</td>
                                            <td>{approve.diagnose}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => determineTest(approve.id)}
                                                >
                                                    Determine Test
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={9}>No lab patient items found.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowLabPatients