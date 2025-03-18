export interface Movie {
    id: string;
    title: string;
    year: number;
    genre: string | number; 
    rating: number;
    posterUrl?: string;
  }
  
  export interface MovieFilters {
    search: string;
    genre: string;
    yearRange: [number, number];
    ratingRange: [number, number];
  }

 export interface HeaderProps {
    activeTab: 'Movies' | 'Statistics';
    setActiveTab: (tab: 'Movies' | 'Statistics') => void;
    onAddMovie: () => void;
  }

  export interface FilterBarProps {
    filters: MovieFilters;
    setFilters: (filters: MovieFilters) => void;
    genres: string[];
  }

  export interface MovieCardProps {
    movie: Movie;
    onEdit: (movie: Movie) => void;
    onDelete: (id: string) => void;
  }
  
  export interface MovieListProps {
    movies: Movie[];
    allMovies: Movie[]; 
    loading: boolean;
    error: string | null;
    filters: MovieFilters;
    setFilters: React.Dispatch<React.SetStateAction<MovieFilters>>;
    onEditMovie: (movie: Movie) => void;
    onDeleteMovie: (id: string) => void;
  }

  export interface MovieFormProps {
    movie?: Movie;
    onSubmit: (movie: Omit<Movie, 'id'> | Partial<Movie>) => void;
    onCancel: () => void;
    genres: string[];
  }

  export interface StatisticsProps {
  movies: Movie[];
}

export type Filters = {
    title: string;
    genre: string;
    year: string;
    rating: string;
  };