import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  Col,
  Dropdown,
  Modal,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { List, AutoSizer } from "react-virtualized";
import "react-bootstrap-typeahead/css/Typeahead.css";
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
  const location = useLocation();

  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleClose = () => {
    setShowGroupModal(false);
  };

  const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (selected) => {
    setSelectedOptions(selected);
  };

  const handleDelete = (deleted) => {
    setSelectedOptions(selectedOptions.filter((option) => option !== deleted));
  };

  const rowRenderer = ({ key, index, style }) => (
    <div key={key} style={style}>
      {options[index]}
    </div>
  );
  return (
    <>
      <Modal
        show={showGroupModal}
        onHide={handleClose}
        dialogClassName="modal-60w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Group name</Form.Label>
              <Form.Control type="email" autoFocus />
              <Form.Text className="text-muted">
                Give a name to your group
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Relates to</Form.Label>
              <Form.Control type="text" />
              <Form.Text className="text-muted">
                Assign your model profile to this group
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
              <Form.Text className="text-muted">
                Let people know what your group is about.
              </Form.Text>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3">
            <Form.Label className="required-field">Members</Form.Label>
            <Typeahead
              id="autocomplete-multiselect"
              labelKey="name"
              multiple
              options={options}
              placeholder="Choose options"
              selected={selectedOptions}
              onChange={handleSelect}
            />
            {selectedOptions.length > 0 && (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    rowCount={selectedOptions.length}
                    rowHeight={30}
                    rowRenderer={() => {}}
                    width={width}
                  />
                )}
              </AutoSizer>
            )}
            <Form.Text className="text-muted">
              Add members to your group
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
