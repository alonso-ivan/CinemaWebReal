/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import './inicio.css';
import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

 
export function Inicio({currentUser, handleLogout} ) {

    const navigate = useNavigate();

    //Api películas populares
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
            }
        };

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
        .then(response => response.json())
            .then(data => setPeliculas(data.results)) // Guardamos los resultados en el estado
            .catch(err => console.error(err));
    }, []);


    // Api series populares
    const [series, setSeries]= useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
            }
        };

        fetch('https://api.themoviedb.org/3/trending/tv/week?language=en-US', options)
        .then(response => response.json())
            .then(data => setSeries(data.results)) // Guardamos los resultados en el estado
            .catch(err => console.error(err));
    }, []);


   




    // Base URL para los posters de TMDb
    const posterUrl = 'https://image.tmdb.org/t/p/w500';

    return (<>
     <body className="b_inicio">
        <div className="container-custom">
       
        <div className="nav_inicio">
            <Nav currentUser={currentUser} handleLogout={handleLogout}/>

            <div className="hero-section">
                    <img className="background-image" src="https://image.tmdb.org/t/p/original/wiE9doxiLwq3WCGamDIOb2PqBqc.jpg" alt="Imagen de fondo" />
                    <button
        className="btn_inicio btn-detalle"
        onClick={() => navigate('/detalles/60574')} // Navegación sin recarga
      >
        Ver ahora
      </button>
            </div>


                    <div className="top_series">
                        <h1 className="titulo">Películas Populares</h1>
                        <div className="series-container">
                            {peliculas.map(pelicula => {
                                const imgSrc = pelicula.poster_path ? `${posterUrl}${pelicula.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                                return (
                                    <Link className="link_caratula"
                                    to={pelicula.title ? `/detalles_peliculas/${pelicula.id}` : `/detalles/${pelicula.id}`} 
                                    key={pelicula.id}  // Asegúrate de colocar `key` aquí
                                    >
                                    <div className="serie-item" key={pelicula.id}>
                                        <img src={imgSrc} width="200px" alt={pelicula.name} />
                                        <p className="p_titulo">{pelicula.title}</p>
                                    </div>   </Link>
                                );
                            })}
                        </div>
                    </div>
            
            
                    <div className="top_series">
                        <h1 className="titulo">Series Populares</h1>
                        <div className="series-container">
                        {series.map(serie => {
                                const imgSrc = serie.poster_path ? `${posterUrl}${serie.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                                return (
                                    <Link className="link_caratula"
                                    to={serie.title ? `/detalles_peliculas/${serie.id}` : `/detalles/${serie.id}`} 
                                    key={serie.id}  // Asegúrate de colocar `key` aquí
                                    >
                                    <div className="serie-item" key={serie.id}>
                                        <img src={imgSrc} width="200px" alt={serie.name} />
                                        <p className="p_titulo">{serie.name}</p>
                                    </div> 
                                    </Link> 
                                

                                );
                            })}
                        </div>
                    </div>
            
            
            
            </div>
            
            </div>
            </body> 
            <Footer />
            </>
    );
}
