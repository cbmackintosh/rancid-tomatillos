import React, { Component } from 'react';
import { fetchMovieDetails } from '../APICalls'
import './MovieDetailsCard.css'

class MovieDetailsCard extends Component {
  constructor({ movie, displayMovieLibrary }) {
    super()
    this.state = {
      displayMovieLibrary: displayMovieLibrary,
      movie: movie
    }
  }

  componentDidMount() {
    fetchMovieDetails(this.state.movie.id)
    .then(movieDetails => {
      this.setState({
        movie: movieDetails.movie
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className='movie-details-card' style={{backgroundImage: `url(${this.state.movie.backdrop_path})`}}>
       <div className='movie-details-text'>
         <button className='close-button' onClick={() => this.state.displayMovieLibrary()}>X</button>
         <h2>{this.state.movie.title}</h2>
         <p>RELEASE DATE: {this.state.movie.release_date}</p>
         <p>AVERAGE RATING: {this.state.movie.average_rating.toFixed(2)}</p>
      </div>
     </div>
    )
  }

}

// const MovieDetailsCard = ({movie, displayMovieLibrary}) => {
//   console.log(movie)
//   return (
//     <div className='movie-details-card' style={{backgroundImage: `url(${movie.backdrop_path})`}}>
//       <div className='movie-details-text'>
//         <button className='close-button' onClick={() => displayMovieLibrary()}>X</button>
//         <h2>{movie.title}</h2>
//         <p>RELEASE DATE: {movie.release_date}</p>
//         <p>AVERAGE RATING: {movie.average_rating.toFixed(2)}</p>
//       </div>
//     </div>
//   )
// }

export default MovieDetailsCard