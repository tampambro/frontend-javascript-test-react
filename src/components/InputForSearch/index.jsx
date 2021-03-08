import React, { useState } from 'react';
import { InputGroup, Button, FormControl, Form } from 'react-bootstrap';

import './index.css';

export default function InputForSearch() {
  const [value, setValue] = useState('');

  const filterSearch = (v) => {
    const tbody = document.querySelector("tbody");
    const rows = tbody.rows;

    for (let row of rows) {
      row.className = "";
      let cells = row.cells;
      let indicator = true;

      for (let cell of cells) {
        if (cell.textContent.indexOf(v) === -1) {
          continue;
        } else {
          indicator = !indicator;
          break;
        }
      }

      if (indicator) {
        row.className = "hidden";
      }
    }
  }

  return (
    <Form className="filter"
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   filterSearch();
      // }}
    >
      <InputGroup>
        <FormControl
          placeholder="Фильтр"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            filterSearch(e.target.value);
          }}
          // onKeyDown={(e) => e.key === 'Enter' ? filterSearch() : null }
        />
        {/* <InputGroup.Append>
          <Button variant="outline-primary" type="submit">
            Найти
          </Button>
        </InputGroup.Append> */}
      </InputGroup>
    </Form>
  )
}
