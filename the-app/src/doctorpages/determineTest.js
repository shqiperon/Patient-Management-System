import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";


function DetermineTest() {

    const [inputs, setInputs] = useState({})
    const [name, setName] = useState({});
    const [laboratorytests, setLaboratoryTests] = useState([]);
    const [labtechnicians, setLabTechnicians] = useState([]);
    const [labtechnician, setLabTechnician] = useState([]);
    const [userId, setUserId] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const { appointment } = location.state || {};


    useEffect(() => {
        if (appointment) {
            setInputs(appointment);
            setUserId(appointment.user_id);
        } else {
            if (inputs.appointment_id) {
                getUserId(inputs.appointment_id);
            }
        }
        getLaboratoryTests();
    }, []);

    useEffect(() => {
        if (name) {
            const selectedLabTestObj = laboratorytests.find(test => test.name === name);
            if (selectedLabTestObj) {
                getLabTechnicians(selectedLabTestObj.name);
            }
        }
    }, [name, laboratorytests]);

    function getLaboratoryTests() {
        console.log("Fetching lab tests...");
        axios.get(`http://127.0.0.1:8000/api/laboratorytests`).then(function (response) {
            console.log(response.data);
            setLaboratoryTests(response.data.laboratorytests); // update the state with the response data
        });
    }

    function getLabTechnicians(testName) {
        console.log("Fetching lab tests...");
        axios.get(`http://127.0.0.1:8000/api/labtechnicians/by-speciality?speciality=${testName}`).then(function (response) {
            console.log(response.data);
            setLabTechnicians(response.data.labtechnicians); // update the state with the response data
        });
    }

    function getUserId(appointmentId) {
        axios.get(`http://127.0.0.1:8000/api/getUserId/${appointmentId}`)
            .then((response) => {
                setUserId(response.data.user_id);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("patient_name", inputs.name);
        formData.append("patient_phone", inputs.phone);
        formData.append("patient_email", inputs.email);
        formData.append("lab_technician", labtechnician);
        formData.append("user_id", userId); // Add user_id to the form data    
        formData.append("note", inputs.note); // Add the 'note' field to the form data

        axios.post("http://127.0.0.1:8000/api/testrequests", formData)
            .then((response) => {
                console.log(response.data);
                // Update the 'note' column in the 'appointments' table
                axios.post(`http://127.0.0.1:8000/api/updateNote/${id}`, { note: inputs.note })
                    .then((response) => {
                        console.log(response.data);
                        // Redirect to the lab patients page
                        window.location.href = "/doctorpages/showLabPatients";
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Select a laboratory test for the patient</h1>
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => window.history.back()}
                >
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="lab_test">Laboratory test</label>
                    <select
                        name="lab_test"
                        id="lab_test"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    >
                        <option value="">--select laboratory test--</option>
                        {Array.isArray(laboratorytests) && laboratorytests.map((laboratorytest) => (
                            <option key={laboratorytest.id}>
                                {laboratorytest.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="patient_name">Patient Name</label>
                    <input
                        type="text"
                        name="patient_name"
                        id="npatient_ame"
                        className="form-control"
                        value={inputs.name || ''}
                        readOnly
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="phone">Patient phone</label>
                    <input
                        type="number"
                        name="phone"
                        id="phone"
                        className="form-control"
                        value={inputs.phone || ''}
                        readOnly
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="email">Patient email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={inputs.email || ''}
                        readOnly
                    />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="lab_technician">Lab technicians available for laboratory test selected</label>
                    <select
                        name="lab_technician"
                        id="lab_technician"
                        className="form-control"
                        value={labtechnician}
                        onChange={(e) => setLabTechnician(e.target.value)}
                        required
                    >
                        <option value="">--select lab technician--</option>
                        {Array.isArray(labtechnicians) && labtechnicians.map((labtechnician) => (
                            <option key={labtechnician.id}>
                                {labtechnician.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-sm btn-outline-secondary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default DetermineTest