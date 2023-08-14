import React, { useEffect } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useFormik } from 'formik';

function EditDepartment() {

    const location = useLocation();
    const { edit } = location.state || {};
    const { id } = useParams();

    useEffect(() => {
        if (!edit) {
            getDepartments();
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            name: edit ? edit.name : '',
        },
        onSubmit: (values) => {
            axios
                .put(`http://127.0.0.1:8000/api/departments/${id}`, values)
                .then(function (response) {
                    console.log(response.data);
                    window.location.href = '/doctorpages/department/Indexdep';
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "Name is required";
            }

            return errors;
        }
    });


    function getDepartments() {
        axios.get(`http://127.0.0.1:8000/api/departments/${id}`).then(function (response) {
            console.log(response.data);
        });
    }
    
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Edit department</h1>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger small">{formik.errors.name}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-sm btn-outline-secondary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EditDepartment;
