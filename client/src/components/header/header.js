import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, formActions, pageActions } from "../../store/index";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const whichPage = useSelector((state) => state.page.page);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(formActions.setemail(""));
    dispatch(formActions.setpassword(""));
    dispatch(formActions.setfirstname(""));
    dispatch(formActions.setlastname(""));
    dispatch(formActions.setaddress(""));
    dispatch(formActions.setphone(""));
    document.cookie = "tok";
  };
  const togglePageHandler = () => {
    dispatch(pageActions.togglePage());
    dispatch(authActions.logout());
    dispatch(formActions.setemail(""));
    dispatch(formActions.setpassword(""));
    dispatch(formActions.setfirstname(""));
    dispatch(formActions.setlastname(""));
    dispatch(formActions.setaddress(""));
    dispatch(formActions.setphone(""));
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light nav">
        <a class="navbar-brand navbar-and" href="#">
          <h1>User</h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            {whichPage == 2 ? (
              <li class="nav-item">
                <h3>
                  <a class="nav-link" href="#" onClick={togglePageHandler}>
                    {!isAuth ? <h2>Login</h2> : <h2></h2>}
                  </a>
                </h3>
              </li>
            ) : (
              <li class="nav-item">
                <h3>
                  <a class="nav-link" href="#" onClick={togglePageHandler}>
                    {!isAuth ? <h2>Register</h2> : <h2></h2>}
                  </a>
                </h3>
              </li>
            )}

            {!isAuth && (
              <li class="nav-item active">
                <a class="nav-link" href="#"></a>
              </li>
            )}
            {isAuth && (
              <li class="nav-item active">
                <button class="nav-link" href="#" onClick={logoutHandler}>
                  LogOut
                </button>
              </li>
            )}
          </ul>
          <span class="navbar-text ">- User registration</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
