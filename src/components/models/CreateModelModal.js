import { Modal, Button, Form, OverlayTrigger } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "actions/group";
import ReactQuill from "react-quill";
import { modules, formats } from "common/constants";
import { addModel, getAllModels } from "actions/model";

/**
 * A module for the CreateModelModal Component
 * @module components/layout/CreateModelModal
 */

/**
 * Displaying menu in the left side of the system
 * @method CreateModelModal
 *
 * @return {JSX.Element}
 *
 */
const CreateModelModal = (props) => {
  //   import("../../styles/CreateGroupModal.css");

  const location = useLocation();
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [modelName, setModelName] = useState("");
  const [modelTask, setModelTask] = useState("");
  const [modelDescription, setModelDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [modelGroup, setModelGroup] = useState([]);

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});
  const [toolbarHidden, setToolbarHidden] = useState(true);
  const [isToolbarClicked, setIsToolbarClicked] = useState(false);

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getAllGroups()).catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const groupsList = Object.values(groups)
      .filter((item) => item.group_owner === user.email)
      .map((item) => {
        return {
          id: item.id,
          name: item.group_name,
          label: item.group_name,
        };
      });
    setOptions(groupsList);
  }, [groups]);
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

  const onChangeModelName = (e) => {
    const value = e.target.value;
    setModelName(value);
    validate("modelName", value);
  };

  const onChangeModelTask = (e) => {
    const value = e.target.value;
    setModelTask(value);
    validate("modelTask", value);
  };

  const onChangeModelDescription = (e) => {
    setModelDescription(e);
    validate("modelDescription", e);
  };

  const onInputChangeModelGroup = (e) => {
    validate("modelGroup", e);
  };

  const handleFormSubmit = (e) => {
    // console.log(selectedOptions)
    // const emails = selectedOptions.map((option) => {
    //   const result = Object.values(groups).filter(
    //     (user) => user.email === option.email
    //   );
    //   return result[0].email;
    // });
    dispatch(
      addModel(
        modelName,
        modelTask,
        modelDescription,
        selectedOptions.length === 0 ? null : selectedOptions[0].id
      )
    )
      .then((status) => {
        props.setToastStatus(status);
        setDisabled(true);
        dispatch(getAllModels()).catch((err) => console.log(err));
        if (status !== "error") {
          props.handleModelModalClose();
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
    setModelName("");
    setModelTask("");
    setModelDescription("<p><br></p>");
    setDisabled(true);
    setIsValid({});
    setError({});
    setSelectedOptions([]);
    setToolbarHidden(true);
  };

  useEffect(() => {
    resetModalForm();
  }, [props.showModelModal]);

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
    if (name === "modelDescription" && value === "<p><br></p>") {
      value = "";
    }
    if (!value && name !== "modelGroup") {
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
      modelName !== "" &&
      modelTask !== "" &&
      modelDescription !== "<p><br></p>" &&
      Object.keys(error).length === 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [modelName, modelTask, modelDescription, selectedOptions]);

  return (
    <>
      <Modal
        show={props.showModelModal}
        onHide={props.handleModelModalClose}
        dialogClassName="modal-60w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="bold">Create Model Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Name</Form.Label>
              <Form.Control
                type="text"
                value={modelName}
                onChange={onChangeModelName}
                className={`form-control ${
                  isValid?.modelName
                    ? "is-valid"
                    : isValid.modelName !== undefined
                    ? "is-invalid"
                    : ""
                }`}
              />
              {getFormErrorMessage("modelName")}
              <span className="note">Give a name to your model profile.</span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="required-field">Task</Form.Label>
              <Form.Control
                type="text"
                value={modelTask}
                onChange={onChangeModelTask}
                className={`form-control ${
                  isValid?.modelTask
                    ? "is-valid"
                    : isValid.modelTask !== undefined
                    ? "is-invalid"
                    : ""
                }`}
              />
              {getFormErrorMessage("modelTask")}
              <span className="note">
                Provide a machine learning task that your model tackles.
              </span>
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
                value={modelDescription}
                onChange={onChangeModelDescription}
                className={`input-description form-control ${
                  isValid?.modelDescription
                    ? "is-valid"
                    : isValid.modelDescription !== undefined
                    ? "is-invalid"
                    : ""
                } ${
                  toolbarHidden
                    ? "ql-editor-170 toolbar-hidden"
                    : "ql-editor-100 toolbar-display"
                }`}
              />
              {getFormErrorMessage("modelDescription")}
              <span className="note">
                Discuss clearly the idea of your model.
              </span>
            </Form.Group>
          </Form>
          <Form.Group className="mb-3">
            <Form.Label>Group</Form.Label>
            <Typeahead
              clearButton
              id="autocomplete-multiselect"
              labelKey="name"
              multiple={false}
              options={options}
              placeholder="Choose options"
              selected={selectedOptions}
              onChange={handleSelect}
              onInputChange={onInputChangeModelGroup}
              className={
                isValid?.modelGroup
                  ? "is-valid"
                  : isValid.modelGroup !== undefined
                  ? "is-invalid"
                  : ""
              }
            />
            {getFormErrorMessage("modelGroup")}
            <span className="note">
              Assign a group that will work on this model.
            </span>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleModelModalClose}
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

export default CreateModelModal;
