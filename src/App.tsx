import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Statistics from "./components/Statistics";
import MovieForm from "./MovieForm";
import { Movie } from "./types";
import useMovies from "./useMovies";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Movies" | "Statistics">("Movies");
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(
    undefined
  );

  const {
    movies,
    loading,
    error,
    filters,
    setFilters,
    addMovie,
    updateMovie,
    deleteMovie,
    allMovies,
  } = useMovies();

  console.log("App render - Movies count:", movies.length);

  const genres = Array.from(
    new Set(
      allMovies.map((movie) =>
        typeof movie.genre === "string" ? movie.genre : movie.genre.toString()
      )
    )
  );

  const handleAddMovie = () => {
    setEditingMovie(undefined);
    setShowForm(true);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleFormSubmit = async (
    movieData: Omit<Movie, "id"> | Partial<Movie>
  ) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, movieData);
      } else {
        await addMovie(movieData as Omit<Movie, "id">);
      }
      setShowForm(false);
    } catch (err) {
      console.error("Failed to save movie:", err);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
      } catch (err) {
        console.error("Failed to delete movie:", err);
      }
    }
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddMovie={handleAddMovie}
      />

      <main className="main-content">
        {activeTab === "Movies" ? (
          <MovieList
            movies={movies}
            allMovies={allMovies}
            loading={loading}
            error={error}
            filters={filters}
            setFilters={setFilters}
            onEditMovie={handleEditMovie}
            onDeleteMovie={handleDeleteMovie}
          />
        ) : (
          <Statistics movies={allMovies} />
        )}
      </main>

      {showForm && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          genres={
            genres.length > 0
              ? genres
              : ["Drama", "Action", "Comedy", "Sci-Fi", "Horror"]
          }
        />
      )}
    </div>
  );
};

export default App;