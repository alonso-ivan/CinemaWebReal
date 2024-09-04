import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './login.css';

export function RecuperarPassword({ users }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRecover = () => {
    const user = users.find(user => user.username === username && user.email === email);
    if (user) {
      // Aquí podrías agregar lógica para enviar un correo electrónico de recuperación.
      alert("Se ha enviado un enlace para recuperar la contraseña a tu correo electrónico.");
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } else {
      setError("Nombre de usuario o correo electrónico incorrectos.");
    }
  };

  return (
    <div className="body">
      <div className="img">
        <div className="row">
          <div className="col-12ru">
            <img src="src/assets/Designer.jpeg" alt="Designer" className="img-fluid img"/>
          </div>
        </div>
      </div>

      <div className="formulario">
        <div className="row">
          <div className="col-12">
            <h1 className="h1">Recuperar Contraseña</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <input
              type="text"
              name="username"
              className="input"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="row">
            <div className="col-12">
              <p className="error">{error}</p>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <button className="btn_sesion" onClick={handleRecover}>
              Recuperar Contraseña
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Link to="/login" className="a">Volver a Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
