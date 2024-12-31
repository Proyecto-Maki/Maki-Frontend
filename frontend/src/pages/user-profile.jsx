import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";  // Ensure react-icons is installed
import '../styles/user-profile.css';
import Navbar from '../components/navbar';  // Importar el Navbar

const UserProfile = () => {
  return (
    <div className="profile-container">
      {/* Coloca el Navbar al principio */}
      <Navbar />

      <Card className="profile-card">
        <Row>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Foto de perfil"
              className="profile-image"
            />
          </Col>
          <Col md={8} className="d-flex flex-column justify-content-center">
            <h2 className="profile-name">Sol canino</h2>
            <p>micorreo@correo</p>
            <p>+57 30012121212</p>
            <p>Colombia, Bogotá. cra 30 #1-1</p>
            <p>Fundación</p>
          </Col>
          <Col md={1} className="d-flex align-items-start justify-content-end">
            <Button variant="link" className="edit-button">
              <FaEdit />
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserProfile;
