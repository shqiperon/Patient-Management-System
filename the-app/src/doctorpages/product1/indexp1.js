import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [product1s, setproduct1s] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product1s')
      .then(response => response.json())
      .then(data => setproduct1s(data.product1s))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product1?')) {
      fetch(`http://127.0.0.1:8000/api/product1s/${id}`, { method: 'DELETE' })
        .then(() => {
          setproduct1s(product1s.filter(product1 => product1.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Pain&relief</h1>
        <Link to="/product1/create" className="btn btn-sm btn-outline-primary">
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
            {product1s.map(product1 => (
              <tr key={product1.id}>
                <td>{product1.id}</td>
                <td>{product1.name}</td>
                <td>{product1.category}</td>
                <td>{product1.price}</td>
                <td>{product1.qty}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/product1s/${product1.image}`}
                    alt={product1.name}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/product1/edit/${product1.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product1.id)}
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
