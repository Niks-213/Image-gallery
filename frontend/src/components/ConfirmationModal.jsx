import React from 'react';
import { Modal, Button } from 'reactstrap';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => (
  <Modal isOpen={isOpen} toggle={onCancel}>
    <div className="modal-header">
      <h5 className="modal-title">Confirm Deletion</h5>
      <button type="button" className="close" onClick={onCancel}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      Are you sure you want to delete?
    </div>
    <div className="modal-footer">
      <Button color="danger" onClick={onConfirm}>Yes</Button>
      <Button color="secondary" onClick={onCancel}>Cancel</Button>
    </div>
  </Modal>
);

export default ConfirmationModal;
