import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePoster.css'

const MoviePoster = ({id, poster_path, title, displayMovieDetails}) => {
  return (
    <div id={id} className='movie-poster' onClick={() => displayMovieDetails(id)}>
      <div className='poster-image'>
        <Link to={`/${id}`}>
          <img src={poster_path} alt={title}/>
        </Link>
        <h2>{title}</h2>
      </div>
    </div>
  )

}

export default MoviePoster
