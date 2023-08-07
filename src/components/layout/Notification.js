import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "actions/auth";
import { useState } from "react";
import { Dropdown, Tabs, Tab, Container } from "react-bootstrap";

/**
 * A module for the Notification Component
 * @module components/layout/Notification
 */

/**
 * Notification elements displaying the logo and the logout button
 * @method Notification
 *
 * @param {any} props - An arbitrary inputs of components
 *
 * @return {JSX.Element}
 *
 */
const Notification = (props) => {
  // import("../../styles/Notification.css");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = (e) => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Dropdown
        show={expanded}
        onToggle={handleToggleExpand}
        className="my-groups-dropdown"
      >
        <Dropdown.Toggle
          variant="outline-primary"
          className={expanded ? "button" : "my-groups-btn btn-outline-light"}
          id="dropdown-filter-toggle"
        >
          <img
            src="/images/bell.svg"
            className="img-fluid"
            alt="Notification"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="my-groups-dropdown-menu">
          <div className="bold">Notifications</div>
          <Tabs
            defaultActiveKey="all"
            id="notification-tabs"
            className="mb-3"
          >
            <Tab
              eventKey="all"
              tabClassName="tabs"
              title="All"
            >
              <p className="bold">All</p>
            </Tab>
            <Tab
              eventKey="unread"
              tabClassName="tabs"
              title="Unread"
            >
              <p className="bold">Unread</p>
              <Container className="mw-100"></Container>
            </Tab>
          </Tabs>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Notification;
