/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import './inicio.css';
import { useState, useEffect } from "react";
import { Nav } from "./Nav";

            import { Footer } from "./Footer";

export function Peliculas({currentUser, handleLogout}) {

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


    // Api películas recomendadas
    const [recomendadas, setRecomendadas]= useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
            }
        };

        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
            .then(data => setRecomendadas(data.results)) // Guardamos los resultados en el estado
            .catch(err => console.error(err));
    }, []);


    const [search, setSearch] = useState('');

    const handleSubmit= (e) =>{
        e.preventDefault();
        navigate(`/search?query=${search}`)
    }




    // Base URL para los posters de TMDb
    const posterUrl = 'https://image.tmdb.org/t/p/w500';

    return (<>
     <body className="b_inicio">
        
       <div className="container-custom">
        <div className="nav_inicio">
        <Nav currentUser={currentUser} handleLogout={handleLogout}/>
                


                    <div className="top_series">
                        <h1 className="titulo">Películas en tendencia</h1>
                        <div className="series-container">
                            {peliculas.map(pelicula => {
                                const imgSrc = pelicula.poster_path ? `${posterUrl}${pelicula.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                                return (
                                    <Link className="link_caratula"
                                    to={pelicula.title ? `/detalles_peliculas/${pelicula.id}` : `/detalles/${pelicula.id}`} 
                                    key={pelicula.id}  // Asegúrate de colocar `key` aquí
                                    >
                                        <div className="serie-item">
                                            <img src={imgSrc} width="200px" alt={pelicula.title || pelicula.name} />
                                            <p className="p_titulo">{pelicula.title ? pelicula.title : pelicula.name}</p>
                                        </div>
                                    </Link>  
                                );
                            })}
                        </div>
                    </div>
            
            
                    <div className="top_series">
                        <h1 className="titulo">Películas recomendadas</h1>
                        <div className="series-container">
                        {recomendadas.map(recomendada => {
                                const imgSrc = recomendada.poster_path ? `${posterUrl}${recomendada.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                                return (<Link className="link_caratula"
                                    to={recomendada.title ? `/detalles_peliculas/${recomendada.id}` : `/detalles/${recomendada.id}`} 
                                    key={recomendada.id}  // Asegúrate de colocar `key` aquí
                                    >
                                        <div className="serie-item">
                                            <img src={imgSrc} width="200px" alt={recomendada.title || recomendada.name} />
                                            <p className="p_titulo">{recomendada.title ? recomendada.title : recomendada.name}</p>
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
