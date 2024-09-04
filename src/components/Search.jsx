/* eslint-disable react/react-in-jsx-scope */
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './search.css';
import { Nav } from "./Nav";

            import { Footer } from "./Footer";

export function Search({ currentUser, handleLogout}) {
    const navigate = useNavigate();
    const location = useLocation();

    const getQueryParam = (param) => {
        return new URLSearchParams(location.search).get(param);
    };

    const searchQuery = getQueryParam('query');

    // Api busqueda
    const [busqueda, setBusqueda] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
                }
            };

    
            fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=es-US&page=1`, options)
    
                .then(response => response.json())
                .then(data => setBusqueda(data.results)) // Guardamos los resultados en el estado
                .catch(err => console.error(err));
        }
    }, [searchQuery]); // Ahora depende de searchQuery

    const posterUrl = 'https://image.tmdb.org/t/p/w500';

    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        navigate(`/search?query=${search}`);
    };

    return (
        <html className="b_inicio">
            <div className="container-custom">
        <div className="nav_inicio">
        <Nav currentUser={currentUser} handleLogout={handleLogout}/>
        
            <div className="top_serie">
                <h1 className="titulo">Resultados encontrados</h1>
                <div className="movie-list-container">
                    {busqueda.map(busca => {
                        const imgSrc = busca.poster_path ? `${posterUrl}${busca.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                        return (


                            <Link className="link_caratula"
                                to={busca.title ? `/detalles_peliculas/${busca.id}` : `/detalles/${busca.id}`} 
                                key={busca.id}  // Asegúrate de colocar `key` aquí
                                >
                                    <div className="serie-item">
                                        <img src={imgSrc} width="200px" alt={busca.title || busca.name} />
                                        <p className="p_titulo">{busca.title ? busca.title : busca.name}</p>
                                    </div>
                                </Link>

                        );
                    })}
                </div>
            </div>
        </div>
        
            
        </div>
        <Footer />
            
        </html>
    );
}
