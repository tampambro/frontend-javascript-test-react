import React from "react";
import { Modal, Button } from 'react-bootstrap';

export default function DataModal({ isShowModal, setIsShowModal, setDataSize }) {
  const clickHandler = (dataSize) => {
    setDataSize(dataSize);
    setIsShowModal(false);
  };

  return (
    <Modal
      show={isShowModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Загрузка данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Какой размер данных Вы хотите запросить?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => clickHandler('min')}>
          Минимальный
        </Button>
        <Button variant="success" onClick={() => clickHandler('max')}>
          Большой
        </Button>
      </Modal.Footer>
    </Modal>
  )
};
