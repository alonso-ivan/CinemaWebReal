/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import './inicio.css';
import { useEffect } from "react";

            import { Footer } from "./Footer";

export function Lista({ currentUser, handleLogout }) {
    const posterUrl = 'https://image.tmdb.org/t/p/w500';
    const navigate = useNavigate();

    useEffect(() => {
        // Mostrar un alert si el usuario no está autenticado
        if (!currentUser) {
            alert("Necesitas iniciar sesión para acceder a tu lista.");
            navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        // Si el usuario no está autenticado, no mostrar el contenido del componente
        return null;
    }

    return (<>
    <body className="b_inicio">
        
        <div className="body-inicio">
            <div className="container-custom">
                <div className="nav-inicio">
                    {/* El menú Nav se muestra siempre */}
                    <Nav currentUser={currentUser} handleLogout={handleLogout} />

                    <h1 style={{ color: 'white' }}>Mi Lista </h1>

                    {/* Verificación para mostrar la lista o un mensaje si está vacía */}
                    {currentUser.list && currentUser.list.length > 0 ? (
                        <div className="movie-list-container">
                            {currentUser.list.map(item => {
                                const imgSrc = item.poster_path ? `${posterUrl}${item.poster_path}` : 'https://via.placeholder.com/500x750';
                                return (
                                    <Link className="link_caratula"
                                        to={item.title ? `/detalles_peliculas/${item.id}` : `/detalles/${item.id}`}
                                        key={item.id}
                                    >
                                        <div className="movie-item">
                                            <img src={imgSrc} alt={item.title || item.name} />
                                            <p className="p_titulo">{item.title ? item.title : item.name}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        // Este mensaje se mostrará si no hay elementos en la lista, con el color blanco
                        <p className="p_titu" style={{ color: 'white' }}>No hay series o películas añadidas.</p>
                    )}
                </div>
            </div>
            
          
        </div>
        
        
                    
        </body><Footer /> 
        </>
    );
}
