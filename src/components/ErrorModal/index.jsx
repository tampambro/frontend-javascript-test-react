import React from "react";
import { Modal, Button } from "react-bootstrap";

import "./index.css";

export default function ErrorModal({ err, isErrorModal, setIsErrorModal, setIsShowModal }) {
  return (
    <Modal
      show={isErrorModal}
      onHide={() => setIsErrorModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="errTitle">Error</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Что-то пошло не так: {err?.message}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          setIsErrorModal(false);
          setIsShowModal(true);
        }}
        >
          Повторить запрос
        </Button>
      </Modal.Footer>
    </Modal>
  )
};
