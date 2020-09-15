import React from 'react';
import Sort from '../Sort';
import {SORTS} from '../../constants';

import './index.css';

import TrInfo from '../TrInfo';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: "NONE",
      isSortReverse: false,
      trTragetInfo: false,
    }

    this.onSort = this.onSort.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.handlerTrTragetInfo = this.handlerTrTragetInfo.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = (this.state.sortKey === sortKey) && !this.state.isSortReverse;

    this.setState({sortKey, isSortReverse});
  }

  showInfo(trTragetInfo) {
    const tr = trTragetInfo;

    return (
      <TrInfo
        tr={tr}
      />
    )
  }

  handlerTrTragetInfo(e) {
    this.setState({trTragetInfo: e.target.closest("tr")});
  }

  render() {
    const {
      list,
      additionForList
    } = this.props;

    const {
      sortKey,
      isSortReverse,
      trTragetInfo,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <React.Fragment>
        <table className="table table-bordered">
          <thead>
            <tr onClick={this.setSortIcon}>
              <Sort
                sortKey={"ID"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                id
              </Sort>
              <Sort
                sortKey={"FIRST_NAME"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                firstName
              </Sort>
              <Sort
                sortKey={"LAST_NAME"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                lastName
              </Sort>
              <Sort
                sortKey={"EMAIL"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                email
              </Sort>
              <Sort
                sortKey={"PHONE"}
                onSort={this.onSort}
                activeSortKey={sortKey}
              >
                phone
              </Sort>
            </tr>
          </thead>
          <tbody onClick={this.handlerTrTragetInfo}>
            {additionForList.map((item) => (
              <tr
                key={item.id + item.phone}
              >
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
            {reverseSortedList.map((item) => (
              <tr
                key={item.id + item.phone}
                data-description={item.description}
                data-street-address={item.addressstreetAddress}
                data-city={item.address.city}
                data-state={item.address.state}
                data-zip={item.address.zip}
              >
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
              )
            )}
          </tbody>
        </table>
        {trTragetInfo && this.showInfo(trTragetInfo)}
      </React.Fragment>
    )
  }
}

export default Table;
