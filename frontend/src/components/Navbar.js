import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth/authContext";

export default function Navbar() {
  const { auth, logout, getUserDetails } = useContext(AuthContext);
  let location = useLocation();

  const handleOnClick = () => {
    logout();
  };

  const [user, setUser] = useState("Loading...");

  const getUser = async () => {
    try {
      const response = await getUserDetails(auth);
      setUser(response.user.name);
    } catch (e) {
      console.error(e);
      setUser("Loading...");
    }
  };

  useEffect(() => {
    console.log(auth);
    if(auth) getUser();
    
    // eslint-disable-next-line
  }, [auth]);

  return (
    <nav
      className="navbar bg-dark navbar-expand-lg bg-body-tertiary fixed-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iBlog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            { auth &&
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/add-blog"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/add-blog"
              >
                Add Post
              </Link>
            </li>
            }
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!auth ? (
            <div className="d-flex">
              <button
                type="button"
                className={
                  location.pathname === "/login"
                    ? "btn btn-light me-1"
                    : "btn btn-dark me-1"
                }
              >
                <Link className="nav-link" aria-current="page" to="/login">
                  Log in
                </Link>
              </button>

              <button
                type="button"
                className={
                  location.pathname === "/signup"
                    ? "btn btn-light"
                    : "btn btn-dark"
                }
              >
                <Link className="nav-link" aria-current="page" to="/signup">
                  Sign up
                </Link>
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <h6 className="text-muted me-2 my-2">
                <i
                  className="fa-solid fa-user me-1"
                  style={{ color: "white" }}
                ></i>
                {`@${user}`}
              </h6>
              <button
                type="button"
                className="btn btn-light"
                onClick={handleOnClick}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
