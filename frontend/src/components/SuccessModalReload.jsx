import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

function SuccessModalReload({ show, handleClose, response }) {
  const navigate = useNavigate();
  
  const handleNav = () => {
    window.location.reload();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-success-content"
    >
      <Modal.Header closeButton className="modal-success-header">
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-success-body">{response}</Modal.Body>
      <Modal.Footer className="modal-success-footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="modal-success-button-secondary"
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={handleNav}
          className="modal-success-button-primary"
        >
          Recargar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModalReload;