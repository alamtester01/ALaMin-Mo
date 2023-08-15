import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "actions/auth";
import { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import AuthVerify from "common/AuthVerify";

/**
 * A module for the Profile Component
 * @module components/layout/Profile
 */

/**
 * Profile elements displaying the logo and the logout button
 * @method Profile
 *
 * @param {any} props - An arbitrary inputs of components
 *
 * @return {JSX.Element}
 *
 */
const Profile = (props) => {
  import("../../styles/Profile.css");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = (e) => {
    setExpanded(!expanded);
  };

  /**
   *  Navigates to the login after clicking logout button
   * @method onClickLogout
   */
  const onClickLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Dropdown
        show={expanded}
        onToggle={handleToggleExpand}
        className="profile-dropdown"
      >
        <Dropdown.Toggle
          variant="outline-primary"
          className={expanded ? "button" : "my-groups-btn btn-outline-light"}
          id="dropdown-filter-toggle"
        >
          <img src="/images/profile.svg" className="img-fluid" alt="Profile" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="profile-dropdown-menu">
          <div className=" d-flex flex-column align-items-center">
            <img
              src="/images/profile-image-icon.svg"
              className="img-fluid"
              alt="Profile"
            />
            <div>{user?.first_name + " " + user?.last_name}</div>
            <p>{user?.email}</p>
            {/* <Button className="button btn btn-primary" type="button">
              Manage Account
            </Button> */}
            <Dropdown.Divider />
            <Button
              variant="outline-light"
              className="cancel-btn"
              type="button"
              onClick={onClickLogout}
            >
              Sign out
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <AuthVerify logout={onClickLogout} />
    </>
  );
};

export default Profile;
