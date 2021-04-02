import React, { Component } from 'react';
import { fetchMovieInfo } from '../APICalls'
import { Link } from 'react-router-dom';
import './MovieDetailsCard.css'
import VideoSection from '../VideoSection/VideoSection'

class MovieDetailsCard extends Component {
  constructor({ movieID }) {
    super()
    this.state = {
      id: movieID,
      movie: null,
      error: null
    }
  }

  render() {
    console.log(this.state)
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
            <table>
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
            </table>
            <div>
              <VideoSection movieID={this.state.id}/>
            </div>
          </div>
        </div>
      )
    } else if (!this.state.movie && !this.state.error) {
      return (<h2>Loading...</h2>)
    } else if (!this.state.movie && this.state.error) {
      return (
        <div>
          <h2>{this.state.error}</h2>
          <Link to={`/`}><button className='back-button'>BACK</button></Link>
        </div>
      )
    }
  }

  componentDidMount() {
    fetchMovieInfo(this.state.id)
    .then(movieDetails => this.setState({movie: movieDetails.movie}))
    .catch(err => this.setState({error: this.handleErrorResponse(err.message)}))
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return 'This is a 400 error message on the Movie Details Card'
    } else {
      return 'This is a 500 error message on the Movie Details Card'
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
