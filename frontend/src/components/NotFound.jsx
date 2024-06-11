import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="lead">Page Not Found</p>
          <p>The page you are looking for does not exist.</p>
          <Link to={"/dashboard"} className="btn btn-primary">
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
