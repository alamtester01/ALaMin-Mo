import { useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Alert } from "react-bootstrap";
import { CancelToken, isCancel } from "axios";
import Home from "components/Home";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import RequireAuth from "components/RequireAuth";
import PageNotFound from "components/PageNotFound";
import ForgotPassword from "components/ForgotPassword";
import Header from "components/layout/Header";
import Sidebar from "components/layout/Sidebar";
import { clearMessage } from "actions/message";

import "./App.css";

/**Bootstrap Imports*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import GroupList from "components/groups/GroupList";

/**
 * A module for App main component
 * @module App
 */

/**
 * App main component that list all routes to redirect to their corresponding components
 * @method App
 *
 * @return {JSX.Element}
 *
 */
const App = () => {
  const { message } = useSelector((state) => state.message);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [successful, setSuccessful] = useState(false);

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

  return (
    <>
      <div className="layout">
        <Header isLoggedIn={isLoggedIn} />
        <div className="main">
          {isLoggedIn && <Sidebar />}
          <Sidebar />
          <Col id="page-content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/groups" element={<GroupList />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />

              {/* PROTECTED ROUTES */}
              <Route element={<RequireAuth />}></Route>
            </Routes>
          </Col>
        </div>
        {message && (
          <div className="form-group">
            <Alert
              className="alert-message"
              show={show}
              variant={successful ? "success" : "danger"}
              onClose={() => setShow(false)}
              dismissible
            >
              <p>{message}</p>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
