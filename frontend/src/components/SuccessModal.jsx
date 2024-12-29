import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SuccessModal({ show, handleClose }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro Exitoso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¡Te has registrado exitosamente! Ahora puedes iniciar sesión.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Ir a Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;
