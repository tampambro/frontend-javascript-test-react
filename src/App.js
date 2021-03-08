import React, {useEffect, useState} from 'react';
import { Button, Spinner } from 'react-bootstrap';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import dataServies from './services/data';

import Table from './components/Table/index';
import Pagination from './components/Pagination';
import InputForSearch from './components/InputForSearch';
import AddForm from './components/AddForm';
import DataModal from './components/DataModal';
import ErrorModal from './components/ErrorModal';

export default function App() {
  const [fetchResult, setFetchResult] = useState([]);
  const [list, setList] = useState([]);
  const [additionForList, setAdditionForList] = useState([]);
  const [error, setError] = useState(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [dataSize, setDataSize] = useState('');
  const [isErrorModal, setIsErrorModal] = useState(false);

  const tableSize = 50;

  const listCreator = (fetchResult, pageNumber, tableSize) => {
    const startIndex = (tableSize * pageNumber) - tableSize;
    const endIndex = (tableSize * pageNumber);
    setList(fetchResult.slice(startIndex, endIndex));
  };

  const dataFetch = async (dataSizeAPI) => {
    setIsLoading(true);
      try {
        const data = await dataSizeAPI();
        setFetchResult(data);

        if (data.length > 50) {
          setPagesCount(Math.ceil(data.length / tableSize));
          listCreator(data, pageNumber, tableSize);
        } else {
          setList(data);
        }
      }
      catch (err) {
        setError(err);
      }
      finally {
        setIsLoading(false);
      }
  }

  useEffect(() => {
    setIsShowModal(true);
  }, []);

  useEffect(() => {
    if (dataSize === 'max') {
      dataFetch(dataServies.maxData);
    } else if (dataSize === 'min') {
      dataFetch(dataServies.minData);
    }
  }, [dataSize]);

  useEffect(() => {
    if (error) setIsErrorModal(true);
  }, [error]);

  useEffect(() => {
    listCreator(fetchResult, pageNumber, tableSize);
  }, [pageNumber]);

  return (
    <div className="App">
      <DataModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        setDataSize={setDataSize}
      />

      <ErrorModal
        err={error}
        setIsErrorModal={setIsErrorModal}
        isErrorModal={isErrorModal}
        setIsShowModal={setIsShowModal}
      />

      <div className="addFormWrapper">
        <InputForSearch />
        {isAddForm && <AddForm
          additionForList={additionForList}
          setAdditionForList={setAdditionForList}
        />}

        <Button
          id="btnForAddForm"
          variant="primary"
          onClick={() => setIsAddForm(!isAddForm)}
        >
          {isAddForm ? "Убрать форму" : "Добавить"}
        </Button>
      </div>

      {(!fetchResult.length && isLoading) && <Spinner className="spinner" variant="success" animation="grow" />}

      {(fetchResult.length > 50)
        && <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pagesCount={pagesCount}
        />
      }

      {(fetchResult.length && !isLoading)
        ? <Table
          list={list}
          pageNumber={pageNumber}
          isLoading={isLoading}
          additionForList={additionForList}
        />
        : <></>
      }

      {(fetchResult.length > 50)
        && <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pagesCount={pagesCount}
        />
      }
      </div>
  )
};

