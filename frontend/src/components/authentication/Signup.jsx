import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData
      );
      if (response.status === 201) {
        console.log(response.data);
        navigate("/login");
        toast.success(`New user created:${formData.name}`);
      }
    } catch (err) {
      toast.error("User already exists");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Register</h3>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    placeholder="Enter name"
                    required
                    onChange={(e) => changeHandler(e, "name")}
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Enter email"
                    required
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
                    required
                    onChange={(e) => changeHandler(e, "password")}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="text-center mt-3">
                  Already registered? <Link to="/login">Sign in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
