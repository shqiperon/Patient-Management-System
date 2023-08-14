import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Register = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data); // Handle the response data as needed
      window.location.href = '/';
      // Optionally, redirect the user to a different page or show a success message
    } catch (error) {
      console.error(error);
      // Handle error scenarios, e.g., display an error message to the user
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Register</h2>
                <Formik
                  initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                  onSubmit={handleSubmit}
                  validate={validateForm}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <Field type="text" id="name" name="name" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <Field type="email" id="email" name="email" className="form-control" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                      <Field
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;