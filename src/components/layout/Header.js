import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Notification from "./Notification";
import Profile from "./Profile";
import { useState, useEffect } from "react";
import { logout } from "actions/auth";

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

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [secondsUntilPrompt, setSecondsUntilPrompt] = useState(300); // 10 minutes
  const [secondsUntilLogout, setSecondsUntilLogout] = useState(5); // 10 minutes
  const promptTime = 600; // 5 minutes
  const logoutTime = 300; // 10 minutes

  let promptTimer;

  const decrementPromptTime = () => {
    if (secondsUntilPrompt > 0) {
      setSecondsUntilPrompt((prevTime) => prevTime - 1);
    }
  };

  const decrementLogoutTime = () => {
    if (secondsUntilLogout > 0) {
      setSecondsUntilLogout((prevTime) => prevTime - 1);
    }
  };

  const resetPromptTimer = () => {
    clearTimeout(promptTimer);
    promptTimer = setTimeout(() => {
      // props?.setShowLogoutModal(true);
      setSecondsUntilLogout(logoutTime);
    }, promptTime * 1000);
    setSecondsUntilPrompt(promptTime);
  };

  useEffect(() => {
    if (props?.showLogoutModal && secondsUntilLogout === 0) {
      handleLogout();
    }
  }, [props?.showLogoutModal, secondsUntilLogout]);

  const handleLogout = () => {
    // Perform logout actions
    console.log("User has been automatically logged out.");
    dispatch(logout());
  };

  const handleStaySignedIn = () => {
    props?.setShowLogoutModal(false);
  };

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    const resetTimerAndActivityListeners = () => {
      resetPromptTimer();
      events.forEach((event) =>
        document.addEventListener(event, resetPromptTimer)
      );
    };

    resetTimerAndActivityListeners();

    if (!isLoggedIn) {
      clearTimeout(promptTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetPromptTimer)
      );
    }

    return () => {
      clearTimeout(promptTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetPromptTimer)
      );
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const countdownInterval = setInterval(decrementPromptTime, 1000);
    if (!isLoggedIn) {
      clearInterval(countdownInterval);
    }
    return () => clearInterval(countdownInterval);
  }, [secondsUntilPrompt, isLoggedIn]);

  useEffect(() => {
    const countdownInterval = setInterval(decrementLogoutTime, 1000);

    return () => clearInterval(countdownInterval);
  }, [secondsUntilLogout]);

  const handleLogoutModalClose = () => {
    props?.setShowLogoutModal(false);
  };

  /**
 * Parsing the JWT
 *
 * @method parseJwt
 *
 * @param {string} token - A string for JWT
 *
 * @return {string|null}
 *
 */
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

/**
 * Verifying user access by decoding JWT expiration Component
 * @method AuthVerify
 * @param {any} props - An arbitrary inputs of components
 *
 * @return {JSX.Element}
 *
 */
const AuthVerify = () => {
  const access = localStorage.getItem("access")
  if (access) {
    const decodedJwt = parseJwt(access);
    if (decodedJwt.exp * 1000 < Date.now()) {
      dispatch(logout());
    }
  }
};

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light-color">
        <div className="container-fluid">
          <AuthVerify/>
          <Link to="/" className="navbar-brand">
            <img
              src="/images/astiALaM-logo-only.png"
              className="logo"
              alt="Model Store logo"
            />
            <span className="dimer semi-bold ms-2">DIMER</span>
            <div>
              <p>Auto Logout in: {secondsUntilPrompt} seconds</p>
            </div>
          </Link>
          <div className="d-flex">
            {isLoggedIn ? (
              <>
                {/* <Notification /> */}
                <Profile />
              </>
            ) : (
              !location.pathname.includes("signin") && (
                <>
                  <Button
                    className="button btn btn-primary"
                    type="button"
                    onClick={() => navigate("signin")}
                  >
                    Sign in
                  </Button>
                </>
              )
            )}
          </div>
        </div>
      </nav>
      <Modal
        show={props?.showLogoutModal}
        onHide={handleLogoutModalClose}
        dialogClassName="modal-32w remove-modal"
        contentClassName={isLoggedIn && "yellow"}
        centered
      >
        <Modal.Body>
          <p className="bold">Inactivity detected</p>
          <p>
            {isLoggedIn
              ? "Due to inactivity, you will be signed out from the system in a few moment."
              : "You have been signed-out from the system."}
          </p>
          Remaining Time: {secondsUntilLogout}
        </Modal.Body>
        <Modal.Footer className="justify-content-around">
          <Button onClick={handleStaySignedIn} className="button submit-btn">
            {isLoggedIn ? "Stay signed in" : "Sign In"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
