import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../NavBar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/profile`);
        if (response.status === 200) {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            password: "",
          });
        }
      } catch (err) {
        console.error("Cannot fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const changeHandler = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/auth/profile`,
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
        navigate("/dashboard");
        toast.success("Successfully Updated");
      }
    } catch (err) {
      console.error("Cannot update wallet", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 m-auto">
            <h5 className="display-4 text-center mb-2">Update Profile</h5>
            <hr className="my-4" />
            <form onSubmit={submitHandler}>
              <div className="form-row">
                <div className="col-12 mb-2">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => changeHandler(e, "name")}
                  />
                </div>
                <div className="col-12 mb-2">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={(e) => changeHandler(e, "email")}
                  />
                </div>
                <div className="col-12 mb-2">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={(e) => changeHandler(e, "password")}
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div className="text-center mb-2">
                <button type="submit" className="btn btn-primary btn-block">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
