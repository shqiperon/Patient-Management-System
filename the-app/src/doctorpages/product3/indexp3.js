import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [product3s, setproduct3s] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product3s')
      .then(response => response.json())
      .then(data => setproduct3s(data.product3s))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product3?')) {
      fetch(`http://127.0.0.1:8000/api/product3s/${id}`, { method: 'DELETE' })
        .then(() => {
          setproduct3s(product3s.filter(product3 => product3.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Skincare</h1>
        <Link to="/product3/create" className="btn btn-sm btn-outline-primary">
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
            {product3s.map(product3 => (
              <tr key={product3.id}>
                <td>{product3.id}</td>
                <td>{product3.name}</td>
                <td>{product3.category}</td>
                <td>{product3.price}</td>
                <td>{product3.qty}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/product3s/${product3.image}`}
                    alt={product3.name}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/product3/edit/${product3.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product3.id)}
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
