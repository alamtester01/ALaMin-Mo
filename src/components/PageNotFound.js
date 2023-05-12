import { useNavigate } from "react-router-dom";

/**
 * A module for 404 Page Not Found component
 * @module components/PageNotFound
 */

/**
 * 404 Page Not Found component
 * @method PageNotFound
 *
 * @return {JSX.Element}
 *
 */
const PageNotFound = (props) => {

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
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">
              Sorry, an error has occured, Requested page not found!
            </div>
            <div className="error-actions">
              <button
                type="button"
                className="button btn btn-primary btn-lg"
                onClick={onClickHome}
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
