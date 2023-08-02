import { Modal, Button, Form, OverlayTrigger } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, getAllUsers, getAllGroups } from "actions/group";
import ReactQuill from "react-quill";
import { modules, formats } from "common/constants";

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
  import("../../styles/CreateGroupModal.css");

  const location = useLocation();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});
  const [toolbarHidden, setToolbarHidden] = useState(true);
  const [isToolbarClicked, setIsToolbarClicked] = useState(false);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getAllUsers()).catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const usersList = Object.values(users).map((item) => {
      if (user.email === item.email) {
        setSelectedOptions([
          {
            id: item.id,
            name: item.first_name + " " + item.last_name,
            label: item.first_name + " " + item.last_name,
            email: item.email,
            disableRemove: true,
          },
        ]);
      }
      return {
        id: item.id,
        name: item.first_name + " " + item.last_name,
        label: item.first_name + " " + item.last_name,
        email: item.email,
        disableRemove: user.email === item.email ? true : false,
      };
    });
    setOptions(usersList);
  }, [users]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (selected) => {
    // console.log(user.first_name + " " + user.last_name === selected[0])=
    setSelectedOptions(selected);
  };

  // const handleDelete = (deleted) => {
  //   setSelectedOptions(selectedOptions.filter((option) => option !== deleted));
  // };

  // const rowRenderer = ({ key, index, style }) => (
  //   <div key={key} style={style}>
  //     {options[index]}
  //   </div>
  // );

  const onChangeGroupName = (e) => {
    const value = e.target.value;
    setGroupName(value);
    validate("groupName", value);
  };

  const onChangeGroupDescription = (e) => {
    setGroupDescription(e);
    validate("groupDescription", e);
  };

  const onInputChangeGroupMembers = (e) => {
    validate("groupMembers", e);
  };

  const handleFormSubmit = (e) => {
    const emails = selectedOptions.map((option) => {
      const result = Object.values(users).filter(
        (user) => user.email === option.email
      );
      return result[0].email;
    });
    dispatch(addGroup(groupName, groupDescription, emails))
      .then((status) => {
        props.setToastStatus(status);
        setDisabled(true);
        dispatch(getAllGroups()).catch((err) => console.log(err));
        if (status !== "error") {
          props.handleGroupModalClose();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisabled(false);
        props.setShowToast(true);
      });
  };

  const resetModalForm = () => {
    setGroupName("");
    setGroupDescription("<p><br></p>");
    setDisabled(true);
    setIsValid({});
    setError({});
    setSelectedOptions([selectedOptions[0]]);
    setToolbarHidden(true);
  };

  const renderToken = (option, props, index) => {
    const disableRemove = option.disableRemove;

    return (
      <div className="token" key={option.id}>
        <img src="/images/user_form.svg" className="img-fluid" alt="user" />
        <span className="token-label">{option.label}</span>
        {!disableRemove && (
          <button
            className="token-remove"
            onClick={() => handleRemoveOption(option)}
          >
            &times;
          </button>
        )}
      </div>
    );
  };

  const handleRemoveOption = (deleted) => {
    // Implement your logic to handle removing the option
    console.log("Removing option:", deleted);
    setSelectedOptions(selectedOptions.filter((option) => option !== deleted));
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
    if (name === "groupDescription" && value === "<p><br></p>") {
      value = "";
    }
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "Please fill out this field" }));
      return;
    }
    if (name === "groupMembers" && !/^[a-zA-Z0-9 .]+$/.test(value)) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(
        Object.assign(error, {
          [name]: "Accepts alphanumeric and period only.",
        })
      );
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
    resetModalForm();
  }, [props.showGroupModal]);

  useEffect(() => {
    if (
      groupName !== "" &&
      groupDescription !== "<p><br></p>" &&
      selectedOptions.length >= 1 &&
      Object.keys(error).length === 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [groupName, groupDescription, selectedOptions]);

  return (
    <>
      <Modal
        show={props.showGroupModal}
        onHide={props.handleGroupModalClose}
        dialogClassName="modal-60w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="bold">Create Group Profile</Modal.Title>
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
              <span className="note">Give a name to your group</span>
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
                className={`input-description form-control ${
                  isValid?.groupDescription
                    ? "is-valid"
                    : isValid.groupDescription !== undefined
                    ? "is-invalid"
                    : ""
                } ${
                  toolbarHidden
                    ? "ql-editor-170 toolbar-hidden"
                    : "ql-editor-100 toolbar-display"
                }`}
              />
              {getFormErrorMessage("groupDescription")}
              <span className="note">
                Let people know what your group is about.
              </span>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3">
            <Form.Label>Members</Form.Label>
            <Typeahead
              id="autocomplete-multiselect"
              labelKey="name"
              multiple
              options={options}
              placeholder="Choose options"
              selected={selectedOptions}
              onChange={handleSelect}
              onInputChange={onInputChangeGroupMembers}
              renderToken={renderToken}
              className={
                isValid?.groupMembers
                  ? "is-valid"
                  : isValid.groupMembers !== undefined
                  ? "is-invalid"
                  : ""
              }
            />
            {getFormErrorMessage("groupMembers")}
            <span className="note">Add members to your group</span>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleGroupModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary button"
            onClick={handleFormSubmit}
            disabled={disabled}
            className="submit-btn"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
