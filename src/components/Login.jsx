/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import './login.css'

export function Login({ authenticateUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (authenticateUser(username, password)) {
        navigate("/"); // Redirige al usuario a la página de inicio
      } else {
        alert("Nombre de usuario o contraseña incorrectos");
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
              <h1 className="h1">Iniciar Sesión</h1>
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
                type="password"
                name="password"
                className="input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
  
          <div className="row">
            <div className="col-12">
              <button className="btn_sesion" onClick={handleLogin}>
                Iniciar Sesión
              </button>
            </div>
          </div>
  
          <div className="row">
            <div className="col-12">
              <Link to="/forgot-password" className="a">He olvidado mi contraseña</Link>
            </div>
          </div>
  
          <div className="row">
            <div className="col-12">
              <Link to="/register" className="a">¿Aún no tienes cuenta?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
