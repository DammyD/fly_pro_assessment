import React, { useEffect, useState } from "react";
import { Movie, MovieFormProps } from "../types";
import './styles.css'

const MovieForm: React.FC<MovieFormProps> = ({
  movie,
  onSubmit,
  onCancel,
  genres,
}) => {
  const [formData, setFormData] = useState<Omit<Movie, "id"> | Partial<Movie>>({
    title: "",
    year: new Date().getFullYear(),
    genre: genres[0] || "Drama",
    rating: 5,
    posterUrl: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    }
  }, [movie]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="movie-form-overlay">
      <div className="movie-form-container">
        <h2>{movie ? "Edit Movie" : "Add New Movie"}</h2>

        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              min="1900"
              max="2025"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating (0-10)</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="posterUrl">Poster URL (Optional)</label>
            <input
              type="text"
              id="posterUrl"
              name="posterUrl"
              value={formData.posterUrl || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {movie ? "Update Movie" : "Add Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
