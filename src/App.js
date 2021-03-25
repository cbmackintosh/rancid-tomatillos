import React, { Component } from 'react';
import './App.css';
import movieData from './data'
import MovieContainer from './MovieContainer'
import MovieDetailsCard from './MovieDetailsCard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: movieData.movies,
      displayMovieDetails: null
    }
  }

  render() {
    console.log(this.state)
    return (
      <main className="App">
        <h1>Rancid Tomatillos</h1>
        { this.state.displayMovieDetails && <MovieDetailsCard movie={this.state.displayMovieDetails} displayMovieLibrary={this.displayMovieLibrary} />}
        { !this.state.displayMovieDetails && <MovieContainer movies={this.state.movies} displayMovieDetails={this.displayMovieDetails} />}  
      </main>
    )
  }

  displayMovieDetails = (id) => {
    this.setState({
      displayMovieDetails: this.state.movies.find(movie => movie.id === id)
    })
  }

  displayMovieLibrary = () => {
    this.setState({
      displayMovieDetails: null
    })
  }

}

export default App;
