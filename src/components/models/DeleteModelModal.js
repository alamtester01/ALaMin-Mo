import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch } from "react-redux";
import { deleteModel } from "actions/model";
import { useNavigate } from "react-router-dom";

/**
 * A module for the DeleteModelModal Component
 * @module components/models/DeleteModelModal
 */

/**
 * Delete model in the system
 * @method DeleteModelModal
 *
 * @return {JSX.Element}
 *
 */
const DeleteModelModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    dispatch(deleteModel(props?.modelID))
      .then((status) => {
        props.setToastStatus(status);
        navigate("/models");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        props.setShowToast(true);
        props.handleDeleteModelModalClose();
      });
  };

  return (
    <>
      <Modal
        show={props.showDeleteModelModal}
        onHide={props.handleDeleteModelModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Delete this model?</p>
          <p>
            All of the content and files of this model profile will be deleted.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleDeleteModelModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleFormSubmit}
            className="submit-btn"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModelModal;
