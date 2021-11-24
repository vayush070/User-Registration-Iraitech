import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { formActions, authActions, alertActions } from "../../store";
import "./User.css";

const User = () => {
  const [show, setshow] = useState(0);
  const dispatch = useDispatch();
  const firstname = useSelector((state) => state.form.firstname);
  const lastname = useSelector((state) => state.form.lastname);
  const email = useSelector((state) => state.form.email);
  const phone = useSelector((state) => state.form.phone);
  const address = useSelector((state) => state.form.address);
  const getuser = async () => {
    const user = await axios.get("/api/uauth");
    console.log(user);
    dispatch(formActions.setemail(user.data.email));
    dispatch(formActions.setfirstname(user.data.firstname));
    dispatch(formActions.setlastname(user.data.lastname));
    dispatch(formActions.setaddress(user.data.address));
    dispatch(formActions.setphone(user.data.phone));
    setshow(1);
  };
  const u_id = useSelector((state) => state.form.curr_id);
  return (
    <div className="container1">
      {show ? (
        <div className="information">
          <h2 className="head-text">Welcome {firstname} !</h2>
        </div>
      ) : (
        <div className="information">
          <h3 className="head-text1">LoggedIn Successfully</h3>
        </div>
      )}
      {show ? (
        <div className="information1">
          <div className="head-text1">
            Name: {firstname} {lastname}
          </div>
          <div className="head-text1">Email: {email}</div>
          <div className="head-text1">Phone: {phone}</div>
          <div className="head-text1">Address: {address}</div>
        </div>
      ) : (
        <button onClick={getuser}>Show User Details</button>
      )}
    </div>
  );
};

export default User;
