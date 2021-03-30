import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { fetchAllMovies, fetchMovieDetails } from '../APICalls'
import MovieContainer from '../container/MovieContainer'
import MovieDetailsCard from '../details/MovieDetailsCard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      displayMovieDetails: null,
      libraryError: '',
      movieDetailsError: ''
    }
  }

  render() {
    return (
      <main className="App">
        <h1>Rancid Tomatillos</h1>
        <Route exact path="/" render={() => <MovieContainer movies={this.state.movies} displayMovieDetails={this.displayMovieDetails} /> } />
        <Route
          path="/:id"
          render={({ match }) => {
            const { id } = match.params
            console.log(typeof id);
            const foundMovie = this.state.movies.find(movie => movie.id === parseInt(id))
            console.log(this.state.movies)
            console.log(foundMovie)
            return <MovieDetailsCard movie={foundMovie} displayMovieLibrary={this.displayMovieLibrary} error={this.state.movieDetailsError} />
          }}
        />
        {this.state.libraryError && <h2>{this.state.libraryError}</h2>}
      </main>
    )
  }

  displayMovieLibrary = () => {
    this.setState({
      displayMovieDetails: null
    })
  }

  displayMovieDetails = (id) => {
    fetchMovieDetails(id)
      .then(movieDetails => this.setState({displayMovieDetails: movieDetails.movie}))
      .catch(err => this.setState({
        displayMovieDetails: 'error',
        movieDetailsError: err.message
      }))
  }

  componentDidMount() {
    fetchAllMovies()
      .then(movieData => this.setState({movies: movieData.movies}))
      .catch(err => this.setState({ libraryError: this.handleErrorResponse(err.message)}));
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return 'This is a 400 error message on the Movie Library Page'
    } else {
      return 'This is a 500 error message on the Movie Library Page'
    }
  }

}

export default App;
