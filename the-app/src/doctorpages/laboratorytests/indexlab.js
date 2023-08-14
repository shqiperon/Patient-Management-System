import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Indexlab() {
    const [laboratorytests, setLaboratoryTests] = useState([]);
    const navigate = useNavigate();

    function FetchLaboratoryTests() {
        fetch("http://127.0.0.1:8000/api/laboratorytests")
            .then(response =>
                response.json()
            )
            .then(responseData =>
                setLaboratoryTests(responseData.laboratorytests)
            )
            .catch(error =>
                console.error(error)
            )
    }

    function DeleteLaboratoryTest(id) {
        fetch(`http://127.0.0.1:8000/api/laboratorytests/${id}`, { method: 'DELETE' })
            .then(() => {
                setLaboratoryTests(laboratorytests.filter(laboratorytest => laboratorytest.id !== id));
            })
            .catch(error => console.error(error));
    }

    useEffect(
        () => {
            try {
                FetchLaboratoryTests()
            } catch (e) {
                console.error(e)
            }
        }, []
    )

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this laboratorytest?')) {
            DeleteLaboratoryTest(id)
        }
    }

    const sendToEdit = (id) => {
        const edit = laboratorytests.find(laboratorytest => laboratorytest.id === id);
        if (edit) {
            navigate(`/doctorpages/laboratorytests/edit/${id}`, { state: { edit } });
        }
    };

    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Laboratory tests</h1>
                <div>
                    <Link to="/doctorpages/laboratorytests/Create" className="btn btn-sm btn-outline-primary">
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
                        {
                            laboratorytests.map(
                                laboratorytest => (
                                    <tr key={laboratorytest.id}>
                                        <td>{laboratorytest.id}</td>
                                        <td>{laboratorytest.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => sendToEdit(laboratorytest.id)}
                                            >
                                                Edit
                                            </button>
                                            &nbsp;
                                            {
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(laboratorytest.id)}
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

export default Indexlab;
