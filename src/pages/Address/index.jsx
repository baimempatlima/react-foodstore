import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function FormAddress() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [detail, setDetail] = useState("");
  const [checkValidation, setCheckValidation] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const headersAuth = { headers: { Authorization: `Bearer ${token}` } };

  const authCheck = async () => {
    try {
      await axios.get(`http://localhost:3000/auth/me`, headersAuth).then((res) => {
        if (res.data.error !== 1) {
          setUser(res.data);
        }
      });
    } catch (error) {
      console.log(error, "user not found");
    }
  };

  const addressAdd = async (e) => {
    e.preventDefault();
    try {
      let payload = { name, kelurahan, kecamatan, provinsi, kabupaten, detail, user };
      await axios.post(`http://localhost:3000/api/delivery-addresses`, payload, headersAuth).then((res) => {
        setCheckValidation(res.data);
        if (res.data.error !== 1) {
          navigate(-1);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const buttonBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <div>
      <div className="container">
        <form>
          <div className="row justify-content-center my-5 flex">
            <div className="col-md-5 my-5 text-start  shadow-lg p-3 mb-5 bg-body rounded">
              <div className="flex-container">
                <div className="text-start">
                  <button className="btn btn-warning" onClick={(e) => buttonBack(e)}>
                    <i class="fa-solid fa-arrow-left"></i>
                  </button>
                </div>
              </div>
              <h2 className="text-center m-2">Add Address</h2>
              <div>
                <input name="name" type="text" placeholder="your street,  example: Majang Street no. 14, Makassar" className="form-control" value={name} onChange={(e) => setName(e.target.value)} a />
                {checkValidation.error === 1 && checkValidation.fields.name !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.name.message}</p> : ""}
                <input name="kelurahan" type="text" placeholder="your village, example: Macege " className="form-control" value={kelurahan} onChange={(e) => setKelurahan(e.target.value)} />
                {checkValidation.error === 1 && checkValidation.fields.kelurahan !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.kelurahan.message}</p> : ""}
                <input type="text" name="kecamatan" placeholder="your Districts, example: Tanete Riattang Barat" className="form-control" value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                {checkValidation.error === 1 && checkValidation.fields.kecamatan !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.kecamatan.message}</p> : ""}
                <input type="text" name="kabupaten" placeholder="your Regency/City example: Makassar" className="form-control" value={kabupaten} onChange={(e) => setKabupaten(e.target.value)} />
                {checkValidation.error === 1 && checkValidation.fields.kabupaten !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.kabupaten}</p> : ""}
                <input type="text" name="provinsi" placeholder="your Province example: South Sulawesi" className="form-control" value={provinsi} onChange={(e) => setProvinsi(e.target.value)} />
                {checkValidation.error === 1 && checkValidation.fields.provinsi !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.provinsi.message}</p> : ""}
                <textarea class="form-control mt-3" name="detail" id="detail" rows="3" placeholder="your detailed address" value={detail} onChange={(e) => setDetail(e.target.value)}></textarea>
                {checkValidation.error === 1 && checkValidation.fields.detail !== undefined ? <p className="alert alert-dark text-sm-center">{checkValidation.fields.detail.message}</p> : ""}
                <button className="btn btn-danger my-2 mt-3 mb-3" onClick={(e) => addressAdd(e)}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
