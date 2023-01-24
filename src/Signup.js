import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/signup.css";

export default function Signup() {
  const [error, setError] = useState();
  const navigate = useNavigate();
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
        "http://localhost:8081/api/v1/user/register",
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
  return (
    <div>
      <section style={{ backgroundColor: "#00ffff" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    {error && (
                      <div className="alert alert-danger text-center">
                        {error}
                      </div>
                    )}
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleUserRegistration}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" for="firstName">
                          Your First Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" for="lastName">
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
                        <label className="form-label" for="emailAddress">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          className="form-control form-control-lg"
                          required
                        />
                        <label className="form-label" for="mobileNumber">
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
                        <label className="form-label" for="password">
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
                        <label className="form-label" for="password_repeat">
                          Repeat your password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="checkbox_terms"
                          name="checkbox_terms"
                          required
                        />
                        <label
                          className="form-check-label"
                          for="checkbox_terms"
                        >
                          I agree all statements in
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
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
      {/* <div classNameName="row col-md-6 offset-md-3">
        <div classNameName="card">
          <div classNameName="mb-3 mt-3">
            <h4 classNameName="text-center fw-normal">Sign Up</h4>
          </div>
          {error && <div classNameName="alert alert-danger">{error}</div>}

          <div classNameName="card-body">
            <form classNameName="reg_form" onSubmit={handleUserRegistration}>
              <div classNameName="row row-cols-2">
                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">First Name</label>
                  <input
                    classNameName="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    type="text"
                    required
                  />
                </div>

                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">Last Name</label>
                  <input
                    classNameName="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    type="text"
                    required
                  />
                </div>

                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">Email</label>
                  <input
                    classNameName="form-control"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Enter email address"
                    type="email"
                    required
                  />
                </div>

                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">Phone</label>
                  <input
                    classNameName="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter phone"
                    type="number"
                    required
                  />
                </div>

                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">Password</label>
                  <input
                    classNameName="form-control"
                    id="password"
                    name="password"
                    placeholder="*****"
                    type="password"
                    required
                  />
                </div>
                <div classNameName="form-group mb-3">
                  <label classNameName="form-label">Confirm Password</label>
                  <input
                    classNameName="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="*****"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div classNameName="form-group mb-3 text-center">
                <button classNameName="reg_btn btn btn-primary " type="submit">
                  Register
                </button>
              </div>
              <div classNameName="text-center">
                <p>
                  Already registered? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
}
