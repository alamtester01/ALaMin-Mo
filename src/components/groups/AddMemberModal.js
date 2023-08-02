import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, addMembers } from "actions/group";

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
const AddMemberModal = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { users, currentGroup } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);

  const [options, setOptions] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  const [isValid, setIsValid] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getAllUsers()).catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (props?.groupMembers) {
      const filteredUsers = Object.values(users).filter(
        (user) =>
          !props?.groupMembers.some((member) => user.email === member.email)
      );
      const usersList = Object.values(filteredUsers).map((item) => {
        return {
          id: item.id,
          name: item.first_name + " " + item.last_name,
          label: item.first_name + " " + item.last_name,
          email: item.email,
        };
      });
      setOptions(usersList);
    }
  }, [users, props?.groupMembers]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelect = (selected) => {
    setSelectedOptions(selected);
  };

  const onInputChangeGroupMembers = (e) => {
    validate("groupMembers", e);
  };

  const handleFormSubmit = (e) => {
    if (selectedOptions.length) {
      const emails = selectedOptions.map((option) => {
        const result = Object.values(users).filter(
          (user) => user.email === option.email
        );
        return result[0].email;
      });
      dispatch(addMembers(props?.groupID, emails))
        .then((status) => {
          props.setToastStatus(status);
          props.setRefreshCurrentGroupCount(props.refreshCurrentGroupCount + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          props.setShowToast(true);
          props.handleAddMemberModalClose();
          resetModalForm();
        });
    } else {
      props.handleAddMemberModalClose();
      resetModalForm();
    }
  };

  const resetModalForm = () => {
    setIsValid({});
    setError({});
    setSelectedOptions([]);
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
    if (!value) {
      setIsValid(Object.assign(isValid, { [name]: false }));
      setError(Object.assign(error, { [name]: "Please fill out this field" }));
      return;
    }
    if (name === "groupMembers" && !/^[a-zA-Z0-9.]+$/.test(value)) {
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

  useEffect(() => {
    if (selectedOptions.length >= 1 && Object.keys(error).length === 0) {
    }
  }, [selectedOptions]);

  return (
    <>
      <Modal
        show={props.showAddMemberModal}
        onHide={props.handleAddMemberModalClose}
        dialogClassName="modal-35w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="bold">
            Add new member to "{props?.groupName}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Typeahead
              id="autocomplete-multiselect"
              labelKey="name"
              multiple
              options={options}
              placeholder="Add people"
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
          </Form.Group>
          <p className="semi-bold">Members in your group</p>
          <ListGroup key="listgroup">
            {props?.groupMembers &&
              Object.values(props?.groupMembers).map((member) => {
                const item = Object.values(users).filter(
                  (user) => user.email === member.email
                );
                return (
                  <div key={`memberListKey${item[0]?.id}`}>
                    <ListGroup.Item className="d-flex justify-content-between add-member-list">
                      <div>
                        <img
                          src="/images/user_list.svg"
                          className="img-fluid icon-list"
                          alt="user"
                        />
                        {item[0]?.first_name + " " + item[0]?.last_name}
                        {props?.groupOwner === item[0]?.email && "(me)"}
                      </div>
                      <div>
                        {props?.groupOwner === item[0]?.email
                          ? "Owner"
                          : "Member"}
                      </div>
                    </ListGroup.Item>
                  </div>
                );
              })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleAddMemberModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary button"
            onClick={handleFormSubmit}
            className="submit-btn"
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMemberModal;
