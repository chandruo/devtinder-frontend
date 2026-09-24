import React from "react";
import { useState } from "react";
import axios from "axios";
import http from "../utils/service";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const result = await http.post("/auth/login", {
      emailId,
      password,
    });
  };
  return (
    <div className="card card-border bg-base-100 w-96 h-96 my-4 m-auto">
      <div className="card-body flex justify-between">
        <h2 className="text-center">Login</h2>

        <input
          id="emailId"
          type="text"
          placeholder="Email ID"
          value={emailId}
          className="input"
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          className="input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
