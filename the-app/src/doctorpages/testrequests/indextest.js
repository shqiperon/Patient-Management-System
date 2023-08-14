import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


function IndexTest() {
    const [testrequests, setTestRequests] = useState([]);


    function FetchTestRequests() {
        fetch("http://127.0.0.1:8000/api/testrequests")
            .then(response =>
                response.json()
            )
            .then(responseData => {
                console.log(responseData);
                setTestRequests(responseData.testrequests) //depends on the json name you provided in index function
            })
            .catch(error =>
                console.error(error)
            )
    }

    function DeleteTestRequest(id) {
        fetch(`http://127.0.0.1:8000/api/testrequests/${id}`, { method: 'DELETE' })
            .then(() => {
                setTestRequests(testrequests.filter(testrequest => testrequest.id !== id));
            })
            .catch(error => console.error(error));
    }

    useEffect(
        () => {
            try {
                FetchTestRequests()
            } catch (e) {
                console.error(e)
            }
        }, []
    )

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this test request?')) {
            DeleteTestRequest(id)
        }
    }

    const testDone = (id) => {

        const formData = new FormData();
        formData.append("status", testrequests.status);

        // Update the 'status' column in the 'test_requests' table
        axios.post(`http://127.0.0.1:8000/api/updateStatus/${id}`, { status: testrequests.status })
            .then((response) => {
                console.log(response.data);
                // Redirect to the test requests index page
                window.location.href = "/doctorpages/testrequests/indextest";
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Laboratory test requests</h1>
                <Link to="/doctorpages/doctorhomepage" className="btn btn-sm btn-outline-primary">
                    Back
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>status</th>
                            <th>patient_name</th>
                            <th>patient_phone</th>
                            <th>patient_email</th>
                            <th>lab_technician</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            testrequests.map(
                                testrequest => (
                                    <tr key={testrequest.id}>
                                        <td>{testrequest.name}</td>
                                        <td>{testrequest.status}</td>
                                        <td>{testrequest.patient_name}</td>
                                        <td>{testrequest.patient_phone}</td>
                                        <td>{testrequest.patient_email}</td>
                                        <td>{testrequest.lab_technician}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => testDone(testrequest.id)}
                                                disabled={testrequest.status === 'laboratory test is ready'}
                                            >
                                                Mark as done
                                            </button>
                                            &nbsp;
                                            {
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(testrequest.id)}
                                                >
                                                    Delete
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default IndexTest;
