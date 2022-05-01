import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Myorder from "../../components/Myorder";
import Profile from "../../components/Profile";

export default function Account() {
  const [toogle, setToogle] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const navigate = useNavigate();
  const headersAuth = { headers: { Authorization: `Bearer ${token}` } };

  const getUser = async () => {
    try {
      await axios.get(`http://localhost:3000/auth/me`, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          setUsers(res.data);
        }
      });
    } catch (err) {
      console.log(err, "error check auth");
    }
  };

  const getOrder = async () => {
    try {
      await axios.get(`http://localhost:3000/api/orders`, headersAuth).then((res) => setOrder(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getAddress = async () => {
    try {
      await axios.get(`http://localhost:3000/api/delivery-addresses`, headersAuth).then((res) => setAddress(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const exit = async () => {
    try {
      await axios.post(`http://localhost:3000/auth/logout`, null, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          localStorage.removeItem("token");
          setUserDetail([]);
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getUser();
    getOrder();
    getAddress();
  }, []);
  return (
    <div>
      <div>
        <div className="mb-5">
          <Header />
        </div>
      </div>
      <div className="container mt-5">
        <div className="container mt-8">
          <div className="toogle-btns">
            <Link to="/">
              <i className="fa-solid  fa-solid fa-house toogle1"></i>
            </Link>
            <i className="fa-solid  fa-box-open toogle1" onClick={() => setToogle(true)}></i>
            <i className="fa-solid  fa-address-card toogle1" onClick={() => setToogle(false)}></i>
            <i className="fa-solid  fa-solid fa-power-off  toogle toogle-kn " onClick={() => exit()}></i>
          </div>
          <div className="container bg-secondary item-center shadow-sm p-3 mb-5 bg-body rounded " style={{ width: "80%" }}>
            {toogle ? (
              <div className="container shadow-sm p-3 mb-5 mt-5 bg-body rounded border border-danger" style={{ width: "80%", borderColor: "blueviolet" }}>
                <Myorder orderData={order} />
              </div>
            ) : (
              <div className="container shadow-sm p-3 mb-5 mt-5 bg-body rounded border border-danger" style={{ width: "80%", borderColor: "blueviolet" }}>
                <Profile userData={users} addressData={address} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
