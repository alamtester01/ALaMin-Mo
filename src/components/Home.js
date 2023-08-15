import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

/**
 * A module for Home Page component
 * @module components/PageNotFound
 */

/**
 * Home Page component
 * @method Home
 *
 * @return {JSX.Element}
 *
 */
const Home = (props) => {
  import("styles/Home.css");
  /**
   * -------------------
   * * Redux store state
   * -------------------
   */
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  /**
   * Navigates to create account page
   * @method onClickSignUp
   */
  const onClickSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    navigate("/signin");
  }, []);

  /**
   *  Navigate to the model list if the user already logged in
   */
  if (isLoggedIn) {
    return <Navigate to="/models" />;
  }

  return (
    <div className="home-container-1">
      <div className="row home-row-1">
        <div className="col-md-7">
          <div className="heading-1 bold">
            <p>Thinking outside the box,</p>
            <p>artificially.</p>
          </div>
          <div className="heading-2">
            <p>
              Our platform offers AI models and datasets that best suit your
              needs.
            </p>
          </div>
          <div className="error-details"></div>
          <div className="error-actions">
            <button
              type="button"
              className="button btn btn-primary btn-lg"
              onClick={onClickSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="col-md-5">
          <div className="box-humans">
            <img
              src="/images/box-humans_u34.svg"
              className=" humans img-fluid"
              alt="logo"
            />
            <img src="/images/box.svg" className="box img-fluid" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
