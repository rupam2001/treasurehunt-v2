import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
export default function Landing() {
  return (
    <div className="main">
      <div className="container-main">
        <h1 className="welcome-text" >Welcome to Treasure Hunt</h1>
        <Link to={"/login"}>
          <div className="">
            <button className="w-fit font-bold bg-white " >
              <span style={{fontFamily:'Zeyada', fontSize:"2rem",}}>
                Login
              </span>
              </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
