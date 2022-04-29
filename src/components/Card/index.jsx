import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Card({ productData, userData, onClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded" style={{ borderRadius: "50px" }}>
      <div onClick={handleShow}>
        <h1>{productData.name}</h1>
        <img src={`http://localhost:3000/images/products/${productData.image_url}`} className="img-fluid" style={{ height: "200px", width: "240px", borderRadius: "15px", marginBottom: "3px" }} alt="imagerandom" />
      </div>
      <div>
        <div className="w-100 text-start">
          <span className="badge  bg-secondary" style={{ fontSize: "10px" }}>
            {productData.category.name}
          </span>

          {/* <select className="form-select">
            return <option></option>;
          </select> */}
        </div>

        <div className="w-100  text-start">
          {productData.tags.map((tag) => (
            <span key={tag._id} className="badge rounded-pill bg-warning text-dark" style={{ fontSize: "8px", marginRight: "3px" }}>
              {tag.name}
            </span>
          ))}
        </div>
        <div className="w-100 mt-2 text-start">
          <p className="text-wrapp">{productData.description}</p>
        </div>
        <hr />
      </div>

      <div className="flex-container">
        <div className=" w-100 text-start ">
          {/* <button className="btn">DETAIL</button> */}
          <h1 className="mt-3"> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(productData.price)}</h1>
        </div>

        <div className="m-1 w-100 text-end">
          {!!userData.full_name ? (
            <button className="btn btn-danger " onClick={onClick}>
              <i className="fas fa-shopping-cart"></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{productData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={`http://localhost:3000/images/products/${productData.image_url}`} alt="" className="img-fluid" style={{ height: "400px" }} />
          <p>{productData.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
