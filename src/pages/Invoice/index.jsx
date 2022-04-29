import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Invoice() {
  const [invoice, setInvoice] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const headersAuth = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const getInvoice = async () => {
    try {
      await axios.get(`http://localhost:3000/api/invoice/${id}`, headersAuth).then((res) => setInvoice(res.data));
    } catch (error) {
      console.log("not found");
    }
  };

  const clickOk = () => {
    navigate("/account/user");
  };

  useEffect(() => {
    getInvoice();
  }, []);
  return (
    <div>
      <div className="container mt-5">
        <div className="container">
          <div className="container item-center shadow-sm p-3 mb-5 bg-body rounded " style={{ width: "80%" }}>
            <div className="container mt-2 " style={{ width: "80%" }}>
              <table className="table table-hover ">
                <thead style={{ marginBottom: "7px" }}>
                  <tr>
                    <th scope="col">Invoice</th>
                    {/* <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th> */}
                  </tr>
                </thead>
                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <th scope="row">Status</th>
                    <td>{invoice.status}</td>
                  </tr>
                  <tr>
                    <th scope="row">Order ID</th>
                    <td>{invoice.order?.order_number}</td>
                  </tr>
                  <tr>
                    <th scope="row">Total Amount</th>
                    <td colspan="2"> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(invoice.total)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Billed to</th>
                    <td colspan="2">
                      <p>{invoice.user?.full_name}</p>
                      <p>{invoice.user?.email}</p>
                      <p>{invoice.delivery_address?.street}</p>
                      <p>
                        {invoice.delivery_address?.city}, {invoice.delivery_address?.province} {invoice.delivery_address?.postal_code}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Payment to</th>
                    <td colspan="2">
                      <p>PT BUY ME</p>
                      <p>buyme12@gmail.com</p>
                      <p>BNI BANK</p>
                      <p>xxxx - xxxx - 2131</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <button className="btn btn-outline-dark btn-sm" onClick={() => clickOk()}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
