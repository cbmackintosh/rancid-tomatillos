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
    this.setState({ searchInput: event.target.value });
    return this.props.filterMovies(this.state.searchInput)
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Search for movies'
          name='search bar'
          value={this.state.searchInput}
          onChange={event => this.handleChange(event)}
        />
      </form>
    )
  }

//Want to search by title, overview, and genre

}

export default Form;
