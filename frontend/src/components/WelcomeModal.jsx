import React from "react";
import { Modal, Button } from "react-bootstrap";

const WelcomeModal = ({ show, handleClose, response }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bienvenida</Modal.Title>
      </Modal.Header>
      <Modal.Body>{response}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomeModal;
