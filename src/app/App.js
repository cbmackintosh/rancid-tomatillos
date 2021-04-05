import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
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
      error: null,
      rememberSearchQuery: ''
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>{this.state.error}</h2>
          <button onClick={()=> window.location.reload(false)}>Try Again</button>
        </div>
      )
    }
    return (
      <main className="App">
        <Link to={"/"}><h1 className="website-header">Rancid Tomatillos</h1></Link>
        <Switch>
          <Route exact path="/" render={() =>
            <MovieContainer
              movies={this.state.searchResults || this.state.movies}
              filterMovies={this.filterMovies}
              isLoaded={this.state.isLoaded}
              rememberSearchQuery={this.state.rememberSearchQuery}
            /> }
          />
          <Route
            exact
            path="/:id"
            render={({ match }) => {
              const idMatch = parseInt(match.params.id);
              const foundMovie = this.state.movies.find(movie => movie.id === idMatch);
              return <MovieDetailsCard movieID={idMatch} movie={foundMovie}/>
              }
            }
          />
        </Switch>
      </main>
    )
  }


  componentDidMount() {
    fetchAllMovies()
    .then(data => Promise.all(data))
      .then(movieData => this.setState({ movies: movieData, isLoaded: true }))
      .catch(err => this.setState({ error: this.handleErrorResponse(err.message)}));
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return 'This is a 400 error message on the Movie Library Page'
    } else {
      return 'This is a 500 error message on the Movie Library Page'
    }
  }

  filterMovies = (query) => {
    this.setState({ rememberSearchQuery: query })
    const formattedQuery = query.toUpperCase();
    const filteredList = this.state.movies.filter(movie => {
    return movie.title.toUpperCase().includes(formattedQuery)
    || movie.genres.toString().toUpperCase().includes(formattedQuery)
    || movie.overview.toUpperCase().includes(formattedQuery)
  });

    this.setState({ searchResults: filteredList })
  }

}
