import React, { useState } from "react";
import "./ResetPassword.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords Don't Match");
      setConfirmPassword("");
      setPassword("");
    } else {
      let url = "http://localhost:4000";
      if (process.env.NODE_ENV === "production") {
        url = process.env.REACT_APP_SERVER_BASE_URL;
      }
      const token = localStorage.getItem("RESET_TOKEN");
      try {
        const response = await axios.post(
          `${url}/auth/reset`,
          {
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response)
        // if (response.status === "error") {
        //   alert(response.result);
        //   navigate("/login");
        // }
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="ResetPassword">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmpassword"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
          />
          <input type="submit" className="submit" value="Reset Password" />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
