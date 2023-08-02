import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Spinner, Alert, Card, Button } from "react-bootstrap";
import { forgotPassword } from "actions/auth";
import { clearMessage } from "actions/message";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

/**
 * A module for Forgot Password Page component
 * @module components/ForgotPassword
 */

/**
 * Forgot Password Page component
 * @method ForgotPassword
 *
 * @return {JSX.Element}
 *
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();

  const { message } = useSelector((state) => state.message);

  /**
   * --------------------
   * * Component state
   *  -------------------
   */
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  /**
   * Validates name and value of the input field
   * @method validate
   *
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
   *
   * @param {string} name - A string for the name of the input field
   *
   * @return {HTMLElement}
   */
  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  /**
   * Navigates to home page
   * @method onClickHome
   */
  const onClickHome = () => {
    navigate("/");
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

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    dispatch(forgotPassword(email))
      .then(() => {
        setSuccessful(true);
        setEmailSuccessMessage(
          "A reset password link has been sent. Please check your email account."
        );
      })
      .catch(() => {
        setShow(true);
        setSuccessful(false);
        const timeout = setTimeout(() => {
          setShow(false);
          dispatch(clearMessage());
        }, 5000); // 5 seconds

        return () => clearTimeout(timeout);
      })
      .finally(() => {
        setLoading(false);
        setDisabled(false);
      });
  };

  return (
    <section>
      <div className="div container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="/images/forgot_password.jpg"
              className="img-fluid"
              alt="image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            {!successful ? (
              <form onSubmit={handleForgotPassword} ref={form}>
                <p className="text-left h2 mb-5 mx-1 mt-4">
                  Reset Your Password
                </p>
                <p>
                  Enter the email address associated with your account and we'll
                  send you a link to reset your password
                </p>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    <span className="required">*</span>Email address
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
                <div className="text-center text-lg-start mt-4 pt-2">
                  <Button type="submit" className="button btn btn-primary btn-lg" variant="primary" disabled={disabled}>
                    Send
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
              </form>
            ) : (
              <Card body>
                {/* <FontAwesomeIcon
                  className="icon"
                  icon={solid("envelope-circle-check")}
                /> */}
                {emailSuccessMessage}
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
