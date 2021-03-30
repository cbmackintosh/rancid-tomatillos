const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'

export const fetchAllMovies = () => {
  return fetch(`${baseURL}`)
    .then(checkForErrors)
}

export const fetchMovieDetails = (id) => {
  return fetch(`${baseURL}/${id}`)
    .then(checkForErrors)
}

const checkForErrors = response => {
  if(!response.ok) {
    throw new Error (response.status)
  } else {
    return response.json()
  }
}