import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "actions/auth";
import AuthVerify from "common/AuthVerify";
import Notification from "./Notification";
import Profile from "./Profile";

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
          <div className="d-flex">
            {props?.isLoggedIn ? (
              <>
                <Notification />
                <Profile />
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
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
