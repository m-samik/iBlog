import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const { signInWithEmailAndPassword } = useContext(AuthContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      var response = await signInWithEmailAndPassword(credentials);
      if (response.success) {
        navigate("/");
      } else {
        props.showAlert(response.error, "danger");
      }
    } catch (e) {
      console.error(e);
      props.showAlert(
        "Can't log in right now, Please try again later",
        "danger"
      );
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{height: '100vh'}}>
    <div className="container d-flex justify-content-center ">
      <form className="card p-4 col-md-6" onSubmit={handleOnSubmit}>
        <h2 className="my-3 text-center">Log in to iBlog</h2>

        <div className="my-3">
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="inputPassword"
            onChange={handleOnChange}
          />
        </div>
        <div className=" text-center">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
