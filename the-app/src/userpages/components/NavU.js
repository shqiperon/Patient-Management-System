import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavU() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const location = useLocation();

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
    window.location.href = '/'; // Redirect to the root page
  };

  // Check if the current location is within the userpages
  const isUserPage = location.pathname.includes('/userpages');
  

  if (!isUserPage) {
    return null; // Hide the navbar on other pages
  }



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container ">
        <Link className="navbar-brand" to="/">
          <span className="text-primary">One</span>-Health
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupport"
          aria-controls="navbarSupport"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupport">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/UserDashboard">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/staff/staffpage">
                Our Staff
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/Health-store/Healthpage">
                Our Pharmacy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/Appointments/showappointments">
                My Appointments
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/Appointments/showTestRequests">
                My Test Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/orders/orderview">
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/Cartview/cartview">
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userpages/news/seenews">
                News
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <span className="nav-link" data-testid="welcome-message">Welcome, {name}</span>
              ) : (
                <>
                  <Link className="nav-link" to="/userlogcreate/login">
                    Log in
                  </Link>
                  <Link className="nav-link" to="/userlogcreate/register">
                    Sign Up
                  </Link>
                </>
              )}
            </li>
          </ul>
          {isLoggedIn && (
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavU;
