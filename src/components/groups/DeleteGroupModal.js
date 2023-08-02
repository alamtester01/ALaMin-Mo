import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch } from "react-redux";
import { deleteGroup } from "actions/group";
import { useNavigate } from "react-router-dom";

/**
 * A module for the DeleteGroupModal Component
 * @module components/groups/DeleteGroupModal
 */

/**
 * Delete group in the system
 * @method DeleteGroupModal
 *
 * @return {JSX.Element}
 *
 */
const DeleteGroupModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    dispatch(deleteGroup(props?.groupID))
      .then((status) => {
        props.setToastStatus(status);
        navigate("/groups");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        props.setShowToast(true);
        props.handleDeleteGroupModalClose();
      });
  };

  return (
    <>
      <Modal
        show={props.showDeleteGroupModal}
        onHide={props.handleDeleteGroupModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Delete this group?</p>
          <p>
            All of the content in this group will be deleted and members will be
            removed
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleDeleteGroupModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleFormSubmit}
            className="submit-btn"
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteGroupModal;
