import React, { Component } from 'react';
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
      error: ''
    }
  }

  render() {
    return (
      <main className="App">
        <h1>Rancid Tomatillos</h1>
        {this.state.error && <h2>{this.state.error}</h2>}
        { this.state.displayMovieDetails && <MovieDetailsCard movie={this.state.displayMovieDetails} displayMovieLibrary={this.displayMovieLibrary} />}
        { !this.state.displayMovieDetails && <MovieContainer movies={this.state.movies} displayMovieDetails={this.displayMovieDetails} />}
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
      .catch(err => {
        console.log(err.message)
        this.setState({ error: 'There was a problem loading this title. Try again later.'})
      })
  }

  componentDidMount() {
    fetchAllMovies()
      .then(movieData => this.setState({movies: movieData.movies}))
      .catch(err => this.setState({ error: 'Oh wow. This is embarassing. Try again later? 😅'}))
  }

  // handleErrorResponse(error) {
  //   if (error >= 400 && error < 500) {
  //     return: 
  //   }
  // }

  // checkForErrors = response => {
  //   if (!response.ok) {
  //     this.setState( {error: 'Oop, that/s no good 😅'} )
  //   } else {
  //     return response.json();
  //   }
  // }

}

export default App;
