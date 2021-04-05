import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePoster.css'

const MoviePoster = ({id, poster_path, title}) => {
  return (
    <div id={id} className='movie-poster'>
      <div className='poster-image'>
        <Link to={`/${id}`}>
          <img src={poster_path} alt={title}/>
        </Link>
        <Link to={`/${id}`}>
          <h2 className="movie-poster-title">{title}</h2>
        </Link>
      </div>
    </div>
  )

}

export default MoviePoster
