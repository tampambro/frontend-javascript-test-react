import React from 'react';

import './index.css';

export default function TrInfo({trInfo}) {
  return (
    <div className="trInfo">
      <p>
        Выбран пользователь <b>{`${trInfo.cells[1].textContent} ${trInfo.cells[2].textContent}`}</b>
      </p>
      <p>
        Описание:<br />
        <textarea defaultValue={trInfo.dataset.description} />
      </p>
      <p>
        Адрес проживания: <b>{trInfo.dataset.streetAddress}</b>
      </p>
      <p>
        Город: <b>{trInfo.dataset.city}</b>
      </p>
      <p>
        Провинция/штат: <b>{trInfo.dataset.state}</b>
      </p>
      <p>
        Индекс: <b>{trInfo.dataset.zip}</b>
      </p>
    </div>
  )
};
