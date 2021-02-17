import React, { useState } from 'react';
import className from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../fontawasomeLibrary';

import './index.css';

export default function Sort({ localKey, onSort, activeSortKey, children }) {
  const [isIconUp, setIsIconUp] = useState(false);

  const sortClass = className(
    "",
    {"table-primary up": localKey === activeSortKey && isIconUp},
    {"table-primary down": localKey === activeSortKey &&!isIconUp}
  );

  return (
    <th
      tabIndex="0"
      onClick={() => {
        onSort(localKey);
        setIsIconUp(!isIconUp);
      }}
      onBlur={() =>setIsIconUp(false)}
      className={sortClass}
    >
      {children}
      {sortClass === "table-primary up"
      ? <FontAwesomeIcon icon="sort-up" />
      : sortClass === "table-primary down"
      ? <FontAwesomeIcon icon="sort-down" />
      : <FontAwesomeIcon icon="sort" />}
    </th>
  )
}
