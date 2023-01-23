import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOG_IN } from "./store/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
      const response = await fetch(
        "http://localhost:8081/api/v1/user/login",
        settings
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      if (response.ok && data) {
        dispatch(LOG_IN(data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="card">
            <div className="mt-2 mb-2">
              <h4 className="text-center fw-normal">Sign in</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin} className="form-horizontal">
                <div className="form-group mb-3">
                  <label className="control-label"> Email</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="control-label"> Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <div className="form-group row justify-content-center mb-3">
                  <button type="submit" className="btn btn-primary col-11">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <p className="">
                    Don't have an account?
                    <Link to="/register">Create an account</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
