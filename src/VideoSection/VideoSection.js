
import { Component } from 'react'
import { fetchMovieDetails } from '../APICalls'

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
    fetchMovieDetails(`${this.state.movieID}/videos`)
      .then(videoData => this.setState({ videos: videoData.videos}))
      .catch(err => this.setState({ error: err}))
  }

}

export default VideoSection