import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

function Editcategory() {

    const [inputs, setInputs] = useState({ name: '' })
    
    const { id } = useParams();

    useEffect(() => {
    getcategory();
}, []);

    function getcategory() {
    axios.get(`http://127.0.0.1:8000/api/category/${id}`).then(function(response){
        console.log(response.data);
        setInputs(response.data);
    });
}

    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values =>  ({...values, [name]: value}));
}

const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/category/${id}`, inputs).then(function(response){
        console.log(response.data);
    window.location.href = '/category/Indexc';
    });
}


return (
    <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit category</h1>
        <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => window.history.back()}
        >
        Back
        </button>
    </div>
    <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={inputs.name}
            onChange={handleChange}
            required
        />
        </div>
        
        <button type="submit" className="btn btn-sm btn-outline-secondary">
            Submit
        </button>
    </form>
    </div>
);
};

export default Editcategory;
