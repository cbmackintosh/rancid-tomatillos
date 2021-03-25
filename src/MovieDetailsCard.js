import React from 'react'
import './MovieDetailsCard.css'

const MovieDetailsCard = (movie) => {
  console.log({...movie})
  return (
    <div className='movie-details-card'>
      <h2>{movie.title}</h2>
    </div>
  )
}

export default MovieDetailsCard