import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Notification from "./Notification";
import Profile from "./Profile";

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
  const location = useLocation();

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
    </>
  );
};

export default Header;
