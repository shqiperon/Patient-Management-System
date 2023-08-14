import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Indexdep() {
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    function FetchDepartments() {
        fetch("http://127.0.0.1:8000/api/departments")
            .then(response =>
                response.json()
            )
            .then(responseData =>
                setDepartments(responseData.departments)
            )
            .catch(error =>
                console.error(error)
            )
    }

    function DeleteDepartment(id) {
        fetch(`http://127.0.0.1:8000/api/departments/${id}`, { method: 'DELETE' })
            .then(() => {
                setDepartments(departments.filter(department => department.id !== id));
            })
            .catch(error => console.error(error));
    }

    useEffect(
        () => {
            try {
                FetchDepartments()
            } catch (e) {
                console.error(e)
            }
        }, []
    )

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            DeleteDepartment(id)
        }
    }

    const sendToEdit = (id) => {
        const edit = departments.find(department => department.id === id);
        if (edit) {
            navigate(`/doctorpages/department/edit/${id}`, { state: { edit } });
        }
    };

    return (
        <div className='container py-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Departments</h1>
                <div>
                    <Link to="/doctorpages/department/Create" className="btn btn-sm btn-outline-primary">
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
                            departments.map(
                                department => (
                                    <tr key={department.id}>
                                        <td>{department.id}</td>
                                        <td>{department.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() => sendToEdit(department.id)}
                                            >
                                                Edit
                                            </button>
                                            &nbsp;
                                            {
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(department.id)}
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

export default Indexdep;
