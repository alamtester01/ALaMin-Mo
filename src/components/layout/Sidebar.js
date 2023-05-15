import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import CreateGroupModal from "components/groups/CreateGroupModal";
/**
 * A module for the Sidebar Component
 * @module components/layout/Sidebar
 */

/**
 * Displaying menu in the left side of the system
 * @method Sidebar
 *
 * @return {JSX.Element}
 *
 */
const Sidebar = () => {
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleClose = () => {
    setShowGroupModal(false);
  };

  return (
    <>
      <CreateGroupModal
        showGroupModal={showGroupModal}
        handleClose={handleClose}
      />
      <Col className="col-md-2 bg-light">
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Dropdown className="mb-9">
                <Dropdown.Toggle className="button" id="dropdown-basic">
                  <FontAwesomeIcon className="icon" icon={solid("plus")} />
                  New
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <FontAwesomeIcon className="icon" icon={solid("cubes")} />
                    Model Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    <FontAwesomeIcon
                      className="icon"
                      icon={solid("database")}
                    />
                    Dataset Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowGroupModal(true)}>
                    <FontAwesomeIcon className="icon" icon={solid("users")} />
                    Group
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                <FontAwesomeIcon className="icon" icon={solid("cubes")} />
                Models
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark">
                <FontAwesomeIcon className="icon" icon={solid("database")} />
                Datasets
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark">
                <FontAwesomeIcon className="icon" icon={solid("users")} />
                Groups
              </a>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
