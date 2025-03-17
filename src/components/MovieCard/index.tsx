import React from "react";
import { MovieCardProps } from "../../types";
import "./styles.css";

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={`${movie.title} poster`} />
        ) : (
          <div className="placeholder-poster">Movie Poster</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
          <span>•</span>
          <span>⭐ {movie.rating}</span>
        </div>
      </div>
      <div className="movie-actions">
        <button className="edit-btn" onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(movie.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
