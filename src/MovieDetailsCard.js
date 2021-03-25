import React from 'react'
import './MovieDetailsCard.css'

const MovieDetailsCard = (movie) => {
  console.log(movie)
  return (
    <div className='movie-details-card' style={{backgroundImage: `url(${movie.movie.backdrop_path})`}}>
      <div className='movie-details-text'>
        <h2>{movie.movie.title}</h2>
        <p>RELEASE DATE: {movie.movie.release_date}</p>
        <p>AVERAGE RATING: {movie.movie.average_rating.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default MovieDetailsCard