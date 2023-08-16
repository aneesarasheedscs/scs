import React from "react";
import logo from "../Images/revisionary.jpg";
import pic from "../Images/picto.jpg";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";
import './style2.scss'
import { AntButton } from "@scs/ui";
const SignForm: React.FC = () => {
  return (
    <div className="loginform">
      <div className="partone">
        <img src={pic} className="pic" />
        <div className="content1">
          <img src={logo} className="logo" />
          <h2 style={{ marginTop: "20%" }}>Welcome to</h2>
          <h1 style={{ marginTop: "3%" }}>We're a Digital Agency.</h1>
          <p
            style={{
              marginTop: "3%",
              fontSize: "13px",
              fontFamily: "cursive",
              fontWeight: "bold",
              letterSpacing: "2px",
              lineHeight: "20px",
            }}
          >
            We are glad to see you again! Get access to your Orders, Wishlist
            and Recommendations.
          </p>
          <p
            className="p1"
            style={{ marginTop: "18%", fontSize: "16px", marginBottom: "5%" }}
          >
            Don't have an account?
          </p>
          <Typography.Link
            className="link"
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Register
          </Typography.Link>
        </div>
      </div>

      <div className="login">
        <div className="login-inner">
          <Typography.Title
            style={{ fontSize: "35px", fontWeight: "bold", marginTop: "8%" }}
          >
            Sign up
          </Typography.Title>
          <p style={{ fontSize: "16px", fontWeight: "bold", color: "gray" }}>
            Already have an account?
            {/* <Link
              to="#"
              style={{ textDecoration: "none", color: "blue" }}
            >
              &nbsp;Sign up
            </Link> */}
            <a href="#" style={{ textDecoration: "none", color: "blue" }}>
              &nbsp;Sign in
            </a>
          </p>

          <SignupForm />
          <Link to="/profile"><AntButton label={'Next Page'} style={{position:'relative', top:'4rem'}}></AntButton></Link>
        </div>
      </div>
     
    </div>
  );
};

export default SignForm;
