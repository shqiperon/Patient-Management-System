import React, { useState} from "react";

function Createnurse() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("image", image);

  fetch("http://127.0.0.1:8000/api/nurses", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Redirect to the nurse index page
      window.location.href = "/nursepages/Indexn";
    })
    .catch((error) => console.error(error));
};

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create nurse</h1>
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
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
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



export default Createnurse;
