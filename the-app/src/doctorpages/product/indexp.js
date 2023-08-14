import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`, { method: 'DELETE' })
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <div className='container py-4'>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Vitamins and Supplements</h1>
          <Link to="/product/create" className="btn btn-sm btn-outline-primary">
          Create
          </Link>
        </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/products/${product.image}`}
                    alt={product.name}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/product/edit/${product.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
}

export default Index;
