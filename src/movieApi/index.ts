import axios from "axios";
import { Movie } from "../types";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = "3f37434b13abe76ffcb940b673bef6c5";

const movieCollection = collection(db, "movies");

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

export const movieApi = {
  getMovies: async (): Promise<Movie[]> => {
    const response = await axios.get<{ results: any[] }>(
      `${API_BASE_URL}/discover/movie?`,
      { params: { api_key: API_KEY } }
    );
    console.log("TMDb response:", response.data);

    return response.data.results.map((movie) => {
      const genreId = movie.genre_ids?.[0];
      
      const genre = genreId ? (genreMap[genreId] || "Other") : "Unknown";
      
      return {
        id: String(movie.id),
        title: movie.title,
        genre: genre,
        year: parseInt(movie.release_date?.split("-")[0]) || 2023,
        rating: movie.vote_average || 0,
        posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined
      };
    });
  },

  getMovie: async (id: string): Promise<Movie> => {
    const response = await axios.get(`${API_BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY },
    });

    const genreId = response.data.genres?.[0]?.id;
    const genre = genreId ? (genreMap[genreId] || "Other") : "Unknown";

    return {
      id: String(response.data.id),
      title: response.data.title,
      genre: genre, 
      year: parseInt(response.data.release_date?.split("-")[0]) || 2023,
      rating: response.data.vote_average || 0,
      posterUrl: response.data.poster_path ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}` : undefined
    };
  },

  createMovie: async (movie: Omit<Movie, "id">) => {
    const docRef = await addDoc(movieCollection, movie);
    return { id: docRef.id, ...movie };
  },

  updateMovie: async (id: string, movie: Partial<Movie>) => {
    const movieRef = doc(db, "movies", id);
    await updateDoc(movieRef, movie);
    const updated = await getDoc(movieRef);
    return { id, ...updated.data() } as Movie;
  },

  deleteMovie: async (id: string) => {
    const movieRef = doc(db, "movies", id);
    await deleteDoc(movieRef);
    return id;
  },
};