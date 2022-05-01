// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Account from "./pages/Account";
import FormAddress from "./pages/Address";

import Carts from "./pages/Carts";
import Home from "./pages/Home";
import Invoice from "./pages/Invoice";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart/user" element={<Carts />} />
          <Route path="/form-address/user" element={<FormAddress />} />
          <Route path="/invoice/user/:id" element={<Invoice />} />
          <Route path="/account/user" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
