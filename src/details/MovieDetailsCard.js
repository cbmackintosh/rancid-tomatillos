import React, { Component } from 'react';
import './MovieDetailsCard.css'

class MovieDetailsCard extends Component {
  constructor({ movie, displayMovieLibrary }) {
    super()
    this.state = {
      movie: movie,
      displayMovieLibrary: displayMovieLibrary
    }
  }

  render() {
    return (
      <div className='movie-details-card' style={{backgroundImage: `url(${this.state.movie.backdrop_path})`}}>
       <div className='movie-details-text'>
         <button className='close-button' onClick={() => this.state.displayMovieLibrary()}>X</button>
         <h1>{this.state.movie.title}</h1>
         <h2>{this.state.movie.tagline}</h2>
         <p>{this.state.movie.overview}</p>
         <p>{this.formatGenreString(this.state.movie.genres) + ' * ' + this.state.movie.release_date + ' * ' + this.formatRuntimeString(this.state.movie.runtime)}</p>
         <p>AVERAGE RATING: {this.state.movie.average_rating.toFixed(2)}</p>
         <table>
          <thead>
            <tr>
              <th>BUDGET</th>
              <th>REVENUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${this.state.movie.budget.toLocaleString()}</td>
              <td>${this.state.movie.revenue.toLocaleString()}</td>
            </tr>
          </tbody> 
         </table>
      </div>
     </div>
    )
  }

  formatGenreString(genres) {
    let list = genres.reduce((list, genre) => list += `${genre}, `, '')
    return list.slice(0, list.length - 2)
  }

  formatRuntimeString(runtime) {
    let hours = Math.floor(runtime / 60)
    let minutes = runtime - (hours * 60) < 10 ? `0${runtime - (hours * 60)}` : runtime - (hours * 60)
    return `${hours}h ${minutes}m`
  }

}

export default MovieDetailsCard