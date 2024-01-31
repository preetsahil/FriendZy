import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
import { CiLock } from "react-icons/ci";
import "./ForgetPassword.scss";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/forget", {
        email,
      });
      localStorage.setItem("RESET_TOKEN", response.result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="ForgetPassword">
      <div className="box">
        <div className="desc">
          <CiLock style={{fontSize:'5rem'}}/>
          <p className="text">You will receive the reset password link on your registered email</p>
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
          <input type="submit" className="submit" value="Send Link" />
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
