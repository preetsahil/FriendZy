import React, { useState } from "react";
import { axiosClient } from "../../utils/axiosClient";
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
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
