import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/modal.css";

const ConfirmationModal = ({ show, handleYes, handleNo, action, response }) => {
  return (
    <Modal show={show} onHide={handleNo}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{response}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="modal-confirm-button-secondary" onClick={handleNo}>
          No
        </Button>
        <Button variant="primary" className="modal-confirm-button-primary"  onClick={handleYes}>
          Sí, ¡{action}!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;