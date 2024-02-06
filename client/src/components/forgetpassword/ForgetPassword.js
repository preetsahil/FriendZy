import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { CiLock } from "react-icons/ci";
import "./ForgetPassword.scss";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/forget", {
        email,
      });
      localStorage.setItem("RESET_TOKEN", response.result);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="ForgetPassword">
      <div className="box">
        <div className="desc">
          <CiLock style={{ fontSize: "5rem" }} />
          <div className="text">
            Enter your email address below, and we will send you a link to reset
            your password to your Registered Mail.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="submit"
            className="submit"
            value="Request Password Reset"
          />
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
