import React from 'react'
import { HeaderProps } from '../../types';
import './styles.css'

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onAddMovie }) => {
    return (
      <div className="header">
        <h1>Movie Collection</h1>
        <div className="header-tabs">
          <button 
            className={`tab ${activeTab === 'Movies' ? 'active' : ''}`}
            onClick={() => setActiveTab('Movies')}
          >
            Movies
          </button>
          <button 
            className={`tab ${activeTab === 'Statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('Statistics')}
          >
            Statistics
          </button>
        </div>
        <button className="add-movie-btn" onClick={onAddMovie}>+ Add Movie</button>
      </div>
    );
  };

export default Header;