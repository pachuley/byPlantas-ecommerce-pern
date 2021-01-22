import React, { Component } from "react";
import axios from 'axios';
require('dotenv').config();
const {REACT_APP_BACKEND_URL} = process.env;

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: ""
    };
  }
  
  handleChange(event) {
    this.setState({ searchKeywords: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    axios.get(`${REACT_APP_BACKEND_URL}/search?query=${this.state.searchKeywords}`)
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

  render() {
    const { searchKeywords } = this.state;
    return (
      <div>
        <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="searchKeywords">Products: </label>
            <input
              type="text"
              id="searchBar"
              autoComplete="off"
              value={searchKeywords}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit" >BUSCAR</button>
        </form>
      </div>
    );
  }
}



export default SearchBar;