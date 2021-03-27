const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'

export const fetchAllMovies = () => {
  return fetch(`${baseURL}`)
    .then(response => response.json())
}

export const fetchMovieDetails = (id) => {
  return fetch(`${baseURL}/${id}`)
    .then(response => response.json())
}