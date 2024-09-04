/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './inicio.css'; // Asegúrate de que este archivo tenga los estilos correctos
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { CgArrowRightO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";


export function Detalles_Peliculas({addToList, currentUser, handleLogout, removeFromList}) {
    const { id } = useParams(); // Obtenemos el id de la URL
    const [detalles, setDetalles] = useState(null); // Estado para almacenar los detalles de la película
    const [trailer, setTrailer] = useState(null); // Estado para almacenar el tráiler de la película
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
    const [similar, setSimilar] = useState([]); // Estado para almacenar las recomendaciones de películas
    const [actores, setActores] = useState([]); // Estado para almacenar los actores

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzgyNmY2NjZlZTRiMWY3YTM5Yjk0NzIwZTYwZDAwNSIsIm5iZiI6MTcyNDMxODYyOS43MzQ2NzEsInN1YiI6IjY2YzcwMjkxODI1ZTRlM2U2YmVhYjZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ttxl833lRVdwymdgDKXV9pZVjvVR8udTM8N3INmwh78'
            }
        };

        // Fetch para obtener detalles de la película
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-US`, options)
            .then(response => response.json())
            .then(data => setDetalles(data))
            .catch(err => console.error(err));

        // Fetch para obtener los videos de la película
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=es-US`, options)
            .then(response => response.json())
            .then(data => {
                // Filtramos para obtener solo el tráiler de YouTube
                const trailerVideo = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                if (trailerVideo) {
                    setTrailer(trailerVideo.key); // Guardamos la clave del tráiler en el estado
                }
            })
            .catch(err => console.error(err));

        // Películas similares
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(data => setSimilar(data.results))
            .catch(err => console.error(err));

        // Actores
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(data => setActores(data.cast))
            .catch(err => console.error(err));
    }, [id]);

    if (!detalles) return <p>Cargando...</p>; // Mostramos un mensaje mientras se cargan los detalles

    const posterUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL para las imágenes

    const isInList = currentUser?.list?.some(item => item.id === detalles.id);

    const handleListClick = () => {
        if (!currentUser) {
          alert("Necesitas iniciar sesión para añadir series o películas a tu lista.");
          return;
        }
    
        if (isInList) {
          removeFromList(detalles.id);
        } else {
          addToList(detalles);
        }
      };

    return (
        <>
        <div className="detalles container-custom">
            <Nav currentUser={currentUser} handleLogout={handleLogout} />

           

<div className="detalles-clic">

              <div className="imagen-detalle">
              <img className="img-fluid" src={`${posterUrl}${detalles.poster_path}`} alt={detalles.title} width={'400px'}/>
              </div>

              <div className="descripción-detalle">
              <h1>{detalles.title}</h1>
        <h6 className="h6_detalles">Género: {detalles.genres.map((genre) => genre.name).join(', ')}</h6>
        <h6 className="h6_detalles">Valoración: {detalles.vote_average.toFixed(1)}</h6>    

        <ul className="añadir_ver">
            <li className="ul_añadir">
                <button className="btn_li" onClick={handleListClick}>
                    {isInList ? <IoMdRemove /> : <IoMdAdd />}
                </button>
            </li>

            <li className="ul_añadir">
                {trailer && (
                    <div>
                        <button className="btn-open-modal btn_li" onClick={() => setIsModalOpen(true)}>
                            <BiSolidMoviePlay />
                        </button>
                    </div>
                )}
            </li>

            <li className="ul_añadir">
                {detalles.homepage && (
                    <a className="a_peli" href={detalles.homepage} target="_blank" rel="noopener noreferrer">
                        <CgArrowRightO /> Visitar página oficial
                    </a>
                )}
            </li>
        </ul>

        <h3 className="h3">Sinopsis</h3>
        <p className="descripción">{detalles.overview}</p>
              </div>





          </div>



            <div>
                {/* Modal para el tráiler */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailer}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <div className="top_series">
                    <h1 className="titulo">Actores</h1>
                    <div className="series-container">
                        {actores.slice(0, 20).map(actor => {
                            const imgSrc = actor.profile_path ? `${posterUrl}${actor.profile_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                            return (
                                <div className="pelicula-item" key={actor.id}>
                                    <img src={imgSrc} width="200px" alt={actor.name} />
                                    <p>{actor.name}</p>
                                    <p>({actor.character})</p>
                                    
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div>
                <div className="top_series">
                    <h1 className="titulo">Recomendaciones</h1>
                    <div className="series-container">
                        {similar.map(movie => {
                            const imgSrc = movie.poster_path ? `${posterUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750'; // Imagen de reemplazo si no hay poster
                            return (
                                <Link className="link_caratula"
                                    to={`/detalles_peliculas/${movie.id}`} 
                                    key={movie.id}
                                >
                                    <div className="serie-item">
                                        <img src={imgSrc} width="200px" alt={movie.title || movie.name} />
                                        <p className="p_titulo">{movie.title || movie.name}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            
        </div>
        <Footer />
        </>
    );
}
