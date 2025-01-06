import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, handleYes, handleNo, response }) => {
  return (
    <Modal show={show} onHide={handleNo}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmación</Modal.Title>
      </Modal.Header>
      <Modal.Body>{response}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleYes}>
          Yes
        </Button>
        <Button variant="secondary" onClick={handleNo}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;