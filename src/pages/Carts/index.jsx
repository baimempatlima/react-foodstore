import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import { Listbox } from "@headlessui/react";

const defaultAddress = [{ name: "Choose One Address: " }];

export default function Carts() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [carts, setCarts] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const headersAuth = { headers: { Authorization: `Bearer ${token}` } };
  const [getAddress, setGetAddress] = useState([]);
  const [addresSelect, setAddresSelect] = useState(defaultAddress[0]);
  const [validation, setValidation] = useState([]);

  const authCheck = async () => {
    try {
      await axios.get(`http://localhost:3000/auth/me`, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          setUser(res.data);
        }
      });
    } catch (error) {
      console.log(error, "auth error");
    }
  };

  const getCart = async () => {
    try {
      await axios.get(`http://localhost:3000/api/carts`, headersAuth).then((res) => setCarts(res.data));
    } catch (err) {
      console.log(err, "data carts not found");
    }
  };

  const quantityMin = async (cart) => {
    try {
      let payload = [];
      if (carts.find((item, index) => item[index] === cart[index])) {
        payload = carts.map((item) => ({ ...item, qty: item.product.name === cart.name && item.qty !== 0 ? item.qty - 1 : item.qty }));
      } else {
        payload = [...carts];
      }

      setCarts(payload);
      await axios.put(`http://localhost:3000/api/carts`, { items: payload }, headersAuth); // sending the data everytime the button is clicked
    } catch (error) {
      console.log(error);
    }
  };

  const quantityPlus = async (cart) => {
    try {
      let payload = [];

      if (carts.find((item, index) => item[index] === cart[index])) {
        payload = carts.map((item) => ({ ...item, qty: item.product.name === cart.name ? item.qty + 1 : item.qty }));
      } else {
        payload = [...carts];
      }

      setCarts(payload);
      await axios.put(`http://localhost:3000/api/carts`, { items: payload }, headersAuth);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCart = async (cart) => {
    try {
      let payload = [];
      if (carts.find((item, index) => item[index] === cart[index])) {
        payload = carts.filter((item) => item.name !== cart.name);
      } else {
        payload = [...carts];
      }

      setCarts(payload);
      await axios.put(`http://localhost:3000/api/carts/api/carts`, { items: payload }, headersAuth);
    } catch (error) {
      console.log(error);
    }
  };

  const showAddress = async () => {
    try {
      await axios.get(`http://localhost:3000/api/delivery-addresses`, headersAuth).then((res) => setGetAddress(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const checkout = async () => {
    try {
      let payload = { user: user, delivery_fee: 0, order_items: carts, delivery_address: addresSelect };
      if (addresSelect.name !== "Choose One Address:  ") {
        await axios.post(`http://localhost:3000/api/orders`, payload, headersAuth).then((res) => {
          setValidation(res.data);
          if (res.data.error !== 1) {
            navigate(`/invoice/user/${res.data._id}`);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCart();
    authCheck();
    showAddress();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container-fluid mt-5">
        <div className="container shadow-lg p-3 mb-5 bg-body rounded">
          <div className="flex-container">
            <div className="text-start">
              <Link to="/" className="btn btn-warning">
                <i className="fa-solid fa-arrow-left"></i>
              </Link>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <h2 style={{ fontSize: "40px", display: "inline" }}>
              My <i className="fas fa-shopping-cart text-danger"></i>{" "}
            </h2>
            <hr />
            <div className="col-md-5 mt-3">
              <h1>Menu</h1>
              {carts.length === 0 ? (
                <div>
                  {" "}
                  <h2 style={{ fontSize: "20px" }}>Food or Drinks Not Found</h2>
                </div>
              ) : (
                carts.map((cart) => (
                  <div key={cart._id} className="flex-container">
                    <div className="text-start m-1 w-100">
                      <h1>{cart.name}</h1>
                      <h1>Price : {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(cart.price * cart.qty)}</h1>
                      <h1 style={{ display: "inline" }}>Quantity : </h1>
                      <i onClick={() => quantityPlus(cart)} className="fa fa-plus m-2" aria-hidden="true"></i>
                      <b>{cart.qty}</b>
                      <i onClick={() => quantityMin(cart)} className="fa fa-minus m-2" aria-hidden="true"></i>
                      <hr />
                    </div>
                    <div className="w-100 text-end">
                      <img src={`http://localhost:3000/images/products/${cart.image_url}`} className="mt-2" alt="" style={{ borderRadius: "15px", height: "80px", weight: "80px" }} />
                    </div>
                    <div className="m-1 w-50 text-center" onClick={() => deleteCart(cart)}>
                      <i className="fa fa-trash mt-4" aria-hidden="true"></i>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="col-md-3 mt-3 text-start borderleft">
              <h1 style={{ display: "inline", marginRight: "5px" }}>Delivery Address</h1>
              <i class="fa-solid fa-location-dot"></i>
              <div className="mt-2">
                <Listbox value={addresSelect} onChange={setAddresSelect}>
                  <Listbox.Button className="btn-lg" style={{ fontSize: "14px", display: "inline", width: "100%" }}>
                    {addresSelect.name}
                  </Listbox.Button>
                  <Listbox.Options className=" text-start dropdownadd border-danger">
                    {getAddress.map((address) => (
                      <Listbox.Option key={address._id} value={address} className="text-start dropdownopop">
                        {address.name}
                        {address.kelurahan}
                        {address.kabupaten}
                        {address.provinsi}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
              <div className="text-end mt-2" style={{ fontSize: "15px" }}>
                <Link to="/address/user" className="btn btn-outline-warning btn-sm" alt="notfound">
                  <i className="fa-solid fa-circle-plus"> </i> Add New Address
                </Link>
              </div>
              <div className="text-end mt-2">
                {addresSelect.name === "Choose One Address: " ? <div className="valid-feedback text-end">please add a delivery address</div> : ""}
                {validation.error === 1 ? <p className="mb-2 text-red-400">{validation.message}</p> : ""}
              </div>
            </div>
            <div className="col-md-3 text-end borderleft mt-2">
              <div className="mt-2">
                <h1 className="text-start">Total:</h1>
              </div>
              <div className="mt-2">
                <p style={{ fontSize: "28px" }}> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(carts.map((item) => item.qty * item.price).reduce((preVal, currentVal) => preVal + currentVal, 0))}</p>
                <button className="btn btn-danger" onClick={() => checkout()}>
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
