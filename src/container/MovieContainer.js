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
        {!moviePosters.length && <h3 className="no-results">There are no matches for your search. Try again?</h3>}
        {moviePosters.length > 0 && <div className='movie-container'>
          {moviePosters}
        </div>}
      </div>
    )
  } else {
    return (
      <h3 className="loading">Loading...</h3>
    )
  }

}

export default MovieContainer
