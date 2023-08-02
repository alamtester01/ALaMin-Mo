import { Modal, Button } from "react-bootstrap";

/**
 * A module for the ArchiveModal Component
 * @module components/models/DeleteModelVersionModal
 */

/**
 * Delete model version in the system
 * @method DeleteModelVersionModal
 *
 * @return {JSX.Element}
 *
 */
const DeleteModelVersionModal = (props) => {
  return (
    <>
      <Modal
        show={props?.showDeleteModelVersionModal}
        onHide={props?.handleDeleteModelVersionModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Delete this version?</p>
          <p>All of the content and files of this version will be deleted.</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props?.handleDeleteModelVersionModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={props?.onClickDeleteModelVersion}
            className="submit-btn"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModelVersionModal;
