import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Index() {
  const [product4s, setproduct4s] = useState([]);
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);




  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      const userData = JSON.parse(user);
      console.log(userData); // Add this line to check the userData object
      fetchUserName(userData.user.id); // Fetch the user's name based on their ID
      
    }
  }, []);



  const fetchUserName = (userId) => {
    // Make an API call to fetch the user's name based on their ID
    // Replace the API_ENDPOINT with the actual endpoint URL
    fetch(`http://127.0.0.1:8000/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
      })
      .catch((error) => {
        console.error('Error fetching user name:', error);
      });
  };

  



  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setName('');
  };
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/product4s')
      .then(response => response.json())
      .then(data => setproduct4s(data.product4s))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product4?')) {
      fetch(`http://127.0.0.1:8000/api/product4s/${id}`, { method: 'DELETE' })
        .then(() => {
          setproduct4s(product4s.filter(product4 => product4.id !== id));
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
    <div className='container py-4'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Oral care</h1>
        <Link to="/product4/create" className="btn btn-sm btn-outline-primary">
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
            {product4s.map(product4 => (
              <tr key={product4.id}>
                <td>{product4.id}</td>
                <td>{product4.name}</td>
                <td>{product4.category}</td>
                <td>{product4.price}</td>
                <td>{product4.qty}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000/storage/product4s/${product4.image}`}
                    alt={product4.name}
                    style={{ height: '90px' }}
                  />
                </td>
                <td>
                  <Link
                    to={`/product4/edit/${product4.id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(product4.id)}
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
