import { Modal, Button, Form, OverlayTrigger } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGroup } from "actions/group";
import ReactQuill from "react-quill";
import { modules, formats } from "common/constants";

/**
 * A module for the EditGroupModal Component
 * @module components/layout/CreateGroupModal
 */

/**
 * Editing group modal
 * @method EditGroupModal
 *
 * @return {JSX.Element}
 *
 */
const EditGroupModal = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});
  const [toolbarHidden, setToolbarHidden] = useState(true);
  const [isToolbarClicked, setIsToolbarClicked] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const onChangeGroupName = (e) => {
    const value = e.target.value;
    setGroupName(value);
    validate("groupName", value);
  };

  const onChangeGroupDescription = (e) => {
    setGroupDescription(e);
    validate("groupDescription", e);
  };

  const handleFormSubmit = (e) => {
    dispatch(
      updateGroup(
        props?.groupID,
        groupName,
        groupDescription,
        props?.groupMembers
      )
    )
      .then((status) => {
        props.setToastStatus(status);
        props.setToastImage("/images/edit-success.svg");
        setDisabled(true);
      })
      .catch((status) => {
        props.setToastStatus(status);
        props?.setToastImage(null);
      })
      .finally(() => {
        setDisabled(false);
        props.setShowToast(true);
        props.handleEditGroupModalClose();
        resetModalForm();
      });
  };

  const resetModalForm = () => {
    setDisabled(true);
    setGroupName(props?.groupName);
    setGroupDescription(props?.groupDescription);
    setIsValid({});
    setError({});
    setToolbarHidden(true);
  };

  /**
   *  Validates name and value of the input field
   * @method validate
   * @param {string} name - A string for name of the input field
   * @param {string} value - A string for the value of the input field
   *
   * @return {void}
   */
  const validate = (name, value) => {
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "Please fill out this field" }));
      return;
    }

    delete error[name];
    setIsValid(Object.assign(isValid, { [name]: true }));
  };

  /**
   * Gets the corresponding error message
   * @method getFormErrorMessage
   * @param {string} name - A string for the name of the input field
   *
   * @return {HTMLElement}
   */
  const getFormErrorMessage = (name) => {
    return <div className="invalid-feedback">{error[name]}</div>;
  };

  /**
   * Setting the toolbar hidden of the text editor based on the name of the input field
   * @method onBlur
   *
   * @param {string} name - A string for the name of the input field
   * @param {event} e - An event object containing information about the action
   */
  const onBlur = () => {
    if (!isToolbarClicked) {
      setToolbarHidden(true);
    }
  };

  const handleMouseDown = () => {
    setIsToolbarClicked(true);
  };

  const handleMouseUp = () => {
    setIsToolbarClicked(false);
  };

  const onFocus = () => {
    setToolbarHidden(false);
  };

  useEffect(() => {
    if (
      groupName !== "" &&
      groupDescription !== "" &&
      Object.keys(error).length === 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [groupName, groupDescription]);

  useEffect(() => {
    setGroupName(props?.groupName);
    setGroupDescription(props?.groupDescription);
  }, [props]);

  return (
    <>
      <Modal
        show={props.showEditGroupModal}
        onHide={props.handleEditGroupModalClose}
        dialogClassName="modal-60w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="bold">Edit Group Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Group name</Form.Label>
              <Form.Control
                type="text"
                value={groupName}
                onChange={onChangeGroupName}
                className={`form-control ${
                  isValid?.groupName
                    ? "is-valid"
                    : isValid.groupName !== undefined
                    ? "is-invalid"
                    : ""
                }`}
              />
              {getFormErrorMessage("groupName")}
              <Form.Text className="text-muted">
                Give a name to your group
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3 group-div"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onBlur={onBlur}
              onFocus={onFocus}
            >
              <Form.Label className="required-field">Description</Form.Label>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={groupDescription}
                onChange={onChangeGroupDescription}
                className={`form-control ${
                  isValid?.groupDescription
                    ? "is-valid"
                    : isValid.groupDescription !== undefined
                    ? "is-invalid"
                    : ""
                } ${toolbarHidden ? "toolbar-hidden" : "toolbar-display"}`}
              />
              {getFormErrorMessage("groupDescription")}
              <Form.Text className="text-muted">
                Let people know what your group is about.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleEditGroupModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleFormSubmit}
            disabled={disabled}
            className="button submit-btn"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditGroupModal;
