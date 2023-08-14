import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

function EditNews() {
  const [inputs, setInputs] = useState({ id: '', title: '', content: '', published_at: '' });
  const { id } = useParams();

  useEffect(() => {
    getNews();

  }, []);

  function getNews() {
    axios
      .get(`http://127.0.0.1:8000/api/news/${id}`)
      .then(function (response) {
        console.log(response.data);
        setInputs(response.data.news);
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
      .put(`http://127.0.0.1:8000/api/news/${id}`, inputs)
      .then(function (response) {
        console.log(response.data);
        window.location.href = '/doctorpages/news/indexnu';
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Edit News</h1>
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
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            className="form-control"
            value={inputs.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="published_at">Published At</label>
          <input
            type="text"
            name="published_at"
            id="published_at"
            className="form-control"
            value={inputs.published_at}
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
}

export default EditNews;
