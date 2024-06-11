import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    amount: "",
    description: "",
    transactionDate: "", // added transactionDate field
  });

  const changeHandler = (e, fieldName) => {
    setTransaction({
      ...transaction,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(transaction);
    try {
      const response = await axios.post(
        `http://localhost:8080/transaction/${id}`,
        transaction
      );
      if (response.status === 201) {
        console.log(response.data);
        navigate(`/transactions/${id}`);
        toast.success(`${transaction.description} added`);
      }
    } catch (err) {
      console.log("Cannot add transaction ", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 m-auto">
            <Link
              to={`/transactions/${id}`}
              className="btn btn-light btn-sm mb-2"
            >
              <i className="fas fa-chevron-left"></i> Back to Wallet
            </Link>
            <h4 className="display-4 text-center mb-3">
              Record New Transaction
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="number"
                  min="1"
                  name="amount"
                  value={transaction.amount}
                  onChange={(e) => changeHandler(e, "amount")}
                  className="form-control form-control-lg"
                  placeholder="Amount"
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  value={transaction.description}
                  name="description"
                  onChange={(e) => changeHandler(e, "description")}
                  className="form-control form-control-lg"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="form-group mb-3">
                <input
                  type="date"
                  name="transactionDate"
                  value={transaction.transactionDate}
                  onChange={(e) => changeHandler(e, "transactionDate")}
                  className="form-control form-control-lg"
                  placeholder="Transaction Date"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary btn-lg">
                  Record Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTransaction;
