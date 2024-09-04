/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register({ addUser, users }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!username) {
      errors.username = "El nombre de usuario es requerido.";
    } else if (username.length < 4) {
      errors.username = "El nombre de usuario debe tener al menos 4 caracteres.";
    } else if (users.some(user => user.username === username)) {
      errors.username = "El nombre de usuario ya está en uso.";
    }

    if (!email) {
      errors.email = "El correo electrónico es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo electrónico no es válido.";
    }

    if (!password) {
      errors.password = "La contraseña es requerida.";
    } else if (password.length < 4) {
      errors.password = "La contraseña debe tener al menos 4 caracteres.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    return errors;
  };

  const handleRegister = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Si no hay errores, añadir el nuevo usuario
    addUser({ username, email, password });
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <>
      <body className="body">
        <div className="img">
          <div className="row">
            <div className="col-12ru">
              <img src="src/assets/Designer.jpeg" alt="Designer" className="img-fluid img" />
            </div>
          </div>
        </div>

        <div className="formulario" style={{ height: '630px', marginTop: '480px' }}>
          <div className="row">
            <div className="col-12">
              <h1 className="h1">Registro</h1>
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
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
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
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <input
                type="password"
                name="confirm_password"
                className="input"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <button className="btn_sesion" onClick={handleRegister}>
                Crear Cuenta
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <Link to="/" className="a">Ya tengo una cuenta</Link>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
