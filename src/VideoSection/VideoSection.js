
import { Component } from 'react'
import { fetchMovieVideos } from '../APICalls'
import ReactPlayer from 'react-player'

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
        videoPlayers.push(<ReactPlayer key={index} url={this.formatURL(value.key, value.site)} />)
      }
      return (
        <div>
          {videoPlayers}
        </div>
      )
    } else {
      return (<h2>Loading...</h2>)
    }
  }

  componentDidMount() {
    fetchMovieVideos(this.state.movieID)
      .then(videoData => this.setState({ videos: videoData }))
      .catch(err => this.setState({ error: err.message}))
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