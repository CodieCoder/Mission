import React from "react";
import "../App.css";

function NotFound() {
  return (
    <div className="App">
      <h1>
        Oops!! You this page doesn't seem to exist. Go back to{" "}
        <a href="/">home page</a> and find your way .
      </h1>
    </div>
  );
}

export default NotFound;
