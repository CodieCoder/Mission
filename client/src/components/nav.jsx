import React, { useState, useEffect } from "react";
import "../App.css";

function NavBar(data) {
  // const [navDetails, setnavDetails] = useState(data);
  // console.log(data.info);
  return (
    <nav className="navbar">
      <div className="container">
        <span className="navbar-brand">
          <i className="bi bi-person"></i> {data.info.name}
        </span>
        <span>
          <button type="button" className="btn btn-light position-relative">
            Mail
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {data.info.falsy}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </span>
      </div>
    </nav>
  );
}

export default NavBar;
