import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const CreateWallet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    description: "",
    currentBalance: "",
  });

  const changeHandler = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .post("http://localhost:8080/wallet", formData)
      .then((response) => {
        console.log("Success", response.data);
        navigate("/dashboard");
        toast.success(`${formData.name} wallet created`);
      })
      .catch((err) => {
        console.log("Cannot post wallet data", err);
      });
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center mb-4">Create Wallet</h5>
            <hr className="my-4" />
            <form onSubmit={(e) => submitHandler(e)}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg shadow border-radius-10"
                  placeholder="Wallet Name"
                  onChange={(e) => changeHandler(e, "name")}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg shadow border-radius-10"
                  placeholder="Wallet Number"
                  onChange={(e) => changeHandler(e, "accountNumber")}
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control form-control-lg shadow border-radius-10"
                  placeholder="Description"
                  onChange={(e) => changeHandler(e, "description")}
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg shadow border-radius-10"
                  placeholder="Balance"
                  onChange={(e) => changeHandler(e, "currentBalance")}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4 shadow-lg border-radius-10"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateWallet;
