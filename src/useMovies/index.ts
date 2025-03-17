import { useEffect, useState } from 'react'
import { Movie, MovieFilters } from '../types';
import { movieApi } from '../movieApi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const movieCollection = collection(db, "movies");

const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MovieFilters>({
    search: '',
    genre: 'All',
    yearRange: [1900, 2023],
    ratingRange: [0, 10],
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const tmdbMovies = await movieApi.getMovies();
        const snapshot = await getDocs(movieCollection);
        const userMovies = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Movie[];

        const allMovies = [...tmdbMovies, ...userMovies];
        setMovies(allMovies);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

//   const filteredMovies = movies.filter((movie) => {
//     const matchesTitle =
//       filters.search === '' ||
//       movie.title.toLowerCase().includes(filters.search.toLowerCase());

//       const matchesGenre =
//       filters.genre === 'All' ||
//       (typeof movie.genre === 'string' &&
//         movie.genre.toLowerCase() === filters.genre.toLowerCase());
    
//     const matchesYear =
//       movie.year >= filters.yearRange[0] && movie.year <= filters.yearRange[1];

//     const matchesRating =
//       movie.rating >= filters.ratingRange[0] && movie.rating <= filters.ratingRange[1];

//     return matchesTitle && matchesGenre && matchesYear && matchesRating;
//   });

  const addMovie = async (movie: Omit<Movie, 'id'>) => {
    try {
      const newMovie = await movieApi.createMovie(movie);
      setMovies(prev => [...prev, newMovie]);
      return newMovie;
    } catch (err) {
      setError('Failed to add movie');
      throw err;
    }
  };

  const updateMovie = async (id: string, movieData: Partial<Movie>) => {
    try {
      const updatedMovie = await movieApi.updateMovie(id, movieData);
      setMovies(prev => prev.map(movie => movie.id === id ? updatedMovie : movie));
      return updatedMovie;
    } catch (err) {
      setError('Failed to update movie');
      throw err;
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      await movieApi.deleteMovie(id);
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      setError('Failed to delete movie');
      throw err;
    }
  };

  return {
    movies: movies,
    allMovies: movies,
    loading,
    error,
    filters,
    setFilters,
    addMovie,
    updateMovie,
    deleteMovie,
  };
};

export default useMovies;
