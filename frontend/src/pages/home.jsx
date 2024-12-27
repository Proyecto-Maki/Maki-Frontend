import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import '../styles/home.css';
import logo from '../img/Logotipo Maki.png'; // Ruta al logo

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <>
            {/* Navbar */}
            <Navbar />
        </>
    );
};

export default Home;