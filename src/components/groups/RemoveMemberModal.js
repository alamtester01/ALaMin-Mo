import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeMember } from "actions/group";

/**
 * A module for the RemoveMemberModal Component
 * @module components/layout/RemoveMemberModal
 */

/**
 * Displaying menu in the left side of the system
 * @method RemoveMemberModal
 *
 * @return {JSX.Element}
 *
 */
const RemoveMemberModal = (props) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    dispatch(removeMember(props?.groupID, props?.memberEmail))
      .then((status) => {
        props.setToastStatus("error");
        props.setToastImage("/images/remove-member-success.svg");
        props.setRefreshCurrentGroupCount(props.refreshCurrentGroupCount + 1);
      })
      .catch((status) => {
        props.setToastStatus(status);
        props.setToastImage(null);
      })
      .finally(() => {
        props.setShowToast(true);
        props.handleRemoveMemberModalClose();
      });
  };

  return (
    <>
      <Modal
        show={props.showRemoveMemberModal}
        onHide={props.handleRemoveMemberModalClose}
        dialogClassName="modal-32w remove-modal"
        centered
      >
        <Modal.Body>
          <p className="bold">
            Remove "{props?.memberName}" from "{props?.groupName}"?
          </p>
          <p>
            The user will no longer have access to modify the models that are
            linked to the group.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-light"
            onClick={props.handleRemoveMemberModalClose}
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

export default RemoveMemberModal;
