import { Modal, Button } from "react-bootstrap";

/**
 * A module for the ArchiveModal Component
 * @module components/models/ArchiveModal
 */

/**
 * Archive model version in the system
 * @method ArchiveModal
 *
 * @return {JSX.Element}
 *
 */
const ArchiveModal = (props) => {
  return (
    <>
      <Modal
        show={props?.showArchiveModal}
        onHide={props?.handleArchiveModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Archive this version?</p>
          <p>
            Downloading and modifying to this version can no longer be made.
            This version will now be view only.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props?.handleArchiveModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={props?.onClickArchive}
            className="submit-btn button"
          >
            Archive
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArchiveModal;
