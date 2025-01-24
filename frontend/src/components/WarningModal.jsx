import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

function WarningModal({ show, handleClose, warning, dirNavigate }) {
  const navigate = useNavigate();
  console.log(dirNavigate);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-warning-content"
    >
      <Modal.Header closeButton className="modal-warning-header">
        <Modal.Title>Advertencia</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-warning-body">{warning}</Modal.Body>
      <Modal.Footer className="modal-warning-footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="modal-warning-button-secondary"
        >
          Cerrar
        </Button>
        <Button
          variant="warning"
          onClick={() => navigate(dirNavigate)}
          className="modal-warning-button-primary"
        >
          Ir a {dirNavigate}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WarningModal;
