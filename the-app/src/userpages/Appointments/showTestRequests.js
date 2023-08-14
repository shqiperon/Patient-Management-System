import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ShowUserTestRequests() {
    const [testrequests, setTestRequests] = useState([]);

    const fetchUserTestRequests = (userId) => {
        // Make an API call to fetch the user's test requests based on their ID        
        fetch(`http://127.0.0.1:8000/api/getByUserId?userId=${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setTestRequests(data);
            })
            .catch((error) => {
                console.error('Error fetching user test requests:', error);
            });
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            console.log(userData); // Add this line to check the userData object            
            fetchUserTestRequests(userData.user.id); //Fetch test requests based on userId
        }
    }, []);

    return (
        <div>
            <div className='container py-4'>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Laboratory test requests</h1>
                    <Link to="/userpages/UserDashboard" className="btn btn-sm btn-outline-primary">
                        Back
                    </Link>
                </div>
                <div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>lab_technician</th>
                                    <th>status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    testrequests.map(
                                        testrequest => (
                                            <tr key={testrequest.id}>
                                                <td>{testrequest.name}</td>
                                                <td>{testrequest.lab_technician}</td>
                                                <td>{testrequest.status}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default ShowUserTestRequests;
