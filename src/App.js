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

  const setPage = async (event) => {
    let target = event.target;
    let activePages = document.querySelectorAll(".active");

    if (target.closest("li")) {
      target = target.closest("li");
    }

    if (target.classList.contains("arrow-left")) {
      if (pageNumber === 1) {
        return;
      }
      activePages.forEach((activePage) => {
        let previousSibling = activePage.previousElementSibling;
        activePage.classList.remove("active");
        previousSibling.classList.add("active");

        setPageNumber(pageNumber - 1);
        listCreator(fetchResult, pageNumber - 1, tableSize);
      })
      return;
    }

    if (target.classList.contains("arrow-right")) {
      if (pageNumber === pagesCount) {
        return;
      }
      activePages.forEach((activePage) => {
        let nextSibling = activePage.nextElementSibling;
        activePage.classList.remove("active");
        nextSibling.classList.add("active");

        setPageNumber(pageNumber + 1);
        listCreator(fetchResult, pageNumber + 1, tableSize);
      })
      return;
    }

    if (target.classList.contains("page-item")) {
      activePages.forEach((activePage) => {
        activePage.classList.remove("active");
        target.classList.add("active");
        setPageNumber(parseInt(target.textContent, 10));
        listCreator(fetchResult, parseInt(target.textContent, 10), tableSize);
      })
      return;
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
  }, [error])

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
            setPage={setPage}
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
            setPage={setPage}
            pagesCount={pagesCount}
          />
      }
      </div>
  )
};

