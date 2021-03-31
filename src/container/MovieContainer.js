import React from 'react'
import MoviePoster from '../poster/MoviePoster'
import './MovieContainer.css'

const MovieContainer = ({ movies }) => {

  const moviePosters = movies.map(movie => {
    return(
      <MoviePoster
        id={movie.id}
        key={movie.id}
        poster_path={movie.poster_path}
        title={movie.title}
      />
    )
  })

  return (
    <div className='movie-container'>
      {moviePosters}
    </div>
  )

}

export default MovieContainer
