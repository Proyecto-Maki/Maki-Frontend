import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar"; 
import "../styles/adoptions.css";

const Adoptions = () => {
    // Estado para almacenar los datos de las mascotas
    const [pets, setPets] = useState([]);

    // Simulación de datos obtenidos (puedes reemplazarlo por una llamada a una API)
    useEffect(() => {
        const fetchPets = async () => {
            const fakeData = [
                {
                    id: 1,
                    name: "Roberto",
                    type: "Perro",
                    gender: "Macho",
                    size: "Grande",
                    age: "2 años",
                    weight: "32kg",
                    personality: "Juguetón",
                    location: "Bogotá D.C",
                    details: "Localidad de Suba, parque el Virrey",
                    image: "../src/img/catPfp.jpeg",
                },
                {
                    id: 2,
                    name: "Sol",
                    type: "Gato",
                    gender: "Hembra",
                    size: "Mediano",
                    age: "5 meses",
                    weight: "3kg",
                    personality: "Dormilona",
                    location: "Bogotá D.C",
                    details: "Localidad de Suba, parque el Virrey",
                    image: "../src/img/catPfp.jpeg",
                },
                {
                    id: 3,
                    name: "Sol",
                    type: "Gato",
                    gender: "Hembra",
                    size: "Mediano",
                    age: "5 meses",
                    weight: "3kg",
                    personality: "Dormilona",
                    location: "Bogotá D.C",
                    details: "Localidad de Suba, parque el Virrey",
                    image: "../src/img/catPfp.jpeg",
                }
                ,
                {
                    id: 4,
                    name: "Sol",
                    type: "Gato",
                    gender: "Hembra",
                    size: "Mediano",
                    age: "5 meses",
                    weight: "3kg",
                    personality: "Dormilona",
                    location: "Bogotá D.C",
                    details: "Localidad de Suba, parque el Virrey",
                    image: "../src/img/catPfp.jpeg",
                }
            ];
            setPets(fakeData);
        };
        fetchPets();
    }, []);

    return (
        <>
            <Navbar />
            <div className="adoptions-container">
                {pets.map((pet) => (
                    <div className="pet-card" key={pet.id}>
                        <div className="pet-image">
                            <img src={pet.image} alt={pet.name} />
                        </div>
                        <div className="pet-details">
                            <h2>{pet.name}</h2>
                            <p><strong>Tipo:</strong> {pet.type}</p>
                            <p><strong>Género:</strong> {pet.gender}</p>
                            <p><strong>Tamaño:</strong> {pet.size}</p>
                            <p><strong>Edad:</strong> {pet.age}</p>
                            <p><strong>Peso:</strong> {pet.weight}</p>
                            <p><strong>Personalidad:</strong> {pet.personality}</p>
                            <p><strong>Ubicación:</strong> {pet.location}</p>
                            <p><strong>Detalle:</strong> {pet.details}</p>
                        </div>
                        <button className="adopt-button" title="Adoptar">
                            <i className="fas fa-paw"></i> Adoptar
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Adoptions;
