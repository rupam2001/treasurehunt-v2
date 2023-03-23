import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
export default function Landing() {
  return (
    <div className="main">
      <div className="container-main">
        <h1>Welcome to Treasure Hunt</h1>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}
