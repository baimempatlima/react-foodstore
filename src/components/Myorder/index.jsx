import React from "react";
import { useNavigate } from "react-router-dom";

export default function Myorder({ orderData }) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container ">
        <div className="my-0">
          <h2>My Order</h2>
        </div>
        <div className="container shadow-sm p-3 mb-5 mt-3 bg-info rounded border border-danger">
          <table class="table mt-2">
            <thead style={{ fontSize: "14px" }}>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Product</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col">Invoice</th>
              </tr>
            </thead>

            <tbody className="bg-light bg-gradient" style={{ fontSize: "12px" }}>
              {orderData.data?.length !== 0 ? (
                orderData.data
                  ?.sort((a, b) => a.order_number - b.order_number)
                  .map((order, i) => (
                    <tr>
                      <th>#{order.order_number}</th>
                      <td>
                        {order.order_items?.map((order, i) => (
                          <div key={i}>
                            {order.name}, {order.qty} x @{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(order.price)}
                          </div>
                        ))}
                      </td>
                      <td>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(order.order_items?.map((item) => item.qty * item.price).reduce((preVal, currentVal) => preVal + currentVal, 0))}</td>
                      <td>{order.status}</td>
                      <td>
                        <button type="button" class="btn btn-secondary btn-sm" onClick={() => navigate(`/invoice/user/${order.id}`)}>
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <th colspan="5">Not Order </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
