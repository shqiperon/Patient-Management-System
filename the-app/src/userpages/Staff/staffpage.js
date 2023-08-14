import React from "react";
import { Link } from "react-router-dom";

function Staffpage() {



  return (
    <div>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Best Doctors</h3>
                <Link to="/userpages/Staff/BestDoctors">
                  <button className="btn btn-primary">Click here</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Best Nurses</h3>
                <Link to="/userpages/Staff/BestNurses">
                  <button className="btn btn-primary">Click here</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Technic Labs</h3>
                <Link to="#">
                  <button className="btn btn-primary">Click here</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staffpage;
