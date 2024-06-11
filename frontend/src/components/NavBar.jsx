import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const logout = () => {
    toast.info("Successfully Logged Out");
    localStorage.clear();
    navigate("/login");
  };
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/profile`);
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
      <div className="container">
        <div className="navbar-text mr-2">
          <span className="text-light">Logged In : </span>
          <Link to={`/profile/${user.id}`}>
            <span className="text-light">{user.name}</span>
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <button className="btn btn-outline-light" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
