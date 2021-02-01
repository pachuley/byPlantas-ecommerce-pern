import React, { Component } from "react";
import axios from 'axios';
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
    axios.get(`${REACT_APP_BACKEND_URL}/products/search?query=${this.state.searchKeywords}`)
    .then(res => {
        console.log(res.data)
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
            {/* <label className="label" htmlFor="searchKeywords">Buscar: </label> */}
            <input
              type="text"
              id="searchBar"
              autoComplete="off"
              value={searchKeywords}
              onChange={(e) => this.handleChange(e)}
              className='form-control form-control-sm'
            />
          </div>
          <button type="submit" className="my-2 btn btnByPlantas">BUSCAR</button>
        </form>
      </div>
    );
  }
}



export default SearchBar;