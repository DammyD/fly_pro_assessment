import React from 'react'
import { FilterBarProps } from '../../types';
import './styles.css'

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, genres }) => {
    return (
      <div className="filter-bar">
        <input 
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />
        
        <div className="filter-dropdown">
          <label>Genre:</label>
          <select 
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          >
            <option value="All">All</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-dropdown">
          <label>Year: {filters.yearRange[0]}-{filters.yearRange[1]}</label>
          <select
            value={`${filters.yearRange[0]}-${filters.yearRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              setFilters({ ...filters, yearRange: [min, max] });
            }}
          >
            <option value="1900-2023">1900-2023</option>
            <option value="1900-1950">1900-1950</option>
            <option value="1950-2000">1950-2000</option>
            <option value="2000-2023">2000-2023</option>
          </select>
        </div>
        
        <div className="filter-dropdown">
          <label>Rating: {filters.ratingRange[0]}-{filters.ratingRange[1]}</label>
          <select
            value={`${filters.ratingRange[0]}-${filters.ratingRange[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              setFilters({ ...filters, ratingRange: [min, max] });
            }}
          >
            <option value="0-10">0-10</option>
            <option value="0-5">0-5</option>
            <option value="5-10">5-10</option>
            <option value="7-10">7-10</option>
          </select>
        </div>
      </div>
    );
  };
  

export default FilterBar