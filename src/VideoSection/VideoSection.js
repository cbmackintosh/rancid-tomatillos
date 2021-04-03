
import { Component } from 'react'
import { fetchMovieVideos } from '../APICalls'

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
      return (
        <div>
          {console.log(this.state.videos)}
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

}

export default VideoSection