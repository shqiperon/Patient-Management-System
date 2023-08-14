import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

function CreateRoom() {  
  const [departments, setDepartments] = useState([]);  

  const formik = useFormik({
    initialValues: {
      room_number: "",
      department: ""
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("room_number", values.room_number);
      formData.append("department", values.department);


      fetch("http://127.0.0.1:8000/api/rooms", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Redirect to the rooms index page
          window.location.href = "/doctorpages/roompages/Indexr";
        })
        .catch((error) => console.error(error));
    },
    validate: (values) => {
      const errors = {};

      if (!values.room_number) {
        errors.room_number = "Room number is required"
      }
      
      if (!values.department) {
        errors.department = "Department is required";
      }

      return errors;
    }
  });

  useEffect(() => {
    FetchDepartment();
  }, []);

  function FetchDepartment() {
    fetch('http://127.0.0.1:8000/api/departments')
      .then(response => response.json())
      .then(data => setDepartments(data.departments))
      .catch(error => console.error(error));
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Room</h1>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Room Number</label>
          <input
            type="text"
            name="room_number"
            id="name"
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
          <label htmlFor="department">Department</label>
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

export default CreateRoom;
