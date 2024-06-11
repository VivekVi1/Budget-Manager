import React from "react";
import { Link } from "react-router-dom";
import DashboardItem from "./DashboardItem";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const Dashboard = () => {
  const [wallets, setWallets] = useState([]);
  const [totalBalance, setTotalBalance] = useState();

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getWallets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/wallet");
        if (response.status == 200) {
          console.log(response.data);
          let totalBal = 0;
          response.data.forEach((wallet) => {
            totalBal += wallet.currentBalance;
          });
          setTotalBalance(totalBal);
          setWallets(response.data);
        }
      } catch (err) {
        console.error("Error fetching wallets:", err);
      }
    };
    getWallets();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-left mb-4">My Wallets</h1>

            <div className="card mb-4 text-center">
              <div className="card-header bg-primary text-white py-3">
                <h4 className="mb-0">Total Wallet Balance</h4>
                <h1 className="display-3 mb-0">Rs. {totalBalance}</h1>
              </div>
            </div>
            <hr className="my-4" />
            <div className="row">
              <div className="col-md-12 mb-2 text-right">
                <Link to={"/createwallet"}>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-create text-white"
                  >
                    Create Wallet <i className="fas fa-plus-circle ml-2"></i>
                  </button>
                </Link>
              </div>
              {wallets.map((wallet) => {
                return (
                  <div className="col-md-12 mb-4" key={wallet.id}>
                    <DashboardItem
                      id={wallet.id}
                      name={wallet.name}
                      accountNumber={wallet.accountNumber}
                      description={wallet.description}
                      currentBalance={wallet.currentBalance}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
