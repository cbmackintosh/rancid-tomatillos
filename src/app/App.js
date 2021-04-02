import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { fetchAllMovies } from '../APICalls'
import MovieContainer from '../container/MovieContainer'
import MovieDetailsCard from '../details/MovieDetailsCard';


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      isLoaded: false,
      searchResults: null,
      error: null
    }
  }

  render() {
    console.log(this.state)
    if (!this.state.error) {
      return (
        <main className="App">
          <h1>Rancid Tomatillos</h1>
          <Switch>
            <Route exact path="/" render={() => <MovieContainer movies={this.selectLibrary()} filterMovies={this.filterMovies} isLoaded={this.state.isLoaded} /> } />
            <Route path="/:id" render={(props) => <MovieDetailsCard movieID={props.match.params.id} /> } />
          </Switch> 
        </main>
      )
    } else {
      return (<h2>{this.state.error}</h2>)
    }
  }


  componentDidMount() {
    fetchAllMovies()
      .then(movieData => this.setState({movies: movieData.movies, isLoaded: true }))
      .catch(err => this.setState({ error: this.handleErrorResponse(err.message) })); 
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return 'This is a 400 error message on the Movie Library Page'
    } else {
      return 'This is a 500 error message on the Movie Library Page'
    }
  }

  filterMovies = (query) => {
    const filteredList = this.state.movies.filter(movie => movie.title.toUpperCase().includes(query.toUpperCase()))
    this.setState( { searchResults: filteredList })
  }

  selectLibrary = () => {
    if (this.state.searchResults) {
      return this.state.searchResults;
    } else {
      return this.state.movies
    }
  }

}
