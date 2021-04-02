const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'

export const fetchMovieInfo = (id) => {
  return fetch(`${baseURL}/${id || ''}`)
    .then(checkForErrors)
}

const checkForErrors = response => {
  if(!response.ok) {
    throw new Error (response.status)
  } else {
    return response.json()
  }
}