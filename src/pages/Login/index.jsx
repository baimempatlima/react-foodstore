import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const navigate = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();

    try {
      let payload = { email, password };
      await axios.post(`http://localhost:3000/auth/login`, payload).then((res) => {
        setValidation(res.data);
        localStorage.setItem("token", res.data.token);

        if (res.data.error !== 1) {
          navigate("/");
        } else {
          localStorage.removeItem("token");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form>
        <div className="row justify-content-center my-5 ">
          <div className="col-md-5 my-5 text-start shadow-lg p-3 mb-5 bg-body rounded">
            <h2 className="text-center m-2">Login</h2>
            <div>
              <input type="text" name="email" placeholder="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
              {validation.error === 1 ? <p className="alert alert-warning">{validation.message}</p> : ""}
              <input type="text" name="password" placeholder="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
              {validation.error === 1 ? <p className="alert alert-danger">{validation.message}</p> : ""}
              <button onClick={submitLogin} className="btn btn-danger my-2 mb-3">
                Login
              </button>
              <br />
              <Link to="/register" className="mt-2" style={{ color: "black", fontSize: "14px" }}>
                Click Here To Register
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
