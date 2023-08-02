import { Modal, Button } from "react-bootstrap";

/**
 * A module for the SaveAndPublishModal Component
 * @module components/models/SaveAndPublishModal
 */

/**
 * Save and publish model version in the system
 * @method SaveAndPublishModal
 *
 * @return {JSX.Element}
 *
 */
const SaveAndPublishModal = (props) => {
  return (
    <>
      <Modal
        show={props?.showSaveAndPublishModal}
        onHide={props?.handleSaveAndPublishModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">Publish this version?</p>
          <p>
            Further modifications to this version can no longer be made and
            other users will have access to it.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props?.handleSaveAndPublishModalClose}
            className="cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => props?.onClickSave(true)}
            className="submit-btn button"
          >
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveAndPublishModal;
