import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const shouldShowNavbar =
  location.pathname.startsWith('/doctorpages')||
  location.pathname.startsWith('/category') ||
  location.pathname.startsWith('/product') ||
  location.pathname.startsWith('/promotion') ||
  location.pathname.startsWith('/orders') ||
  location.pathname.startsWith('/speciality') ||
  location.pathname.startsWith('/doctorpages/labtechnician') ||
  location.pathname.startsWith('/nursepages') ||
  location.pathname.startsWith('/doctorpages/department') ||
  location.pathname.startsWith('/doctorpages/roompages') ||
  location.pathname.startsWith('/doctorpages/laboratorytests') ||
  location.pathname.startsWith('/doctorpages/testrequests');

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

  if (!shouldShowNavbar) {
    return null;
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="#">
            <span className="text-primary">One</span>-Health
          </a>

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
              <li className="nav-item active">
                <Link className="nav-link" to="/doctorpages/doctorhomepage">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown active">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  One-Health-store
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/category/indexc">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product/indexp">
                      Vitamins
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product1/indexp1">
                      Pain relief
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product2/indexp2">
                      Cold and flu
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product3/indexp3">
                      Skincare
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product4/indexp4">
                      Oral care
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/promotion/indexpr">
                  Promotions
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/doctorpages/news/indexnu">
                  News
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/orders/orderadminview">
                  Orders
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/doctorpages/showappointments">
                  Appointments
                </Link>
              </li>
              <li className="nav-item dropdown active">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Staff Management
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/speciality/indexs">
                      Speciality
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/doctors/Indexd">
                      Doctors
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/labtechnician/Indextech">
                      Lab Technicians
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/nursepages/Indexn">
                      Nurses
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Room Management
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/department/indexdep">
                      Departments
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/roompages/indexr">
                      Rooms
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Laboratory
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/laboratorytests/indexlab">
                      Laboratory tests
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/doctorpages/testrequests/indextest">
                      Lab test requests
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <span className="nav-link">Welcome, {name}</span>
                ) : (
                  <>
                    <Link className="nav-link" to="/users/login">
                      Log in
                    </Link>
                    <Link className="nav-link" to="/users/register">
                      Sign Up
                    </Link>
                  </>
                )}
              </li>
            </ul>
            {isLoggedIn && (
              <Link to="/" className="btn btn-primary" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </div>
          {/* <!-- .navbar-collapse --> */}
        </div>
        {/* <!-- .container --> */}
      </nav>
    </header>
  );
}

export default Nav;
