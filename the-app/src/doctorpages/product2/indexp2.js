import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Indexp2() {
  const [product2s, setproduct2s] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product2s')
      .then(response => response.json())
      .then(data => setproduct2s(data.product2s))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product2?')) {
      fetch(`http://127.0.0.1:8000/api/product2s/${id}`, { method: 'DELETE' })
        .then(() => {
          setproduct2s(product2s.filter(product2 => product2.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Cold and flu</h1>
        <Link to="/product2/create" className="btn btn-sm btn-outline-primary">
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
            {product2s.map(product2 => (
              <tr key={product2.id}>
                <td>{product2.id}</td>
                <td>{product2.name}</td>
                <td>{product2.category}</td>
                <td>{product2.price}</td>
                <td>{product2.qty}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/product2s/${product2.image}`}
                    alt={product2.name}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/product2/edit/${product2.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product2.id)}
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

export default Indexp2;
