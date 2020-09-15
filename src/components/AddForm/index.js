import React from 'react';
import './index.css';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "id": "",
      "firstName": "",
      "lastName": "",
      "email": "",
      "phone": ""
    }

    this.handlerNewObj = this.handlerNewObj.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  async handlerNewObj(e) {
    const nameField =  e.target.id;
    await this.setState({[nameField]: e.target.value});
    await this.checkFields(this.state)
  }

  checkFields(fields) {
    let fullIndicator = true;
    const addBtn = document.getElementById("addBtn");

    for (let field in fields) {
      if (fields[field] == false) {
        fullIndicator = false;
        break;
      } else {
        continue;
      }
    }

    if (fullIndicator) {
      addBtn.removeAttribute("disabled");
    } else {
      addBtn.setAttribute("disabled", true);
    }
  }

  render() {
    const {
      resultUpdate,
    } = this.props;

    return (
      <form
        className="needs-validation mb-3"
        onSubmit={(e) => {
          resultUpdate(this.state);
          this.setState({
            "id": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "phone": ""
          });
          const addBtn = document.getElementById("addBtn");
          addBtn.setAttribute("disabled", true);
          e.preventDefault();
        }}
        noValidate
      >
        <div
          className="form-row"
        >
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom01">
              id
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              placeholder="id"
              value={this.state.id}
              onChange={this.handlerNewObj}
              required
            />
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom02">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.handlerNewObj}
              required
            />
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="validationCustom03">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.handlerNewObj}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid Last Name.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label
              htmlFor="validationCustom04"
            >
              email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="email"
              aria-describedby="inputGroupPrepend"
              value={this.state.email}
              onChange={this.handlerNewObj}
              required
            />
            <div className="invalid-feedback">
              Please choose a email.
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label
              htmlFor="validationCustom05"
            >
              phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.handlerNewObj}
              required
            />
            <div className="invalid-feedback">
              Please provide a valid phone.
            </div>
          </div>
        </div>
      <button
        id="addBtn"
        className="btn btn-primary"
        type="submit"
        disabled
      >
        Подтвердить
      </button>
    </form>
    )
  }
}

export default AddForm;
