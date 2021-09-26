import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <header>
        <div className="container">
          <h1>Blog Website</h1>
        </div>
      </header>
      <nav>
        <div className="container flex-between">
          <div className="left-nav">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
          </div>
          <div className="right-nav">
            {userInfo ? (
              <Fragment>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="#" onClick={logoutHandler}>
                  Logout
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
