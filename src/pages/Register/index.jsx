import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  let payload = { full_name, email, password };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (password === cpassword) {
        await axios.post(`http://localhost:3000/auth/register`, payload).then((res) => {
          setValidation(res.data);
          if (res.data.error !== 1) {
            setTimeout(() => {
              navigate("/login");
            }, 500);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <div className="row justify-content-center my-5">
          <div className="col-md-5 my-5 text-start  shadow-lg p-3 mb-5 bg-body rounded">
            <h2 className="text-center m-2">Register</h2>
            <div>
              <input onClick={(e) => setFullName(e.target.value)} name="full_name" type="text" placeholder="your name" className="form-control" />
              {validation.fields?.full_name ? <p className="alert alert-warning">{validation.fields.full_name.message}</p> : ""}
              <input onClick={(e) => setEmail(e.target.value)} name="email" type="text" placeholder="email" className="form-control" />
              {validation.fields?.email ? <p className="alert alert-warning">{validation.fields.email.message}</p> : ""}
              <input onClick={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="password" className="form-control" />
              {validation.fields?.password ? <p className="alert alert-warning">{validation.fields.password.message}</p> : ""}
              <input onClick={(e) => setCPassword(e.target.value)} type="password" name="confirm_password" placeholder="confirm password" className="form-control" />
              {password !== cpassword ? <p className="alert alert-warning">Password do not match </p> : ""}
              <button onClick={(e) => register(e)} className="btn btn-danger my-2 mt-3 mb-3">
                Register
              </button>
              <br />
              <Link to="/login" className="mt-2" style={{ color: "black", fontSize: "14px" }}>
                Click Here To Login
              </Link>
              <br />
              <Link to="/" className="mt-2" style={{ color: "black", fontSize: "14px" }}>
                Click Here To Home
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
