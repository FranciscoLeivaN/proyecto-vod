import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import './MovieRow.css';
// Importamos los estilos CSS de Slick
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const MovieRow = ({ title, fetchMovies }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error(`Error loading movies for row "${title}":`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [fetchMovies, title]);

  const sliderSettings = {
    dots: false,
    infinite: movies.length > 6,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      
      {loading ? (
        <div className="row-loading">
          <div className="row-spinner"></div>
        </div>
      ) : movies && movies.length > 0 ? (
        <div className="row-slider">
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <div key={movie.id} className="slider-item">
                <MovieCard movie={movie} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="row-placeholder">
          <div className="row-placeholder-cards">
            {[1,2,3,4,5,6].map((n) => (
              <div key={n} className="placeholder-card"></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRow;
