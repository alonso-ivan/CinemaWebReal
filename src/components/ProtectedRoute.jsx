// ProtectedRoute.jsx
import { Link } from "react-router-dom";

function ProtectedRoute({ children, currentUser }) {
  // Si el usuario no está autenticado, muestra un mensaje
  if (!currentUser) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Necesitas iniciar sesión para acceder a esta sección</h2>
        <p>
          Por favor, <Link to="/">inicia sesión</Link> para ver tu lista y añadir tus series y películas favoritas.
        </p>
      </div>
    );
  }

  // Si el usuario está autenticado, muestra el componente hijo
  return children;
}

export default ProtectedRoute;
