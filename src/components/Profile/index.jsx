import React from "react";

export default function Profile({ userData, addressData }) {
  return (
    <div>
      <div className="container">
        <div className="container">
          <div className=" shadow-sm p-3 mb-5 mt-5 bg-body rounded border border-danger">
            <div>
              <h2>Profile</h2>
            </div>

            <table class="table" style={{ fontSize: "14px" }}>
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>{userData.full_name}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{userData.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="container ">
        <div>
          <h2>Address</h2>
        </div>
        <div className="mt-2 text-start">
          <button className="btn btn-danger btn-sm">Add Address</button>
        </div>
        <div className="container shadow-sm p-3 mb-5 mt-1 bg-info rounded border border-danger">
          <table className="table mt-2 border border-dark rounded-2" style={{ fontSize: "14px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Urban Village</th>
                <th>Districts</th>
                <th>Regency/City</th>
                <th>Province</th>
              </tr>
            </thead>
            <tbody className="bg-light" style={{ fontSize: "12px" }}>
              {addressData.map((address, i) => (
                <tr key={i}>
                  <td>{address.name}</td>
                  <td>{address.kelurahan}</td>
                  <td>{address.kecamatan}</td>
                  <td>{address.kabupaten}</td>
                  <td>{address.provinsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
