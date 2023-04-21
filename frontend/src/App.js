import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddBlog from "./components/AddBlog";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import React from 'react';
import AuthState from "./context/auth/authState";
import NoteState from "./context/note/noteState";
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState({ msg: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 2000);
  };

  return (
    <AuthState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              />
                <Route
                exact
                path="/add-blog"
                element={<AddBlog showAlert={showAlert} />}
              />
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;
