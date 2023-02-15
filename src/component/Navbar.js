import React, { useEffect, useState } from "react";
import axios from "../axios/axios";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT } from "../store/auth/authSlice";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState();
  const token = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(LOG_OUT());
    setUser();
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/v1/user/token`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-light">
          Brownfield Airlines
        </Link>
        <button
          className="navbar-toggler text-light"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-three-dots"></i>{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/booking" className="nav-link text-light">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/checkin" className="nav-link text-light">
                Checkin
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="text-light text-decoration-none">
              {user ? user.emailAddress : "Guest"}
            </div>
            {user ? (
              <span
                role="button"
                onClick={handleClick}
                className="text-light text-decoration-none"
              >
                Logout
              </span>
            ) : (
              <Link to="/login" className="text-light text-decoration-none">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
