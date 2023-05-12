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

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  /**
   *  Navigates to the login after clicking logout button
   * @method onClickLogout
   */
  const onClickLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="button" variant="primary" onClick={onClickLogout}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="navbar navbar-expand-lg bg-light border-bottom">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/images/model_store.svg"
              className="logo"
              alt="Model Store logo"
            />
          </a>
          <div className="logout-div">
            {props.isLoggedIn ? (
              <>
                <Button
                  className="button btn btn-primary"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Logout
                </Button>
                <AuthVerify logout={onClickLogout} />
              </>
            ) : (
              <>
                <Button
                  className="button btn btn-primary"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Sign in
                </Button>
                <AuthVerify logout={onClickLogout} />
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
