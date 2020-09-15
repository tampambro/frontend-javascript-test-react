import React from 'react';
import './index.css';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.createPagination = this.createPagination.bind(this);
  }

  createPagination(pagesCount) {
    let arr = [];

    for (let i = 1; i <= pagesCount; i++) {
      arr.push(
        <li
          key={i}
          className={
            (i === 1)
            ? "page-item number active"
            : "page-item number"
          }
        >
          <a className="page-link ">
            {i}
          </a>
        </li>
      )
    };
    return arr;
  }

  componentDidMount() {

  }

  render() {
    const {
      pagesCount
    } = this.props;

    return(
      <nav
        id="pagination"
        onClick={this.props.setPage}
      >
        <ul className="pagination">
          <li className="page-item arrow-left">
            <a className="page-link">
              &laquo;
            </a>
          </li>

          {this.createPagination(pagesCount)}

          <li className="page-item arrow-right">
            <a className="page-link">
              &raquo;
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination;
