import React from 'react'
import MoviePoster from './MoviePoster'
import './MovieContainer.css'

const MovieContainer = ({movies}) => {

  const moviePosters = movies.map(movie => {
    return(
      <MoviePoster
        id={movie.id}
        key={movie.id}
        poster_path={movie.poster_path}
        backdrop_path={movie.backdrop_path}
        title={movie.title}
        average_rating={movie.average_rating}
        release_date={movie.release_date}
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