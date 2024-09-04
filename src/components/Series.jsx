/* eslint-disable react/react-in-jsx-scope */
import { Link, useNavigate } from "react-router-dom";
import './inicio.css';
import { useState, useEffect } from "react";
import { Nav } from "./Nav";

            import { Footer } from "./Footer";

export function Series({ currentUser, handleLogout}) {

    const navigate = useNavigate();

    //Api series mejor valoradas
    const [valoradas, setValoradas] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
            }
        };

        fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
            .then(data => setValoradas(data.results)) // Guardamos los resultados en el estado
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
                        <h1 className="titulo">Series mejor valoradas</h1>
                        <div className="series-container">
                            {valoradas.map(valorada => {
                                const imgSrc = valorada.poster_path ? `${posterUrl}${valorada.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                                return (<Link className="link_caratula"
                                    to={valorada.title ? `/detalles_peliculas/${valorada.id}` : `/detalles/${valorada.id}`} 
                                    key={valorada.id}  // Asegúrate de colocar `key` aquí
                                    >
                                        <div className="serie-item">
                                            <img src={imgSrc} width="200px" alt={valorada.title || valorada.name} />
                                            <p className="p_titulo">{valorada.title ? valorada.title : valorada.name}</p>
                                        </div>
                                    </Link>   
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
                                        <div className="serie-item">
                                            <img src={imgSrc} width="200px" alt={serie.title || serie.name} />
                                            <p className="p_titulo">{serie.title ? serie.title : serie.name}</p>
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
