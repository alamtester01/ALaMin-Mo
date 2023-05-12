import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  /**
   * Navigates to home page
   * @method onClickHome
   */
  const onClickHome = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="error-template">
            <h1>Thinking outside the box, artificially.</h1>
            <h2>
              Our platform offers AI models and datasets that best suit your
              needs.
            </h2>
            <div className="error-details"></div>
            <div className="error-actions">
              <button
                type="button"
                className="button btn btn-primary btn-lg"
                onClick={onClickHome}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <img
              src="/images/box-humans_u34.svg"
              className="img-fluid"
              alt="Sample image"
            />
        </div>
      </div>
    </div>
  );
};

export default Home;
