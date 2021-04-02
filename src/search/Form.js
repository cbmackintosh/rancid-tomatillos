import { React, Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value}, () => {
      this.props.filterMovies(this.state.searchInput)
    });
  }

  render() {
    return (
      <form>
        <input
          class='search-bar'
          type='text'
          placeholder='Search for movies'
          name='searchInput'
          value={this.state.searchInput}
          onChange={event => this.handleChange(event)}
        />
      </form>
    )
  }

}

export default Form;
