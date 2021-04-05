import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MovieDetailsCard.css';
import VideoSection from '../VideoSection/VideoSection';
import { fetchMovieDetails } from '../APICalls';

class MovieDetailsCard extends Component {
  constructor({ movieID, movie }) {
    super()
    this.state = {
      id: movieID,
      movie: movie || null,
      error: null
    }
  }


  render() {
    if(this.state.movie && !this.state.error) {
      return (
        <div className='movie-details-card' style={{backgroundImage: `url(${this.state.movie.backdrop_path})`}}>
          <div className='movie-details-text'>
            <Link className='close-link' to={`/`}><button className='close-button'>X</button></Link>
            <h1 className='movie-title'>{this.state.movie.title}</h1>
            {this.state.movie.tagline && <h2>{this.state.movie.tagline}</h2>}
            <p>{this.state.movie.overview}</p>
            <p>{this.formatGenreString(this.state.movie.genres) + ' * ' + this.state.movie.release_date + ' * ' + this.formatRuntimeString(this.state.movie.runtime)}</p>
            <p>AVERAGE RATING: {this.state.movie.average_rating.toFixed(2)}</p>
            {!this.state.movie.budget || !this.state.movie.revenue && <table>
              <thead>
                <tr>
                  <th>BUDGET</th>
                  <th>REVENUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${this.state.movie.budget.toLocaleString()}</td>
                  <td>${this.state.movie.revenue.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>}
            <VideoSection movieID={this.state.id}/>
          </div>
        </div>
      )
    } else if (!this.state.movie && !this.state.error) {
      return (<h2>Loading...</h2>)
    } else if (!this.state.movie && this.state.error) {
      return (
        <div className="movie-details-error">
          <h2 className="movie-details-error-message">{this.state.error}</h2>
          <Link to={`/`}><button className='back-button'>BACK</button></Link>
        </div>
      )
    }
  }

  componentDidMount() {
    if (!this.state.movie) {
      fetchMovieDetails(this.state.id)
      .then(movieDetails => {
        this.setState({ movie: movieDetails })
      })
      .catch(err => this.setState({error: this.handleErrorResponse(err.message)}))
    }
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return "Sorry, we were unable to find this title."
    } else {
      return "Sorry, something's wrong with our system. Please try again later"
    }
  }

  formatGenreString(genres) {
    let list = genres.reduce((list, genre) => list += `${genre}, `, '')
    return list.slice(0, list.length - 2)
  }

  formatRuntimeString(runtime) {
    let hours = Math.floor(runtime / 60)
    let minutes = runtime - (hours * 60) < 10 ? `0${runtime - (hours * 60)}` : runtime - (hours * 60)
    return `${hours}h ${minutes}m`
  }
}

export default MovieDetailsCard
