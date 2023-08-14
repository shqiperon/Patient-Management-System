import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Indexs() {
    const [specialities, setspecialities] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/speciality')
            .then(response => response.json())
            .then(data => setspecialities(data.specialities))
            .catch(error => console.error(error));
    }, []);


    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this speciality?')) {
            fetch(`http://127.0.0.1:8000/api/speciality/${id}`, { method: 'DELETE' })
                .then(() => {
                    setspecialities(specialities.filter(speciality => speciality.id !== id));
                })
                .catch(error => console.error(error));
        }
    }

    const sendToEdit = (id) => {
        const edit = specialities.find(speciality => speciality.id === id);
        if (edit) {
            navigate(`/speciality/edit/${id}`, { state: { edit } });
        }
    };

    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>specialities</h1>
                <div>
                    <Link to="/speciality/Create" className="btn btn-sm btn-outline-primary">
                        Create
                    </Link>
                    &nbsp;
                    <Link to="/doctorpages/doctorhomepage" className="btn btn-sm btn-outline-primary">
                        Back
                    </Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialities.map(speciality => (
                            <tr key={speciality.id}>
                                <td>{speciality.id}</td>
                                <td>{speciality.name}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => sendToEdit(speciality.id)}
                                    >
                                        Edit
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(speciality.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Indexs;
