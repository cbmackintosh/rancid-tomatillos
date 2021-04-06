
import { Component } from 'react'
import { fetchMovieVideos } from '../APICalls'
import ReactPlayer from 'react-player'
import './VideoSection.css'

class VideoSection extends Component {
  constructor({ movieID }) {
    super()
    this.state = {
      movieID: movieID,
      videos: null,
      error: null
    }
  }

  render() {
    if (this.state.videos) {
      const videoPlayers = []
      for (const [index, value] of this.state.videos.entries()) {
        videoPlayers.push(<ReactPlayer className="react-player" key={index} url={this.formatURL(value.key, value.site)} width="100%" height="40vh"/>)
      }
      return (
        <div className="video-section">
          {videoPlayers}
        </div>
      )
    } else if (this.state.error) {
      return (<h2>{this.state.error}</h2>)
    } else {
      return (<h2>Loading...</h2>)
    }
  }

  componentDidMount() {
    fetchMovieVideos(this.state.movieID)
      .then(videoData => this.setState({ videos: videoData }))
      .catch(err => this.setState({ error: this.handleErrorResponse(err.message)}))
  }

  handleErrorResponse(error) {
    if (error < 500) {
      return "Sorry, we couldn't find the videos for this movie."
    } else {
      return "Something went wrong. Please try again later"
    }
  }

  formatURL(key, site) {
    if (site === "Vimeo") {
      return `https://www.vimeo.com/${key}`
    } else if (site === "YouTube") {
      return `www.youtube.com/watch?v=${key}`
    }
  }

}

export default VideoSection