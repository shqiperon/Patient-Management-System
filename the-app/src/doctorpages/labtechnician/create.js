import React, { useState, useEffect } from "react";

function CreateTechnician() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialities, setspecialities] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [image, setImage] = useState(null);


  useEffect(() => {
    FetchSpeciality();
  }, []);

  function FetchSpeciality() {
    // Fetching specialities with the value based on the laboratory test name available
    fetch('http://127.0.0.1:8000/api/laboratorytests')
      .then(response => response.json())
      .then(data => setspecialities(data.laboratorytests))
      .catch(error => console.error(error));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("speciality", speciality); // <-- update this line
    formData.append("image", image);

    fetch("http://127.0.0.1:8000/api/labtechnicians", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Redirect to the doctor index page
        window.location.href = "/doctorpages/labtechnician/Indextech";
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create Lab technician</h1>
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
        <div className="form-group mb-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="phone"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="speciality">Speciality</label>
          <select
            name="speciality"
            id="speciality"
            className="form-control"
            value={speciality}
            onChange={(e) => setspeciality(e.target.value)}
            required
          >
            <option value="">Select a speciality</option>
            {Array.isArray(specialities) && specialities.map((speciality) => (
              <option key={speciality.id} value={speciality.name}>
                {speciality.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateTechnician;
