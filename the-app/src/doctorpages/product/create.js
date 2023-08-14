import React, { useState, useEffect } from "react";

function CreateP() {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/category")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("qty", qty);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Redirect to the product index page
        window.location.href = "/product/Indexp";
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Create product</h1>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Product Name</label>
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
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="qty">Quantity</label>
          <input
            type="number"
            name="qty"
            id="qty"
            className="form-control"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
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

export default CreateP;
