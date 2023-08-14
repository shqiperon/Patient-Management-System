import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Indexpr() {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/promotions')
      .then(response => response.json())
      .then(data => setPromotions(data.promotions))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      fetch(`http://127.0.0.1:8000/api/promotions/${id}`, { method: 'DELETE' })
        .then(() => {
          setPromotions(prevPromotions => prevPromotions.filter(promotion => promotion.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  const isSupportedFormat = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    // Add supported image file extensions here
    const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    return supportedExtensions.includes(extension);
  };


  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Promotions</h1>
        <Link to="/promotion/create" className="btn btn-sm btn-outline-primary">
          Create
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(promotion => (
              <tr key={promotion.id}>
                <td>{promotion.id}</td>
                <td>{promotion.title}</td>
                <td>{promotion.description}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/promotions/${promotion.image}`}
                    alt={promotion.title}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/promotion/edit/${promotion.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(promotion.id)}
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

export default Indexpr;
