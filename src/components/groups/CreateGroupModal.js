import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Modal, Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { List, AutoSizer } from "react-virtualized";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch } from "react-redux";
import { addGroup } from "actions/group";
/**
 * A module for the CreateGroupModal Component
 * @module components/layout/CreateGroupModal
 */

/**
 * Displaying menu in the left side of the system
 * @method CreateGroupModal
 *
 * @return {JSX.Element}
 *
 */
const CreateGroupModal = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupMembers, setGroupMembers] = useState({});

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

  const onChangeGroupName = (e) => {
    const value = e.target.value;
    setGroupName(value);
  }

  const onChangeGroupDescription = (e) => {
    const value = e.target.value;
    setGroupDescription(value);
  }

  const handleFormSubmit = (e) => {
    dispatch(addGroup(groupName, groupDescription, selectedOptions)).then(() => {
      console.log("success");
    });
  };
  return (
    <>
      <Modal
        show={props.showGroupModal}
        onHide={props.handleClose}
        dialogClassName="modal-60w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Group Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Group name</Form.Label>
              <Form.Control
                type="text"
                value={groupName}
                onChange={onChangeGroupName}
              />
              <Form.Text className="text-muted">
                Give a name to your group
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Description</Form.Label>
              <Form.Control
                value={groupDescription}
                onChange={onChangeGroupDescription}
                as="textarea"
                rows={3}
              />
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
          <Button variant="secondary" onClick={props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
