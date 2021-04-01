import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { fetchAllMovies } from '../APICalls'
import MovieContainer from '../container/MovieContainer'
import MovieDetailsCard from '../details/MovieDetailsCard';
import Form from '../search/Form';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      searchResults: [],
      error: null
    }
  }

  render() {
    if (!this.state.error) {
      return (
        <main className="App">
          <h1>Rancid Tomatillos</h1>
          <Form filterMovies={this.filterMovies}/>
          <Switch>
            <Route exact path="/" render={() => <MovieContainer movies={this.selectLibrary()} /> } />
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
      .then(movieData => this.setState({movies: movieData.movies}))
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
    //Want to search by title, overview, and genre
    const filteredList = this.state.movies.filter(movie => movie.title.toUpperCase().includes(query.toUpperCase()))
    console.log(filteredList)
    // if(filteredList.length === 0) {
    //   this.setState({ error: 'No results' })
    // } else {
    //   this.setState({ searchResults: filteredList })
    // }
    this.setState({ searchResults: filteredList })
  }

  selectLibrary = () => {
    if (this.state.searchResults.length) {
      return this.state.searchResults;
    } else {
      return this.state.movies;
    }
  }

}
