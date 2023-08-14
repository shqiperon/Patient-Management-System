import React  from "react";
import { Link } from "react-router-dom";

function DoctorHomepage() {
  return (
    <div>
      <div className="page-hero bg-image overlay-dark" style={{ backgroundImage: "url(../assets/img/bg_image_1.jpg)" }}>
        <div className="hero-section">
          <div className="container text-center wow zoomIn">
            <span className="subhead">Let's make your life happier</span>
            <h1 className="display-4">Healthy Living</h1>
            <Link className="btn btn-primary" aria-current="page" to="/doctorpages/news/indexnu">Let's consult</Link>

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


        {/* <!-- .bg-light --> */}
      </div>
      {/* <!-- .bg-light --> */}
      <div className="d-flex justify-content-center appointments-container">
            <Link to="/doctorpages/showApprovedAppointments">
              <div>
                <div className="approved card bg-overlay" style={{
                  height: '400px', width: '670px', marginRight: '5px', backgroundImage: `url(${process.env.PUBLIC_URL}/images/appointment.jpg)`
                }}>
                  <div className="approved-card-body d-flex flex-column justify-content-end align-items-center">
                  </div>
                  <div className="approved-card-text-overlay">
                    <h3 className="display-6">Show approved appointments</h3>
                    <span className="subhead">Here you can see the appointments that are approved for review</span>
                    {/* <p>Here you can see the appointments that are approved for review and need to be treated</p> */}
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/doctorpages/showLabPatients">
              <div>
                <div className="approved card bg-overlay" style={{ height: '400px', width: '670px', marginLeft: '5px', backgroundImage: `url(${process.env.PUBLIC_URL}/images/laboratory-test.jpg)` }}>
                  <div className="approved-card-body d-flex flex-column justify-content-end align-items-center">
                  </div>
                  <div className="approved-card-text-overlay">
                    <h3 className="display-6">Show lab appointments</h3>
                    <span className="subhead">Here you can see the appointments that require a laboratory test</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
    </div>
  )
}


export default DoctorHomepage;
