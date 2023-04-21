import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

export default function Signup(props) {
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });
  let navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confPassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }
    try {
      var response = await signUpWithEmailAndPassword(credentials);
      if (response.status) {
        navigate("/");
      } else if (response.error) {
        props.showAlert(response.error, "danger");
      }
    } catch (e) {
      console.error(e);
      props.showAlert(
        "Can't sign up right now. Please try again later.",
        "danger"
      );
    }
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ height: "100vh" }}>
    <div className="container col-md-6 p-4  card">
      <h2 className="my-3 text-center">Sign Up to iBlog</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="inputName"
            aria-describedby="nameHelp"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="confInputPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confPassword"
            className="form-control"
            id="confInputPassword"
            onChange={handleOnChange}
          />
        </div>
        <div className=" text-center">
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
