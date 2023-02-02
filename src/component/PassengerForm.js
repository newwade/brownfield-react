// export default createForm;
import React, { useState } from "react";
function PassengerForm(props) {
  const [gender, setGender] = useState("select gender");
  const p_no = props.p_no ? props.p_no + 1 : 1;
  //   const createForm = () => {
  //     const forms = [];
  //     for (let i = 0; i < count; i++) {
  //       let passengerform = (
  //         <form className="passenger_form" id="passenger_form">
  //           <div className="form-row row">
  //             <div className="col-sm-4 mb-3">
  //               <label for="firstName">First name</label>
  //               <input
  //                 type="text"
  //                 className="form-control "
  //                 id="firstName"
  //                 name="firstName"
  //                 placeholder="First name"
  //                 required
  //               />
  //             </div>
  //             <div className="col-sm-4 mb-3">
  //               <label for="lastName">Last name</label>
  //               <input
  //                 type="text"
  //                 className="form-control "
  //                 id="lastName"
  //                 name="lastName"
  //                 placeholder="Last name"
  //                 required
  //               />
  //             </div>
  //             <div className="col-md-4 mb-3">
  //               <label for="mobileNumber">Phone</label>
  //               <div className="input-group">
  //                 <div className="input-group-prepend">
  //                   <span className="input-group-text">#</span>
  //                 </div>
  //                 <input
  //                   type="text"
  //                   className="form-control "
  //                   id="mobileNumber"
  //                   name="mobileNumber"
  //                   placeholder="+91"
  //                   aria-describedby="inputGroupPrepend3"
  //                   required
  //                 />
  //               </div>
  //             </div>
  //             <div className="col-md-6 mb-3">
  //               <label for="gender">Gender</label>
  //               <select
  //                 className="form-control"
  //                 id="gender"
  //                 name="gender"
  //                 // value={gender}
  //                 // onChange={(e) => setGender(e.target.value)}
  //               >
  //                 <option>Male</option>
  //                 <option>Female</option>
  //                 <option>Other</option>
  //               </select>
  //             </div>
  //             <div className="col-md-6 mb-3">
  //               <label for="emailAddress">Email</label>
  //               <input
  //                 type="text"
  //                 className="form-control "
  //                 id="emailAddress"
  //                 name="emailAddress"
  //                 placeholder="example@example.com"
  //                 required
  //               />
  //             </div>
  //           </div>
  //         </form>
  //       );
  //       forms.push(passengerform);
  //     }
  //     return forms;
  //   };
  function lettersOnly(input) {
    let regex = /[^a-zA-z]/gi;
    input.target.value = input.target.value.replace(regex, "");
  }
  return (
    <div className="bg-light mb-2 p-2 rounded ">
      <p>Passenger {p_no}</p>
      <form className="passenger_form" id="passenger_form">
        <div className="form-row row">
          <div className="col-sm-4 mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className="form-control "
              id="firstName"
              name="firstName"
              placeholder="First name"
              required
              onKeyUp={(e) => {
                lettersOnly(e);
              }}
            />
          </div>
          <div className="col-sm-4 mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className="form-control "
              id="lastName"
              name="lastName"
              placeholder="Last name"
              required
              onKeyUp={(e) => {
                lettersOnly(e);
              }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="mobileNumber">Phone</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">#</span>
              </div>
              <input
                type="number"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="+91"
                aria-describedby="inputGroupPrepend3"
                required
              />
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="emailAddress">Email</label>
            <input
              type="email"
              className="form-control "
              id="emailAddress"
              name="emailAddress"
              placeholder="example@example.com"
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PassengerForm;
