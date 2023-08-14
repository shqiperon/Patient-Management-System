import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function UserDashboard() {

  const [doctors, setDoctors] = useState([]);
  const [inputName, setInputName] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [message, setMessage] = useState([]);
  const [date, setDate] = useState([]);
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {      
      const userData = JSON.parse(user);
      console.log(userData); // Add this line to check the userData object  
      fetchDoctors();
      setUserID(userData.user.id);
    }
  }, []);

  function fetchDoctors() {
    // Fetching doctors available
    fetch('http://127.0.0.1:8000/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data.doctors))
      .catch(error => console.error(error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    // Create a FormData object to capture the form data
    const formData = new FormData(form);

    formData.set("name", inputName);
    formData.set("email", email);
    formData.set("date", date);
    formData.set("message", message);
    formData.set("user_id", userID);
    formData.set("phone", phone);
    formData.set("doctor", selectedDoctor);


    fetch("http://127.0.0.1:8000/api/appointments", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Redirect to the doctor index page
        window.location.href = "/userpages/UserDashboard";
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="page-hero bg-image overlay-dark" style={{ backgroundImage: "url(../assets/img/bg_image_1.jpg)" }}>
        <div className="hero-section">
          <div className="container text-center wow zoomIn">
            <span className="subhead">Let's make your life happier</span>
            <h1 className="display-4">Healthy Living</h1>
            <Link className="btn btn-primary" aria-current="page" to="#">Let's consult</Link>
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
                  <p><span>Chat</span> with a doctors</p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-primary text-white">
                    <span className="mai-shield-checkmark"></span>
                  </div>
                  <p><span>One</span>-Health Protection</p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-accent text-white">
                    <span className="mai-basket"></span>
                  </div>
                  <p><span>One</span>-Health Pharmacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- .page-section --> */}

        <div className="page-section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 py-3 wow fadeInUp">
                <h1>Welcome to Your Health <br /> Center</h1>
                <p className="text-grey mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Accusantium aperiam earum ipsa eius, inventore nemo labore eaque porro consequatur ex aspernatur. Explicabo, excepturi accusantium! Placeat voluptates esse ut optio facilis!</p>
                <a href="about.html" className="btn btn-primary">Learn More</a>
              </div>
              <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                <div className="img-place custom-img-1">
                  <img src="../assets/img/bg-doctor.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- .bg-light --> */}
      </div>
      {/* <!-- .bg-light --> */}

      <div className="page-section py-2 ml-5 mr-5">
  <h1 className="text-center  wow fadeInUp">Our Doctors</h1>
  <div className="row">
    {doctors.slice(0, 3).map((doctor) => (
      <div className="col-md-4 col-sm-6 mb-4" key={doctor.id}>
        <div className="card h-100">
          <div
            className="card-img-container"
            style={{ height: "200px", overflow: "hidden" }}
          >
            <img
              src={`http://127.0.0.1:8000/storage/doctors/${doctor.image}`}
              alt={doctor.name}
              className="card-img-top img-fluid"
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{doctor.name}</h5>
            </div>
            <div>
              <button className="btn btn-primary">
                <Link
                  to={`#`}
                  className="text-white text-decoration-none"
                >
                  View Doctor
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="page-section bg-light">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Latest News</h1>
          <div className="row mt-5">
            <div className="col-lg-4 py-2 wow zoomIn">
              <div className="card-blog">
                <div className="header">
                  <div className="post-category">
                    <a href="#">Covid19</a>
                  </div>
                  <a href="blog-details.html" className="post-thumb">
                    <img src="../assets/img/blog/blog_1.jpg" alt="" />
                  </a>
                </div>
                <div className="body">
                  <h5 className="post-title"><a href="blog-details.html">List of Countries without Coronavirus case</a></h5>
                  <div className="site-info">
                    <div className="avatar mr-2">
                      <div className="avatar-img">
                        <img src="../assets/img/person/person_1.jpg" alt="" />
                      </div>
                      <span>Roger Adams</span>
                    </div>
                    <span className="mai-time"></span> 1 week ago
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 py-2 wow zoomIn">
              <div className="card-blog">
                <div className="header">
                  <div className="post-category">
                    <a href="#">Covid19</a>
                  </div>
                  <a href="blog-details.html" className="post-thumb">
                    <img src="../assets/img/blog/blog_2.jpg" alt="" />
                  </a>
                </div>
                <div className="body">
                  <h5 className="post-title"><a href="blog-details.html">Recovery Room: News beyond the pandemic</a></h5>
                  <div className="site-info">
                    <div className="avatar mr-2">
                      <div className="avatar-img">
                        <img src="../assets/img/person/person_1.jpg" alt="" />
                      </div>
                      <span>Roger Adams</span>
                    </div>
                    <span className="mai-time"></span> 4 weeks ago
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 py-2 wow zoomIn">
              <div className="card-blog">
                <div className="header">
                  <div className="post-category">
                    <a href="#">Covid19</a>
                  </div>
                  <a href="blog-details.html" className="post-thumb">
                    <img src="../assets/img/blog/blog_3.jpg" alt="" />
                  </a>
                </div>
                <div className="body">
                  <h5 className="post-title"><a href="blog-details.html">What is the impact of eating too much sugar?</a></h5>
                  <div className="site-info">
                    <div className="avatar mr-2">
                      <div className="avatar-img">
                        <img src="../assets/img/person/person_2.jpg" alt="" />
                      </div>
                      <span>Diego Simmons</span>
                    </div>
                    <span className="mai-time"></span> 2 months ago
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 text-center mt-4 wow zoomIn">
              <a href="blog.html" className="btn btn-primary">Read More</a>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- .page-section --> */}

      <div className="page-section">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Make an Appointment</h1>
          <form className="main-form" onSubmit={handleSubmit}>
            <div className="row mt-5 ">
              <div className="col-12 col-sm-6 py-2 wow fadeInLeft">
                <input type="text" className="form-control" placeholder="Full name" onChange={(e) => setInputName(e.target.value)} required/>
              </div>
              <div className="col-12 col-sm-6 py-2 wow fadeInRight">
                <input type="email" className="form-control" placeholder="Email address.." onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="col-12 col-sm-6 py-2 wow fadeInLeft" data-wow-delay="300ms">
                <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} required/>
              </div>
              <div className="col-12 col-sm-6 py-2 wow fadeInRight" data-wow-delay="300ms" >
                <select
                  name="doctor"
                  id="doctor"
                  className="form-control"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Select a doctor</option>
                  {Array.isArray(doctors) && doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-2 wow fadeInUp" data-wow-delay="300ms">
                <input type="text" className="form-control" placeholder="Number.." onChange={(e) => setPhone(e.target.value)} required/>
              </div>
              <div className="col-12 py-2 wow fadeInUp" data-wow-delay="300ms">
                <textarea name="message" id="message" className="form-control" rows="6" placeholder="Enter message.." onChange={(e) => setMessage(e.target.value)} required></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">Submit Request</button>
          </form>
        </div>
      </div>
      {/* <!-- .page-section --> */}


      {/* <!-- .banner-home --> */}


    </div>
  )
}


export default UserDashboard;
