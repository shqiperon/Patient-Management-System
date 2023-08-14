import React from "react";
import { useFormik } from "formik";

function CreateDep() {
  const formik = useFormik({
    initialValues: {
      name: ""
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);

      fetch("http://127.0.0.1:8000/api/departments", {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Redirect to the department index page
          window.location.href = "/doctorpages/department/Indexdep";
        })
        .catch((error) => console.error(error));
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      return errors;
    }
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create department</h1>
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
}

export default CreateDep;
