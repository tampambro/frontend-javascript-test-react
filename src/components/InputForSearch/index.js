import React from 'react';
import './index.css';

class InputForSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }

    this.filterSearch = this.filterSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  filterSearch(value) {
    console.log('hi')
    const tbody = document.querySelector("tbody");
    const rows = tbody.rows;

    for (let row of rows) {
      row.className = "";
      let cells = row.cells;
      let indicator = true;

      for (let cell of cells) {
        if (cell.textContent.indexOf(value) === -1) {
          continue;
        } else {
          indicator = !indicator;
          break;
        }
      }

      if (indicator) {
        row.className = "hide";
      }
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const {
      value,
    } = this.state;

    return (
      <form
        className="input-group mb-3"
        onSubmit={(e) => {
          this.filterSearch(value);
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="фильтр"
          value={value}
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="submit"
            value="Submit"
          >
            Найти
          </button>
        </div>
      </form>
    )
  }
}

export default InputForSearch;
