import AuthContext from "./authContext";
import { useState } from "react";
import React from 'react'


const AuthState = (props) => {
  const host = process.env.REACT_APP_BACKEND;
  const authToken = localStorage.getItem("token");
  const [auth, setAuth] = useState(authToken);

  const updateAuthState = (token) => {
    setAuth(token);
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  // Sign in with email and password
  const signInWithEmailAndPassword = async (credentials) => {
    const response = await fetch(`${host}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      updateAuthState(json.authtoken);
      return json;
    } else if (json.error) {
      return json;
    } else {
      throw new Error(json.error);
    }
  };

  // Create a new user with email and password
  const signUpWithEmailAndPassword = async (credentials) => {
    const response = await fetch(`${host}/api/v1/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.status) {
      updateAuthState(json.authtoken);
      return json;
    } else if (json.error) {
      return json;
    } else {
      throw new Error(json.error);
    }
  };

  const getUserDetails = async (authToken) => {
    const response = await fetch(`${host}/api/v1/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: authToken,
      },
    });
    const json = await response.json();
    if (json.success) {
      return json;
    } else {
      throw new Error(json);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        signInWithEmailAndPassword,
        signUpWithEmailAndPassword,
        getUserDetails,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
