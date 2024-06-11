import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardItem = ({
  id,
  name,
  accountNumber,
  description,
  currentBalance,
}) => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const deleteWallet = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/wallet/${id}`);
      if (response.status === 200) {
        console.log("DELETED");
        toast.warning(`${name} deleted`);
      }
    } catch (err) {
      console.log("Cannot delete wallet", err);
    }
  };

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3 shadow">
        <div className="row">
          <div className="col-lg-4 col-md-3 col-6">
            <h3 className="font-weight-bold">{name}</h3>
            <p className="text-muted">Account Number: {accountNumber}</p>
            <p className="text-muted">{description}</p>
          </div>
          <div className="col-lg-4 col-md-3 col-6 text-center">
            <h3 className="font-weight-bold">Balance</h3>
            <h1 className="display-4">Rs. {currentBalance}</h1>
          </div>
          <div className="col-md-4 col-12 d-lg-block">
            <ul className="list-group list-group-flush">
              <li className="list-group-item mb-2">
                <Link
                  to={`/transactions/${id}`}
                  className="btn btn-sm btn-primary w-100"
                >
                  <i className="fas fa-list-alt pr-1"></i> View Transactions
                </Link>
              </li>
              <li className="list-group-item mb-2">
                <Link
                  to={`/updatewallet/${id}`}
                  className="btn btn-sm btn-info w-100"
                >
                  <i className="fas fa-edit pr-1"></i> Update Wallet Info
                </Link>
              </li>
              <li className="list-group-item">
                <button
                  className="btn btn-sm btn-danger w-100"
                  onClick={() => {
                    deleteWallet();
                  }}
                >
                  <i className="fas fa-trash-alt pr-1"></i> Delete Wallet
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
