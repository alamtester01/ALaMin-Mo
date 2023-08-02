import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "actions/auth";
import AuthVerify from "common/AuthVerify";

/**
 * A module for the Header Component
 * @module components/layout/Header
 */

/**
 * Header elements displaying the logo and the logout button
 * @method Header
 *
 * @param {any} props - An arbitrary inputs of components
 *
 * @return {JSX.Element}
 *
 */
const Header = (props) => {
  import("../../styles/Header.css");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   *  Navigates to the login after clicking logout button
   * @method onClickLogout
   */
  const onClickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light-color">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/images/model_store.svg"
              className="logo"
              alt="Model Store logo"
            />
          </a>
          <div className="logout-div">
            {props?.isLoggedIn ? (
              <>
                <Button
                  className="button btn btn-primary"
                  type="button"
                  onClick={onClickLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="button btn btn-primary"
                  type="button"
                  onClick={() => navigate("signin")}
                >
                  Sign in
                </Button>
              </>
            )}
            <AuthVerify logout={onClickLogout} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
