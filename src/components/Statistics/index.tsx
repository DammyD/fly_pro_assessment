import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef } from 'react'
import { StatisticsProps } from '../../types';
import './styles.css'

Chart.register(...registerables);

const Statistics: React.FC<StatisticsProps> = ({ movies }) => {
    const genreChartRef = useRef<HTMLCanvasElement | null>(null);
    const yearChartRef = useRef<HTMLCanvasElement | null>(null);
    let genreChart: Chart | null = null;
    let yearChart: Chart | null = null;
    
    const totalMovies = movies.length;
    const averageRating = movies.length > 0 
      ? parseFloat((movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1))
      : 0;
  
    const genreCounts: Record<string, number> = {};
    movies.forEach(movie => {
      genreCounts[movie.genre] = (genreCounts[movie.genre] || 0) + 1;
    });
  
    const yearCounts: Record<string, number> = {};
    movies.forEach(movie => {
      const decade = Math.floor(movie.year / 10) * 10;
      yearCounts[decade] = (yearCounts[decade] || 0) + 1;
    });
  
    useEffect(() => {
    
      if (genreChartRef.current && movies.length > 0) {
        const labels = Object.keys(genreCounts);
        const data = Object.values(genreCounts);
        const backgroundColors = [
          '#4169E1', 
          '#32CD32', 
          '#FFD700', 
          '#FF1493', 
          '#9370DB'  
        ];
        
        const total = data.reduce((sum, count) => sum + count, 0);
        const percentages = data.map(count => Math.round((count / total) * 100));
        
        const chartLabels = labels.map((label, index) => `${label} (${percentages[index]}%)`);
        
    
        if (genreChart) {
          genreChart.destroy();
        }
        
        genreChart = new Chart(genreChartRef.current, {
          type: 'pie',
          data: {
            labels: chartLabels,
            datasets: [{
              data,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  boxWidth: 12,
                  padding: 15,
                  font: {
                    size: 12
                  }
                }
              },
              title: {
                display: false
              }
            }
          }
        });
      }
      
      if (yearChartRef.current && movies.length > 0) {
        const decades = Object.keys(yearCounts).sort();
        const counts = decades.map(decade => yearCounts[decade]);
        
        if (yearChart) {
          yearChart.destroy();
        }
        
        yearChart = new Chart(yearChartRef.current, {
          type: 'bar',
          data: {
            labels: decades.map(decade => `${decade}s`),
            datasets: [{
              label: 'Number of Movies',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            },
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: false
              }
            }
          }
        });
      }
      
      return () => {
        if (genreChart) {
          genreChart.destroy();
        }
        if (yearChart) {
          yearChart.destroy();
        }
      };
    }, [movies]); 
  
    return (
      <div className="statistics-container">
        <div className="stats-header">
          <div className="stat-card">
            <h3>Total Movies</h3>
            <div className="stat-value">{totalMovies}</div>
          </div>
          
          <div className="stat-card">
            <h3>Average Rating</h3>
            <div className="stat-value">{averageRating}</div>
          </div>
        </div>
        
        <div className="charts-container">
          <div className="chart-card">
            <h3>Movies by Genre</h3>
            <div className="chart-container">
              <canvas ref={genreChartRef}></canvas>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Movies by Year</h3>
            <div className="chart-container">
              <canvas ref={yearChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Statistics