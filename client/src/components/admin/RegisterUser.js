import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Registeruser.css";
import { useDispatch, useSelector } from "react-redux";
import { formActions, authActions, alertActions } from "../../store";

const Admin = () => {
  const dispatch = useDispatch();
  const firstname = useSelector((state) => state.form.firstname);
  const lastname = useSelector((state) => state.form.lastname);
  const email = useSelector((state) => state.form.email);
  const phone = useSelector((state) => state.form.phone);
  const address = useSelector((state) => state.form.address);
  const password = useSelector((state) => state.form.password);
  const emailChangeHandler = (data) => {
    dispatch(formActions.setemail(data.target.value));
  };
  const phoneChangeHandler = (data) => {
    dispatch(formActions.setphone(data.target.value));
  };
  const addressChangeHandler = (data) => {
    dispatch(formActions.setaddress(data.target.value));
  };
  const passwordChangeHandler = (data) => {
    dispatch(formActions.setpassword(data.target.value));
  };
  const name1ChangeHandler = (data) => {
    dispatch(formActions.setfirstname(data.target.value));
  };
  const name2ChangeHandler = (data) => {
    dispatch(formActions.setlastname(data.target.value));
  };
  const formData = {
    firstname,
    lastname,
    email,
    phone,
    address,
    password,
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/uregister", formData, config);
      // console.log(res);
      if (res.status) {
        document.cookie = res.data.token;
        dispatch(alertActions.updateAlert("User Registered"));
        dispatch(authActions.login());
        setTimeout(() => {
          dispatch(alertActions.updateAlert(""));
        }, 3000);
      } else {
        dispatch(alertActions.updateAlert("Something went Wrong"));
        setTimeout(() => {
          dispatch(alertActions.updateAlert(""));
        }, 3000);
        document.cookie = "";
      }
    } catch (error) {
      dispatch(alertActions.updateAlert("Something went Wrong"));
      setTimeout(() => {
        dispatch(alertActions.updateAlert(""));
      }, 3000);
    }
  };

  // console.log(users);
  return (
    <div>
      <div class="form1">
        <h1>Register User</h1>
        <form onSubmit={(e) => onSubmit(e)} class="form-cont">
          <div class="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              onChange={(e) => name1ChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Enter First Name"
              value={firstname}
            />
            <label for="exampleInputEmail1">Last Name</label>
            <input
              onChange={(e) => name2ChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName2"
              aria-describedby="nameHelp"
              placeholder="Enter Last Name"
              value={lastname}
            />
            <label for="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => emailChangeHandler(e)}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <label for="exampleInputEmail1">Phone number</label>
            <input
              onChange={(e) => phoneChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName4"
              aria-describedby="nameHelp"
              placeholder="Enter Phone number"
              value={phone}
            />
            <label for="exampleInputEmail1">Address</label>
            <input
              onChange={(e) => addressChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName5"
              aria-describedby="nameHelp"
              placeholder="Enter Your Address"
              value={address}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => passwordChangeHandler(e)}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
