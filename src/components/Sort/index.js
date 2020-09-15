import React from 'react';
import className from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../fontawasomeLibrary';

import './index.css';

class Sort extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      iconUp: false,
    }
  }

  render() {
    const {
      sortKey,
      onSort,
      activeSortKey,
      children,
    } = this.props

    const {
      iconUp,
    } = this.state;

    const sortClass = className(
      "",
      {"table-primary up": sortKey === activeSortKey && iconUp},
      {"table-primary down": sortKey === activeSortKey && !iconUp}
    );

    return (
      <th
        tabIndex="0"
        onClick={() => {
          onSort(sortKey);
          this.setState({iconUp: !iconUp});
        }}
        onBlur={() => this.setState({iconUp: false})}
        className={sortClass}
      >
        {children}
        {sortClass === "table-primary up"
        ? <FontAwesomeIcon icon="sort-up" />
        : sortClass === "table-primary down"
        ? <FontAwesomeIcon icon="sort-down" />
        : <FontAwesomeIcon icon="sort" />}
      </th>
    );
  }
}
export default Sort;
