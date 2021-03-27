export const fetchAllMovies = () => {
  let allMovies = fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  .then(response => response.json())
  .then(data => {
    return data
  })
  return allMovies
}

export const fetchMovieDetails = (id) => {
  let movieDetails = fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
  .then(response => response.json())
  .then(data => {
    return data
  })
  return movieDetails
}