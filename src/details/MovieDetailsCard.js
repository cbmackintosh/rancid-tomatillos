import React from 'react'
import './MovieDetailsCard.css'

const MovieDetailsCard = ({movie, displayMovieLibrary}) => {
  console.log(movie)
  return (
    <div className='movie-details-card' style={{backgroundImage: `url(${movie.backdrop_path})`}}>
      <div className='movie-details-text'>
        <button className='close-button' onClick={() => displayMovieLibrary()}>X</button>
        <h2>{movie.title}</h2>
        <p>RELEASE DATE: {movie.release_date}</p>
        <p>AVERAGE RATING: {movie.average_rating.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default MovieDetailsCard