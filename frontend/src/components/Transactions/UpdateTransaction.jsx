import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const UpdateTransaction = () => {
  const { walletId, id } = useParams();
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
    try {
      const response = await axios.patch(
        `http://localhost:8080/transaction/${walletId}/${id}`,
        transaction
      );
      console.log("Success with id", id);
      console.log(response.data);
      navigate(`/transactions/${walletId}`);
      toast.success(`Transaction Info Updated`);
    } catch (err) {
      console.log("Cannot update wallet data", err);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/transaction/${walletId}/${id}`
      );
      setTransaction({
        amount: response.data.amount,
        description: response.data.description,
        transactionDate: response.data.transactionDate, // added transactionDate field
      });
    } catch (error) {
      console.log("Error fetching wallet data", error);
    }
  };

  useEffect(() => {
    if (walletId) {
      fetchTransactionData();
    }
  }, [walletId]);

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 m-auto">
            <h4 className="display-4 text-center mb-3">Update Transaction</h4>
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
                  Update Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTransaction;
