import React from 'react';
import './index.css';

function TrInfo(props) {
  return (
    <div className="trInfo">
      <p>
        Выбран пользователь <b>{`${props.tr.cells[1].textContent} ${props.tr.cells[2].textContent}`}</b>
      </p>
      <p>
        Описание:<br />
        <textarea defaultValue={props.tr.dataset.description}>
        </textarea>
      </p>
      <p>
        Адрес проживания: <b>{props.tr.dataset.streetAddress}</b>
      </p>
      <p>
        Город: <b>{props.tr.dataset.city}</b>
      </p>
      <p>
        Провинция/штат: <b>{props.tr.dataset.state}</b>
      </p>
      <p>
        Индекс: <b>{props.tr.dataset.zip}</b>
      </p>
    </div>
  )
}

export default TrInfo;
