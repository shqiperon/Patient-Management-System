import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetchPromotions();
  }, []);


  function fetchPromotions() {
    // Fetching doctors available
    fetch('http://127.0.0.1:8000/api/promotions')
      .then(response => response.json())
      .then(data => setPromotions(data.promotions))
      .catch(error => console.error(error));
  }


  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
          <div className="container">
            <a className="navbar-brand" href="#">
              <span className="text-primary">One</span>-Health
            </a>

            <form action="#">
              <div className="input-group input-navbar">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="icon-addon1">
                    <span className="mai-search"></span>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter keyword.."
                  aria-label="Username"
                  aria-describedby="icon-addon1"
                />
              </div>
            </form>

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
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ml-lg-3" to="/userlogcreate/login">
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ml-lg-3" to="/userlogcreate/register">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className='container-fluid py-1'>
        {promotions.length > 0 && (
          <div className="promotions">
            <div id="promotionsCarousel" className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                {promotions.slice(0, 3).map((promotion, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={promotion.id}>
                    <div className="carousel-image-container">
                      <img
                        src={`http://127.0.0.1:8000/storage/promotions/${promotion.image}`}
                        className="d-block w-100"
                        alt={promotion.title}
                        style={{ maxHeight: '400px' }}
                      />
                    </div>
                    <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', opacity: 0.9 }}>
                      <h1 className="carousel-title">{promotion.title}</h1>
                      <p className="carousel-description">{promotion.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#promotionsCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#promotionsCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="page-hero bg-image overlay-dark" style={{ backgroundImage: "url(../assets/img/bg_image_1.jpg)" }}>
        <div className="hero-section">
          <div className="container text-center wow zoomIn">
            <span className="subhead">Let's make your life happier</span>
            <h1 className="display-4">Healthy Living</h1>
          </div>
        </div>
      </div>

      <div className="bg-light">
        <div className="page-section py-3 mt-md-n5 custom-index">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-secondary text-white">
                    <span className="mai-chatbubbles-outline"></span>
                  </div>
                  <p>
                    <span>Chat</span> with a doctor
                  </p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-primary text-white">
                    <span className="mai-shield-checkmark"></span>
                  </div>
                  <p>
                    <span>One</span>-Health Protection
                  </p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-accent text-white">
                    <span className="mai-basket"></span>
                  </div>
                  <p>
                    <span>One</span>-Health Pharmacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 py-3 wow fadeInUp">
                <h1>Welcome to Your Health Center</h1>
                <p className="text-grey mb-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                  et ea rebum. Accusantium aperiam earum ipsa eius, inventore nemo labore eaque porro consequatur ex
                  aspernatur. Explicabo, excepturi accusantium! Placeat voluptates esse ut optio facilis!
                </p>
                <a href="#" className="btn btn-primary">
                  Learn More
                </a>
              </div>
              <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                <div className="img-place custom-img-1">
                  <img src="../assets/img/bg-doctor.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
