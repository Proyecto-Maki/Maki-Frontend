import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ErrorModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error en el Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
