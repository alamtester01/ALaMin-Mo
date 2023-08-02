import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { login } from "actions/auth";
import { clearMessage } from "actions/message";
import { useNavigate } from "react-router-dom";
import { Container, InputGroup, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

/**
 * A module for the SignIn Component
 * @module components/users/SignIn
 */

/**
 * SignIn Component
 * @method SignIn
 * @return {JSX.Element}
 *
 */
const SignIn = (props) => {
  import("styles/SignIn.css");
  const navigate = useNavigate();
  const form = useRef();
  const dispatch = useDispatch();

  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  /**
   * --------------------
   * * Component state
   *  -------------------
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(true);

  /**
   *  Validates name and value of the input field
   * @method validate
   * @param {string} name - A string for name of the input field
   * @param {string} value - A string for the value of the input field
   *
   * @return {void}
   */
  const validate = (name, value) => {
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This field is required!" }));
      return;
    }
    if (
      name === "email" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    ) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "This is not a valid email." }));
      return;
    }
    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  /**
   * Gets the corresponding error message
   * @method getFormErrorMessage
   * @param {string} name - A string for the name of the input field
   *
   * @return {HTMLElement}
   */
  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  /**
   * Change hidden state of password
   * @method onClickPasswordBtn
   */
  const onClickPasswordBtn = () => {
    setPasswordShow(passwordShow ? false : true);
  };

  /**
   * Navigate to the registration page
   * @method onClickRegister
   */
  const onClickRegister = () => {
    navigate("/signup/");
  };

  /**
   * Gets value of the email input field
   * @method onChangeEmail
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    validate("email", email);
  };

  /**
   * Gets value of the password input field
   * @method onChangePassword
   *
   * @param {event} e - An event object containing information about the action
   */
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    validate("password", password);
  };

  /**
   * Handles login data after submitting the form
   * @method handleLogin
   *
   * @param {event} e - An event object containing information about the action
   */
  const handleLogin = (e) => {
    e.preventDefault();

    validate("email", email);
    validate("password", password);
    setCounter(counter + 1);

    if (Object.keys(error).length === 0) {
      setLoading(true);
      dispatch(login(email, password))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (email !== "" && password !== "" && Object.keys(error).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  /**
   *  Navigate to the model list if the user already logged in
   */
  if (isLoggedIn) {
    return <Navigate to="/models" />;
  }

  return (
    <section>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "75vh" }}
      >
        <form onSubmit={handleLogin} ref={form}>
          <p className="text-center h2 mx-1 mt-4">Sign In</p>
          <p className="text-center">Use your account</p>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form3Example3">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${
                isValid?.email
                  ? "is-valid"
                  : isValid.email !== undefined
                  ? "is-invalid"
                  : ""
              }`}
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
            {getFormErrorMessage("email")}
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" htmlFor="form3Example4">
              Password
            </label>
            <InputGroup className="mb-3">
              <input
                type={passwordShow ? "text" : "password"}
                className={`form-control password ${
                  isValid?.password
                    ? "is-valid"
                    : isValid.password !== undefined
                    ? "is-invalid"
                    : ""
                }`}
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <Button variant="outline-secondary">
                <FontAwesomeIcon
                  className="icon"
                  onClick={onClickPasswordBtn}
                  icon={passwordShow ? solid("eye") : solid("eye-slash")}
                />
              </Button>
              {getFormErrorMessage("password")}
              <div className="text-right">
                <Link to="/forgot-password/" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>
            </InputGroup>
          </div>

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-light"
              onClick={onClickRegister}
              className="cancel-btn"
            >
              Create account
            </Button>
            <Button
              variant="primary button"
              type="submit"
              disabled={disabled}
              className="submit-btn"
            >
              Sign in
              {loading && (
                <Spinner
                  className="spinner"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default SignIn;
