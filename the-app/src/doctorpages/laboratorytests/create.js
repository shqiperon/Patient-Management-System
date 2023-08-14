import React, { useState } from "react";

function CreateLabTest() {
    const [name, setName] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);

        fetch(
            "http://127.0.0.1:8000/api/laboratorytests", {
            method: "POST",
            body: formData
        }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Redirect to the department index page
                window.location.href = "/doctorpages/laboratorytests/Indexlab";
            })
            .catch((error) => console.error(error));
    };

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
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-sm btn-outline-secondary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateLabTest;
