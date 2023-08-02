import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activate } from "../../actions/auth";

/**
 * A module for Account Activate Component
 * @module components/AccountActivate
 */

/**
 * Account Activate Component
 * @method AccountActivate
 *
 * @return {JSX.Element}
 *
 */
const AccountActivate = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uid = params.uid;
  const token = params.token;

  /**
   * --------------------
   * * Component state
   *  -------------------
   */
  const [success, setSuccess] = useState(null);
  const [contentMessage, setContentMessage] = useState("");

  /**
   * Activate user account
   */
  useEffect(() => {
    dispatch(activate(uid, token))
      .then(() => {
        setContentMessage("User successfully activated");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setContentMessage(err.message);
      });
  }, []);

  /**
   * Navigates to the corresponding login after clicking back button
   * @method onClickGoBack
   */
  const onClickGoBack = () => {
    navigate("/signin");
  };

  return (
    <section>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Login"
            />
          </div>
          {success ? (
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <p className="text-left h2 mb-5 mx-1 mx-md-4 mt-4">
                Account Activated
              </p>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  {contentMessage}
                </label>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    onClick={onClickGoBack}
                    className="button btn btn-primary btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Go back to Login Page
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <p className="text-left h2 mb-5 mx-1 mx-md-4 mt-4">
                {success !== null && "URL Invalid"}
              </p>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form3Example3">
                  {contentMessage}
                </label>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    onClick={onClickGoBack}
                    className="button btn btn-primary btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                    }}
                  >
                    Go back to Login Page
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AccountActivate;
