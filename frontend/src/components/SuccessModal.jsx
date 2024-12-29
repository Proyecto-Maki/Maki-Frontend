import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/modal.css';

function SuccessModal({ show, handleClose }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-success-content">
      <Modal.Header closeButton className="modal-success-header">
        <Modal.Title>Registro Exitoso</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-success-body">
        ¡Te has registrado exitosamente! Ahora puedes iniciar sesión.
      </Modal.Body>
      <Modal.Footer className="modal-success-footer">
        <Button variant="secondary" onClick={handleClose} className="modal-success-button-secondary">
          Cerrar
        </Button>
        <Button variant="primary" onClick={() => navigate("/login")} className="modal-success-button-primary">
          Ir a Iniciar sesión
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;
