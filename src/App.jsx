/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/login.jsx";
import { Inicio } from "./components/inicio.jsx";
import { Register } from "./components/Register.jsx";
import { Search } from "./components/search.jsx";
import { Series } from "./components/Series.jsx";
import { Peliculas } from "./components/Peliculas.jsx";
import { Detalles } from "./components/Detalles.jsx";
import { Detalles_Peliculas } from "./components/Detalles_Peliculas.jsx";
import { Nav } from "./components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import { Lista } from "./components/Lista.jsx";
import { RecuperarPassword } from "./components/RecuperarPassword.jsx";


function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Estado para el usuario actual
  const navigate = useNavigate();

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const authenticateUser = (username, password) => {
    const user = users.find((user) => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user); // Asegúrate de que esto se llame correctamente
    }
    return user;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/"); // Redirigir a la página de inicio de sesión
  };

  const addToList = (item) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        list: [...(currentUser.list || []), item]
      };
      setCurrentUser(updatedUser);
      const updatedUsers = users.map(user => user.username === currentUser.username ? updatedUser : user);
      setUsers(updatedUsers);
    }
  };

  const removeFromList = (id) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        list: (currentUser.list || []).filter(item => item.id !== id)
      };
      setCurrentUser(updatedUser);
      setUsers(users.map(user => user.username === currentUser.username ? updatedUser : user));
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login authenticateUser={authenticateUser} />} />
      <Route path="/" element={<Inicio currentUser={currentUser} handleLogout={handleLogout} />} />
      <Route path="/register" element={<Register addUser={addUser} users={users} />} />
      <Route path="/search" element={<Search currentUser={currentUser} handleLogout={handleLogout} />} />
      <Route path="/series" element={<Series currentUser={currentUser} handleLogout={handleLogout} />} />
      <Route path="/peliculas" element={<Peliculas currentUser={currentUser} handleLogout={handleLogout} />} />
      <Route path="/detalles/:id" element={<Detalles addToList={addToList} currentUser={currentUser} handleLogout={handleLogout} removeFromList={removeFromList} />} />
      <Route path="/detalles_peliculas/:id" element={<Detalles_Peliculas addToList={addToList} currentUser={currentUser} handleLogout={handleLogout} removeFromList={removeFromList} />} />
      <Route path="/lista" element={<Lista currentUser={currentUser} handleLogout={handleLogout} />} />
      <Route path="/forgot-password" element={<RecuperarPassword users={users} />} />

    </Routes>
  );
}

export default App;
