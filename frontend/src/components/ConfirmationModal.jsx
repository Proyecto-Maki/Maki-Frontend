import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/modal.css";

const ConfirmationModal = ({ show, handleYes, handleNo, action, response }) => {
  const isDeleteAction = action && action.includes("Eliminar");
  const isCancelAction = action && action.includes("Cancelar");
  
  return (
    <Modal show={show} onHide={handleNo}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{response}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="modal-confirm-button-secondary"
          onClick={handleNo}
        >
          No
        </Button>
        {isDeleteAction | isCancelAction ? (
          <Button
            variant="primary"
            className="modal-confirm-button-primary-delete"
            onClick={handleYes}
          >
            Sí, ¡{action}!
          </Button>
        ) : (
          <Button
            variant="primary"
            className="modal-confirm-button-primary"
            onClick={handleYes}
          >
            Sí, ¡{action}!
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
