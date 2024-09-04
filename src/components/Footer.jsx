/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import './inicio.css';  // Asumiendo que crearás un archivo CSS separado para los estilos del pie de página

export function Footer() {
    return (
        <footer className="footer">
        <div className="footer-content container-custom">
            <div className="footer-section about">
                <h2 className="footer-title">Sobre Nosotros</h2>
                <p className="footer-text">
                    Somos una plataforma dedicada a ofrecer la mejor experiencia de visualización de series y películas.
                </p>
            </div>
            <div className="footer-section links">
                <h2 className="footer-title">Enlaces Útiles</h2>
                <ul className="footer-links">
                    <li><Link to="/" className="footer-link">Inicio</Link></li>
                    <li><Link to="/series" className="footer-link">Series</Link></li>
                    <li><Link to="/peliculas" className="footer-link">Películas</Link></li>
                    <li><Link to="/lista" className="footer-link">Mi Lista</Link></li>
                </ul>
            </div>
            <div className="footer-section contact">
                <h2 className="footer-title">Contacto</h2>
                <p className="footer-text">Email: soporte@cinema.com</p>
                <p className="footer-text">Teléfono: +123 456 789</p>
            </div>
        </div>
        <div className="footer-bottom">
            &copy; 2024 Cinema. Todos los derechos reservados.
        </div>
    </footer>
    );
}
