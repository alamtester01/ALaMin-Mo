import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import CreateGroupModal from "components/groups/CreateGroupModal";
import CreateModelModal from "components/models/CreateModelModal";

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
const Sidebar = (props) => {
  const location = useLocation();
  import("../../styles/Sidebar.css");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);

  const handleGroupModalClose = () => {
    setShowGroupModal(false);
  };

  const handleModelModalClose = () => {
    setShowModelModal(false);
  };

  return (
    <>
      <CreateGroupModal
        showGroupModal={showGroupModal}
        handleGroupModalClose={handleGroupModalClose}
        setShowToast={props?.setShowToast}
        setToastStatus={props?.setToastStatus}
        setToastImage={props?.setToastImage}
      />
      <CreateModelModal
        showModelModal={showModelModal}
        handleModelModalClose={handleModelModalClose}
        setShowToast={props?.setShowToast}
        setToastStatus={props?.setToastStatus}
        setToastImage={props?.setToastImage}
      />
      <Col className="sidebar-col col-md-2 bg-light-color">
        <div className="sidebar p-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Dropdown className="mb-9">
                <Dropdown.Toggle className="new button" id="dropdown-basic">
                  <FontAwesomeIcon className="plus icon" icon={solid("plus")} />
                  New
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowModelModal(true)}>
                    <img
                      src="/images/new_dropdown_model.svg"
                      className="icon"
                      alt="model"
                    />
                    Model Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#/dataset">
                    <img
                      src="/images/new_dropdown_dataset.svg"
                      className="icon"
                      alt="dataset"
                    />
                    Dataset Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowGroupModal(true)}>
                    <img
                      src="/images/new_dropdown_group.svg"
                      className="icon"
                      alt="group"
                    />
                    Group
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Link
                to="/models"
                className={`sidebar-item nav-link ${
                  location.pathname.includes("models") && "active"
                }`}
              >
                <img
                  src={`/images/${
                    location.pathname.includes("models")
                      ? "sidebar_models.svg"
                      : "sidebar_models_gray.svg"
                  }`}
                  className="icon"
                  alt="models"
                />
                Models
              </Link>
            </li>
            <li>
              <a href="#" className="sidebar-item nav-link link-dark">
                <img
                  src={`/images/${
                    location.pathname.includes("datasets")
                      ? "sidebar_datasets.svg"
                      : "sidebar_datasets_gray.svg"
                  }`}
                  className="icon"
                  alt="datasets"
                />
                Datasets
              </a>
            </li>
            <li>
              <Link
                to="/groups"
                className={`sidebar-item nav-link ${
                  location.pathname.includes("groups") && "active"
                }`}
              >
                <img
                  src={`/images/${
                    location.pathname.includes("groups")
                      ? "sidebar_groups.svg"
                      : "sidebar_groups_gray.svg"
                  }`}
                  className="icon"
                  alt="datasets"
                />
                Groups
              </Link>
            </li>
          </ul>
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
