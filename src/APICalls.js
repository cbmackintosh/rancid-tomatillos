export const fetchAllMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  .then(checkForErrors)
  .then(movieData => movieData.movies.reduce((acc, movie) => {
    acc.push(fetchMovieDetails(movie.id))
    return acc
  }, []))
}

export const fetchMovieDetails = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
    .then(checkForErrors)
    .then(data => {
      return data.movie
    })
}

export const fetchMovieVideos = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`)
    .then(checkForErrors)
    .then(data => {
      return data.videos
    })
}

const checkForErrors = response => {
  if(!response.ok) {
    throw new Error (response.status)
  } else {
    return response.json()
  }
}