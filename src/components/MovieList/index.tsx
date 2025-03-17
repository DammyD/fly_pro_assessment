import React from 'react';
import MovieCard from '../MovieCard';
import FilterBar from '../FilterBar';
import { MovieListProps } from '../../types';
import './styles.css';

const MovieList: React.FC<MovieListProps> = ({
  movies,
  allMovies,
  loading,
  error,
  filters,
  setFilters,
  onEditMovie,
  onDeleteMovie
}) => {
    console.log(allMovies);


  const genres = Array.from(
    new Set(
      allMovies.map(movie =>
        typeof movie.genre === 'string' ? movie.genre : movie.genre.toString()
      )
    )
  );
  console.log('The genres', genres);

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="movie-list-container">
      <FilterBar filters={filters} setFilters={setFilters} genres={genres} />

      {movies.length === 0 ? (
        <div className="no-movies">No movies found. Try adjusting your filters.</div>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              onEdit={onEditMovie}
              onDelete={onDeleteMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
