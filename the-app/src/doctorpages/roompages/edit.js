import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useFormik } from 'formik';

function EditRoom() {
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const { edit } = location.state || {};

  useEffect(() => {
    if (!edit) {
      getRoom();
    }
    getDepartments();
  }, []);

  const formik = useFormik({
    initialValues: {
      room_number: edit ? edit.room_number : '',
      status: edit ? edit.status : '',
      department: edit ? edit.department : '',
    },
    onSubmit: (values) => {
      axios.put(`http://127.0.0.1:8000/api/rooms/${id}`, values)
        .then(function (response) {
          console.log(response.data);
          window.location.href = '/doctorpages/roompages/Indexr';
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    validate: (values) => {
      const errors = {};

      if (!values.room_number) {
        errors.room_number = "Room number is required"
      }

      if (!values.status) {
        errors.status = "Status is required";
      }

      if (!values.department) {
        errors.department = "Department is required";
      }

      return errors;
    }
  });

  function getRoom() {
    axios.get(`http://127.0.0.1:8000/api/rooms/${id}`).then(function (response) {
      console.log(response.data);
    });
  }

  function getDepartments() {
    console.log("Fetching departments...");
    axios.get(`http://127.0.0.1:8000/api/departments`).then(function (response) {
      console.log(response.data);
      setDepartments(response.data.departments); // update the state with the response data
    });
  }

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs(values => ({ ...values, [name]: value }));
  // }

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.put(`http://127.0.0.1:8000/api/rooms/${id}`, inputs).then(function (response) {
  //     console.log(response.data);
  //     window.location.href = '/doctorpages/roompages/Indexr';
  //   });
  // }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Room</h1>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="room_number">Room Number</label>
          <input
            type="number"
            name="room_number"
            id="room_number"
            className={`form-control ${formik.touched.room_number && formik.errors.room_number ? 'is-invalid' : ''}`}
            value={formik.values.room_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.room_number && formik.errors.room_number ? (
            <div className="text-danger small">{formik.errors.room_number}</div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            id="status"
            className={`form-control ${formik.touched.status && formik.errors.status ? 'is-invalid' : ''}`}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.status && formik.errors.status ? (
            <div className="text-danger small">{formik.errors.status}</div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="Department">Departments</label>
          <select
            name="department"
            id="department"
            className={`form-control ${formik.touched.department && formik.errors.department ? 'is-invalid' : ''}`}
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a department</option>
            {Array.isArray(departments) && departments.map((department) => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
          {formik.touched.department && formik.errors.department ? (
            <div className="text-danger small">{formik.errors.department}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditRoom;