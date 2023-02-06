import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOG_IN } from "./store/auth/authSlice";
import "./style/login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const base_url = process.env.REACT_APP_BASE_URL;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const requestData = JSON.stringify(Object.fromEntries(formData));
      const settings = {
        method: "POST",
        body: requestData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`${base_url}/api/v1/user/login`, settings);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok && data) {
        dispatch(LOG_IN(data));
        navigate(-1, { replace: true });
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://www.freepnglogos.com/uploads/plane-png/clipart-image-aeroplane-impremedia-30.png"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleLogin}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <h5 className="mb-0 text-uppercase">User Sign in</h5>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0"></p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
                    required
                  />
                  <label className="form-label" htmlFor="username">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="*****"
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>

                {/* <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="checkbox_password"
                      name="checkbox_password"
                    />
                    <label className="form-check-label" for="checkbox_password">
                      Remember me
                    </label>
                  </div>
                </div> */}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small  mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/register">Create an account</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-5 px-2 px-xl-6 bg-primary"></div>
      </section>
    </div>
  );
}
