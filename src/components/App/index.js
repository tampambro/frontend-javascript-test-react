import React from 'react';
import axios from 'axios';

import './index.css';

import Table from '../Table';
import Pagination from '../Pagination';
import Loading from '../Loading';
import InputForSearch from '../InputForSearch';
import AddForm from '../AddForm';

const withLoading = (Component) => ({isLoading, ...props}) => {
  return (isLoading) ? <Loading /> : <Component {...props} />;
};

const TableWithLoading = withLoading(Table);

class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      list: [],
      error: null,
      tableSize: 50,
      pagesCount: 0,
      pageNumber: 1,
      miniData: "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
      maxData: "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
      isBiggerThanTable: false,
      isLoading: false,
      additionForList: [],
      isAddForm: false,
    }

    this.setList = this.setList.bind(this);
    this.setPage = this.setPage.bind(this);
    this.onSort = this.onSort.bind(this);
    this.dataRequest = this.dataRequest.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.resultUpdate = this.resultUpdate.bind(this);
  }

  setList(result, pageNumber, tableSize) {
    // console.log(result, pageNumber, tableSize)

    const startIndex = (tableSize * pageNumber) - tableSize;
    const endIndex = (tableSize * pageNumber);

    // console.log(startIndex, endIndex)

    this.setState({list: result.slice(startIndex, endIndex)});
  }

  async setPage(event) {
    let target = event.target;
    let activePage = document.querySelector(".active");

    if (target.closest("li")) {
      target = target.closest("li");
    }

    if (target.classList.contains("number")) {
      activePage.classList.remove("active");
      target.classList.add("active");
      await this.setState({pageNumber: +target.textContent});
      await this.setList(this.state.result, +target.textContent, this.state.tableSize);
    }

    if (target.classList.contains("arrow-left")) {
      if (activePage.textContent == 1) {
        return;
      }

      let previousSibling = activePage.previousElementSibling;
      activePage.classList.remove("active");
      previousSibling.classList.add("active")

      await this.setState({pageNumber: --this.state.pageNumber})
      await this.setList(this.state.result, this.state.pageNumber, this.state.tableSize);
    }

    if (target.classList.contains("arrow-right")) {
      if (activePage.textContent == this.state.pagesCount) {
        return;
      }

      let nextSibling = activePage.nextElementSibling;
      activePage.classList.remove("active");
      nextSibling.classList.add("active")

      await this.setState({pageNumber: ++this.state.pageNumber})
      await this.setList(this.state.result, this.state.pageNumber, this.state.tableSize);
    }
  }

  onSort(sortKey) {
    this.setState({sortKey});
  }

  dataRequest() {
    let isMaxData = window.confirm("Вы хотите загрузить большой пакет данных?");
    let data;

    if (isMaxData) {
      data =  this.state.maxData;
    } else {
      data = this.state.miniData;
    }

    this.setState({isLoading: true})

    axios(`${data}`)
    .then((result) => {
      if (this._isMounted) {
        this.setState({result: result.data, isLoading: false});
        return result.data;
      }
    })
    .then((result) => {
      if (this._isMounted) {
        if (result.length > 50) {
          this.setState({isBiggerThanTable: true});
          return result;
        } else {
          this.setState({list: result});
        }
      }
    })
    .then((result) => {
      if (this._isMounted) {
        if (this.state.isBiggerThanTable) {
          this.setState({
            pagesCount: Math.ceil(result.length / this.state.tableSize),
            isLoading: false});
          this.setList(this.state.result, this.state.pageNumber, this.state.tableSize);
        }
        return result;
      }
    })
    .catch((error) => this._isMounted && this.setState(error));
  }

  showAddForm(e) {
    if (!this.state.isAddForm) {
      this.setState({isAddForm: true});
      e.target.textContent = "Скрыть";
      const form = document.querySelector(".needs-validation");
      form.style.display = "block";
    } else {
      this.setState({isAddForm: false});
      e.target.textContent = "Добавить";
      const form = document.querySelector(".needs-validation");
      form.style.display = "none";
    }

  }

  resultUpdate(newItem) {
    let arr = this.state.additionForList;
    arr.unshift(newItem);
    this.setState({additionForList: arr});
  }

  componentDidMount() {
    this._isMounted = true;

    this.dataRequest();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      result,
      pagesCount,
      pageNumber,
      list,
      isLoading,
      additionForList,
      error
    } = this.state;

    // console.log(list);

    return (
      <div className="App">
        <InputForSearch />
        <AddForm
          additionForList={additionForList}
          resultUpdate={this.resultUpdate}
        />

        <button
          id="btnForAddForm"
          type="button"
          className="btn btn-primary mb-3"
          onClick={this.showAddForm}
        >
          Добавить
        </button>

        {error
        && alert(`Что-то пошло не так: ${this.state.error}`)}

        {result
        && <TableWithLoading
          list={list}
          pageNumber={pageNumber}
          isLoading={isLoading}
          additionForList={additionForList}
        />
        }

        {(result.length > 50)
        && <Pagination
            setPage={this.setPage}
            pagesCount={pagesCount}
            pageNumber={pageNumber}
          />
        }
      </div>
    );
  }
}

export default App;
