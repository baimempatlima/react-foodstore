import React from "react";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg  shadow-lg p-3 mb-5 bg-danger rounded">
        <div className="container">
          <a className="navbar-brand" href="/">
            BUY FOOD
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
}
