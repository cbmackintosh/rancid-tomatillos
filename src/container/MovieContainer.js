import React from 'react'
import MoviePoster from '../poster/MoviePoster'
import './MovieContainer.css'
import Form from '../search/Form.js'

const MovieContainer = ({ movies, filterMovies, isLoaded, rememberSearchQuery }) => {

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

  if (isLoaded) {
    return (
      <div>
        <Form className="search-bar" filterMovies={filterMovies} rememberSearchQuery={rememberSearchQuery} />
        <div className='movie-container'>
          {moviePosters.length ? moviePosters : <h2>No results</h2>}
        </div>
      </div>
    )
  } else {
    return (
      <h2>Loading...</h2>
    )
  }

}

export default MovieContainer
