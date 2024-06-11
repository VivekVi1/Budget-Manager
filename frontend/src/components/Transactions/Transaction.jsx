import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar";
import { toast } from "react-toastify";

const Transaction = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState({});

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getWallet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/wallet/${id}`);
        if (response.status === 200) {
          setWallet(response.data);
        }
      } catch (err) {
        console.log("Cannot fetch wallet", err);
      }
    };
    getWallet();
  }, []);

  async function getTransactionsDb() {
    try {
      const response = await axios.get(
        `http://localhost:8080/transaction/${id}`
      );
      if (response.status === 200) {
        console.log(response.data);
        setTransactions(response.data);
      }
    } catch (err) {
      console.log("Cannot fetch transactions", err);
    }
  }

  useEffect(() => {
    getTransactionsDb();
  }, []);

  const deleteTransaction = async (transactionId) => {
    try {
      console.log(transactionId);
      const response = await axios.delete(
        `http://localhost:8080/transaction/${id}/${transactionId}`
      );
      if (response.status === 200) {
        console.log("Delete");
        transactions.filter((transaction) => transaction.id !== transactionId);
        setTransactions(transactions);
        getTransactionsDb();
        toast.warning(`Transaction Deleted`);
      }
    } catch (err) {
      console.log("Cannot Delete transaction with wallet id ", id, err);
    }
  };

  const totalSpent = transactions.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  const remainingBalance = wallet.currentBalance - totalSpent;

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-6 d-flex justify-content-start">
            <Link to="/dashboard" className="btn btn-secondary btn-block">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <Link
              to={`/transactions/add/${id}`}
              className="btn btn-primary btn-block"
            >
              <i className="fas fa-plus-circle mr-2"></i> Record Transaction
            </Link>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">
              <i className="fas fa-wallet mr-2"></i> Balance
            </h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 text-center">
                <h1 className="display-4">Remaining Rs. {remainingBalance}</h1>
              </div>
              <div className="col-md-6 text-center">
                <h1 className="display-4">Spent so far Rs. {totalSpent}</h1>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="table-responsive">
          <table className="table table-striped table-bordered mb-0">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="text-center">
                  <i className="fas fa-calendar-alt mr-2"></i> Date
                </th>
                <th scope="col" className="text-center">
                  <i className="fas fa-file-alt mr-2"></i> Description
                </th>
                <th scope="col" className="text-center">
                  <i className="fas fa-rupee-sign mr-2"></i> Amount
                </th>
                <th scope="col" className="text-center">
                  <i className="fas fa-cog mr-2"></i> Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td className="text-center">
                      {transaction.transactionDate}
                    </td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td className="text-center">
                      <Link
                        to={`/transactions/update/${wallet.id}/${transaction.id}`}
                      >
                        <button className="btn btn-sm btn-primary">
                          <i className="fas fa-edit pr-1"></i> Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger ml-2"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        <i className="fas fa-trash-alt pr-1"></i> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Transaction;
