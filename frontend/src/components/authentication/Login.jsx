import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("token", response.data.jwtToken);
        toast.success(`Successfully Logged in`);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Login Unsuccessful", err);
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Sign In</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter email"
                    onChange={(e) => changeHandler(e, "email")}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => changeHandler(e, "password")}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Submit
                  </button>
                </div>
                <div className="text-center mt-3">
                  Not registered?{" "}
                  <Link to={"/register"} className="text-decoration-none">
                    Register now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
