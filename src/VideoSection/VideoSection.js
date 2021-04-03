
import { Component } from 'react'
import { fetchMovieVideos } from '../APICalls'
import PropTypes from 'prop-types'

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
      const elements = this.state.videos
      const items = []
      for (const [index,value] of elements.entries()) {
      items.push(<iframe src={value} allowFullScreen />)
      }
      return (
        <div>
          {items}
        </div>
      )
    } else {
      return (<h2>Loading...</h2>)
    }
  }

  componentDidMount() {
    fetchMovieVideos(this.state.movieID)
      .then(videoData => this.setState({ videos: this.formatEmbedIds(videoData) }))
      .catch(err => this.setState({ error: err.message}))
  }

  formatEmbedIds(videoData) {
    return videoData.map(video => video.key = `https://www.youtube.com/embed/${video.key}`)
  }

}

export default VideoSection