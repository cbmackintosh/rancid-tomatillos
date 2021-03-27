import React, { Component } from 'react';
import './App.css';
import movieData from '../data'
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
    console.log(this.state)
    return (
      <main className="App">
        <h1>Rancid Tomatillos</h1>
        {this.state.error && <h2>{this.state.error}</h2>}
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

  checkForErrors = response => {
    if (!response.ok) {
      this.setState( {error: 'Oop, that/s no good 😅'} )
    } else {
      return response.json();
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(this.checkForErrors)
      .then(data => {
        this.setState( {
          movies: data.movies
        })
      })
      .catch(err => this.setState({ error: 'Oh wow. This is embarassing. Try again later? 😅' }))
  }

}

export default App;