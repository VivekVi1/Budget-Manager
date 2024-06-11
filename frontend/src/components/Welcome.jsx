import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div
      className="landing d-flex align-items-center"
      style={{
        backgroundImage: "url('./bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-3 mb-4 font-weight-bolder text-black">
              Expense Manager
            </h1>
            <p className="lead text-muted- mb-5">
              Create your account to manage your daily expenses and transactions
            </p>
            <div className="btn-group">
              <Link to={"/register"} className="btn btn-lg btn-primary mr-2">
                <i className="fas fa-user-plus mr-2" /> Sign Up
              </Link>
              <Link to={"/login"} className="btn btn-lg btn-secondary">
                <i className="fas fa-lock mr-2" /> Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay bg-dark" />
    </div>
  );
};

export default Welcome;
