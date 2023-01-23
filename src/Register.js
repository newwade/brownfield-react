import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleUserRegistration = async (e) => {
    e.preventDefault();
    try {
      const password1 = e.target.password.value;
      const password2 = e.target.confirm_password.value;
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
    <div className="container">
      <div className="row col-md-6 offset-md-3">
        <div className="card">
          <div className="mb-3 mt-3">
            <h4 className="text-center fw-normal">Sign Up</h4>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card-body">
            <form className="reg_form" onSubmit={handleUserRegistration}>
              <div className="row row-cols-2">
                <div className="form-group mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter first name"
                    type="text"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter last name"
                    type="text"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Enter email address"
                    type="email"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Enter phone"
                    type="number"
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="*****"
                    type="password"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    className="form-control"
                    id="confirm_password"
                    name="confirm_password"
                    placeholder="*****"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3 text-center">
                <button className="reg_btn btn btn-primary " type="submit">
                  Register
                </button>
              </div>
              <div className="text-center">
                <p>
                  Already registered? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
