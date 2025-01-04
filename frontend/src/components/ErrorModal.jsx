import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/modal.css";

function ErrorModal({ show, handleClose, error }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-error-content"
    >
      <Modal.Header closeButton className="modal-error-header">
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-error-body">
        {error}
        {/* Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo. */}
      </Modal.Body>
      <Modal.Footer className="modal-error-footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="modal-error-button-secondary"
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
