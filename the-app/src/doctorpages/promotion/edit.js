import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditPromotion() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: null
  });
  const { id } = useParams();

  useEffect(() => {
    getPromotion();
  }, []);

  function getPromotion() {
    axios
      .get(`http://127.0.0.1:8000/api/promotions/${id}`)
      .then(function (response) {
        const promotion = response.data.promotion;
        setInputs({
          title: promotion.title,
          description: promotion.description,
          image: null
        });
        console.log("Promotion:", promotion);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/promotions/${id}`, inputs)
      .then(function (response) {
        console.log(response.data);
        window.location.href = '/promotion/indexpr';
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  const handleImageChange = (event) => {
    setInputs({ ...inputs, image: event.target.files[0] });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit Promotion</h1>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            value={inputs.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleImageChange}            
          />
        </div>

        <button type="submit" className="btn btn-sm btn-outline-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPromotion;
