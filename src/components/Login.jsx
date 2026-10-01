import { useState } from "react";
import http from "../utils/service";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    try {
      const result = await http.post("/auth/login", {
        emailId,
        password,
      });
      const userDetails = result.data.userRes;
      dispatch(addUser(userDetails));
      navigate("/feed");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const handleSignup = async () => {
    setError("");
    try {
       await http.post("/auth/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
      setIsLogin(!isLogin);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="card card-border bg-base-100 w-96 h-96 my-4 m-auto">
      <div className="card-body flex justify-between">
        <h2 className="text-center">{isLogin ? "Login" : "SignUp"}</h2>

        {!isLogin && (
          <>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              className="input"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              className="input"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </>
        )}
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
        <h2 className="text-red-600">{error}</h2>
        {isLogin ? (
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSignup}>
            SignUp
          </button>
        )}
      </div>
      <p
        className="text-center cursor-pointer text-xl my-2"
        onClick={() => {
          setIsLogin(!isLogin);
        }}
      >
        {isLogin ? "New User? signup" : "Existing user, Login here"}
      </p>
    </div>
  );
};

export default Login;
