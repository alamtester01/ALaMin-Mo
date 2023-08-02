import { Modal, Button } from "react-bootstrap";

/**
 * A module for the DiscardModal Component
 * @module components/models/DiscardModal
 */

/**
 * Discard model in the system
 * @method DiscardModal
 *
 * @return {JSX.Element}
 *
 */
const DiscardModal = (props) => {
  return (
    <>
      <Modal
        show={props?.showDiscardModal}
        onHide={props?.handleDiscardModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Discard version?</p>
          <p>Any of the inputs made will not be saved.</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props?.handleDiscardModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => props?.onClickDiscard(true)}
            className="submit-btn button"
          >
            Discard
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DiscardModal;
