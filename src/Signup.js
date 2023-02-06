import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { REGEX_TEXT } from "./constant/constant";
import "./style/signup.css";

export default function Signup() {
  const user = useSelector((state) => state.user.loggedIn);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  });

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    try {
      const password1 = e.target.password.value;
      const password2 = e.target.password_repeat.value;
      if (password1 !== password2) {
        throw new Error("passwords do not match");
      }
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
        `${base_url}/api/v1/user/register`,
        settings
      );
      const data = await response.json();
      if (response.status !== 201) {
        throw new Error(data.message);
      }
      if (response.status === 201 && data) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  function lettersOnly(input) {
    let regex = /[^a-zA-z]/gi;
    input.target.value = input.target.value.replace(regex, "");
  }
  return (
    <div>
      <section>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 mt-2">
          <div className="container h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    {error && (
                      <div className="alert alert-danger text-center">
                        {error}
                      </div>
                    )}
                    <h4 className="text-uppercase text-center mb-5">
                      Create an account
                    </h4>

                    <form onSubmit={handleUserRegistration}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="form-control form-control-lg"
                          pattern={REGEX_TEXT}
                          title="Please enter a valid name"
                          required
                          onKeyUp={(e) => {
                            lettersOnly(e);
                          }}
                        />
                        <label className="form-label" htmlFor="firstName">
                          Your First Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="form-control form-control-lg"
                          pattern={REGEX_TEXT}
                          title="Please enter a valid name"
                          required
                          onKeyUp={(e) => {
                            lettersOnly(e);
                          }}
                        />
                        <label className="form-label" htmlFor="lastName">
                          Your Last Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="emailAddress">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          name="mobileNumber"
                          id="mobileNumber"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="mobileNumber">
                          Mobile Number
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password_repeat"
                          name="password_repeat"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" htmlFor="password_repeat">
                          Repeat your password
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?
                        <Link to="/login">Login here</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
