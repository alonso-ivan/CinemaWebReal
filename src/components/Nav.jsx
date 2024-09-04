/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Nav({ currentUser, handleLogout }) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${search}`);
    };

    return (
        <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
            <img src="../src/assets/CINEMA.png" alt="Cinema" className="d-inline-block align-text-top" style={{ width: '100px' }} />
        </Link>

        {/* Toggler button for smaller screens */}
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left side: Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/" className="link_inicio" style={{ fontSize: '16px' }}>Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link to="/series" className="link_inicio" style={{ fontSize: '16px' }}>Series</Link>
                </li>
                <li className="nav-item">
                    <Link to="/peliculas" className="link_inicio" style={{ fontSize: '16px' }}>Películas</Link>
                </li>
                {currentUser && (
                    <li className="nav-item">
                        <Link to="/lista" className="link_inicio" style={{ fontSize: '16px' }}>Mi lista</Link>
                    </li>
                )}
            </ul>

            {/* Center: Search bar */}
            <form className="d-flex me-3" onSubmit={handleSubmit}>
                <input className="form-control " value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Buscar..." aria-label="Buscar" />
            </form>

            {/* Right side: User info */}
            <ul className="navbar-nav">
                {currentUser ? (
                    <>
                        <li className="nav-item nav-link blanco">Bienvenido, {currentUser.username}</li>
                        <li className="nav-item">
                            <button onClick={handleLogout} className="btn btn-link nav-link">Cerrar Sesión</button>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <Link className="btn btn-link" to="/login">Iniciar Sesión</Link>
                    </li>
                )}
            </ul>
        </div>
    </div>
</nav>

        
        
    );
}
