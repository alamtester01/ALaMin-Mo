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

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [secondsUntilPrompt, setSecondsUntilPrompt] = useState(300); // 10 minutes
  const [secondsUntilLogout, setSecondsUntilLogout] = useState(5); // 10 minutes
  const promptTime = 300; // 5 minutes
  const logoutTime = 5; // 10 minutes
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  let promptTimer;

  const decrementPromptTime = () => {
    if (secondsUntilPrompt > 0) {
      setSecondsUntilPrompt((prevTime) => prevTime - 1);
    }
  };

  const decrementLogoutTime = () => {
    console.log(secondsUntilLogout);
    if (secondsUntilLogout > 0) {
      setSecondsUntilLogout((prevTime) => prevTime - 1);
    }
  };

  const resetPromptTimer = () => {
    clearTimeout(promptTimer);
    promptTimer = setTimeout(() => {
      setShowLogoutModal(true);
      // setSecondsUntilLogout(logoutTime);
    }, promptTime * 1000);
    setSecondsUntilPrompt(promptTime);
  };

  // useEffect(() => {
  //   if (showLogoutModal && secondsUntilLogout === 0) {
  //     handleLogout();
  //   }
  // }, [showLogoutModal, secondsUntilLogout]);

  const handleLogout = () => {
    // Perform logout actions
    console.log("User has been automatically logged out.");
    dispatch(logout());
    navigate("/");
    setShowLogoutModal(false);
  };

  const handleStaySignedIn = () => {
    localStorage.setItem("access", localStorage.getItem("refresh"));
    setShowLogoutModal(false);
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

    return () => {
      clearTimeout(promptTimer);
      events.forEach((event) =>
        document.removeEventListener(event, resetPromptTimer)
      );
    };
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(decrementPromptTime, 1000);

    return () => clearInterval(countdownInterval);
  }, [secondsUntilPrompt]);

  // useEffect(() => {
  //   const countdownInterval = setInterval(decrementLogoutTime, 1000);

  //   return () => clearInterval(countdownInterval);
  // }, [secondsUntilLogout]);

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light-color">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="/images/astiALaM-logo-only.png"
              className="logo"
              alt="Model Store logo"
            />
            <span className="dimer semi-bold ms-2">DIMER</span>
            <div>
              {/* <p>Auto Logout in: {secondsUntilPrompt} seconds</p> */}
            </div>
          </Link>
          <div className="d-flex">
            {props?.isLoggedIn ? (
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
        show={showLogoutModal}
        onHide={handleLogoutModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Still there? </p>
          <p>You will be automatically signed out due to inactivity.</p>
          {/* Remaining Time: {secondsUntilLogout} */}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={handleStaySignedIn}
            className="cancel-btn"
          >
            Stay Signed-in
          </Button>
          <Button
            variant="danger"
            onClick={handleLogout}
            className="submit-btn"
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
