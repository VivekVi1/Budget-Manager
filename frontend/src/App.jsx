import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Welcome from "./components/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateWallet from "./components/Wallets/CreateWallet";
import UpdateWallet from "./components/Wallets/UpdateWallet";
import Transaction from "./components/Transactions/Transaction";
import AddTransaction from "./components/Transactions/AddTransaction";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import UpdateTransaction from "./components/Transactions/UpdateTransaction";
import EditProfile from "./components/Profile/EditProfile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createwallet" element={<CreateWallet />} />
          <Route path="/updatewallet/:id" element={<UpdateWallet />} />
          <Route path="/transactions/:id" element={<Transaction />} />
          <Route path="/transactions/add/:id" element={<AddTransaction />} />
          <Route
            path="/transactions/update/:walletId/:id"
            element={<UpdateTransaction />}
          />
          <Route path="/profile/:id" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
