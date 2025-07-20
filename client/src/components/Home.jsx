import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import movieService from '../services/movieService';
import FeaturedMovie from './movies/FeaturedMovie';
import MovieRow from './movies/MovieRow';
import './Home.css';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="home-container">
      <header className={`home-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-left">
          <h1>VOD Platform</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="#" className="active">Inicio</a></li>
              <li><a href="#">Series</a></li>
              <li><a href="#">Películas</a></li>
              <li><a href="#">Novedades</a></li>
              <li><a href="#">Mi lista</a></li>
            </ul>
          </nav>
        </div>
        <div className="user-info">
          <span>Bienvenido, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Película destacada (Hero) */}
        <FeaturedMovie />
        
        <div className="rows-container">
          {/* Fila de películas populares */}
          <MovieRow 
            title="Populares ahora" 
            fetchMovies={movieService.getPopularMovies} 
          />
          
          {/* Fila de películas mejor valoradas */}
          <MovieRow 
            title="Mejor valoradas" 
            fetchMovies={movieService.getTopRatedMovies} 
          />
          
          {/* Fila de películas que se están proyectando */}
          <MovieRow 
            title="Recién estrenadas" 
            fetchMovies={movieService.getNowPlayingMovies} 
          />
          
          {/* Fila de próximos estrenos */}
          <MovieRow 
            title="Próximamente" 
            fetchMovies={movieService.getUpcomingMovies} 
          />
          
          {/* Fila de series populares */}
          <MovieRow 
            title="Series populares" 
            fetchMovies={movieService.getPopularTVShows} 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
