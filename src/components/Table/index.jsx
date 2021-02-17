import React, { useEffect, useState } from 'react';
import { Container, Table as BootTable } from 'react-bootstrap';

import './index.css';

import {SORTS} from '../../constants';

import TrInfo from '../TrInfo';
import Sort from '../Sort/index';

export default function Table({ list, additionForList }) {
  const [sortKey, setSortKey] = useState('NONE');
  const [isSortReverse, setIsSortReverse] = useState(false);
  const [trTargetInfo, setTrTargetInfo] = useState(null);
  const [sortedList, setSortedList] = useState([]);

  const onSort = (localKey) => {
    setSortKey(localKey);
    setIsSortReverse((sortKey === localKey) && !isSortReverse);
  }

  useEffect(() => {
    setSortedList(() => SORTS[sortKey](list));
    if (isSortReverse) {
      setSortedList((sortedList) => sortedList.reverse());
    }
  }, [isSortReverse, sortKey, list])

  useEffect(() => {
    if (trTargetInfo) {
      const elem = document.querySelector('.trInfo');
      elem.scrollIntoView(false);
    }
  }, [trTargetInfo])

  return (
    <Container className="table">
      <BootTable striped bordered hover>
        <thead>
          <tr>
            <Sort
              localKey="ID"
              onSort={onSort}
              activeSortKey={sortKey}
            >
              id
            </Sort>
            <Sort
              localKey="FIRST_NAME"
              onSort={onSort}
              activeSortKey={sortKey}
            >
              firstName
            </Sort>
            <Sort
              localKey="LAST_NAME"
              onSort={onSort}
              activeSortKey={sortKey}
            >
              lastName
            </Sort>
            <Sort
              localKey="EMAIL"
              onSort={onSort}
              activeSortKey={sortKey}
            >
              email
            </Sort>
            <Sort
              localKey="PHONE"
              onSort={onSort}
              activeSortKey={sortKey}
            >
              phone
            </Sort>
          </tr>
        </thead>
        <tbody onClick={(e) => setTrTargetInfo(e.target.closest("tr"))}>
          {additionForList?.map((item) => (
            <tr
              key={item.id + Math.random()}
            >
              <td className="tdId">{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
          {sortedList.map((item) => (
            <tr
              key={item.id + Math.random()}
              data-description={item.description}
              data-street-address={item.address.streetAddress}
              data-city={item.address.city}
              data-state={item.address.state}
              data-zip={item.address.zip}
            >
              <td className="tdId">{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
            )
          )}
        </tbody>
      </BootTable>
      {trTargetInfo && <TrInfo trInfo={trTargetInfo} />}
    </Container>
  )
};
