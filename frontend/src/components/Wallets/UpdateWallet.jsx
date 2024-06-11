import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const UpdateWallet = () => {
  const { id } = useParams();
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
  // const token = localStorage.getItem("token");
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const fetchWalletData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/wallet/${id}`);
      setFormData({
        name: response.data.name,
        accountNumber: response.data.accountNumber,
        description: response.data.description,
        currentBalance: response.data.currentBalance,
      });
    } catch (error) {
      console.log("Error fetching wallet data", error);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
    }));
    axios
      .put(`http://localhost:8080/wallet/${id}`, formData)
      .then((response) => {
        console.log("Success with id", id);
        console.log(response.data);
        navigate("/dashboard");
        toast.info(`Wallet Info Updated`);
      })
      .catch((err) => {
        console.log("Cannot update wallet data", err);
      });
  };
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 m-auto">
            <h5 className="display-4 text-center mb-2">Update Wallet</h5>
            <hr className="my-4" />
            <form onSubmit={(e) => submitHandler(e)}>
              <div className="form-row">
                <div className="col-12 mb-2">
                  <label>Account Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => changeHandler(e, "name")}
                  />
                </div>
                <div className="col-12 mb-2">
                  <label>Account No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => changeHandler(e, "accountNumber")}
                  />
                </div>
                <div className="col-12 mb-2">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={formData.description}
                    onChange={(e) => changeHandler(e, "description")}
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

export default UpdateWallet;
