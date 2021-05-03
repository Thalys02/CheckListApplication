import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

import "./styles.css";

function CheckListItensUpdateModal({
  showUpdate,
  closeModal,
  loading,
  handleSaveItens
}) {
  return (
    <Modal show={showUpdate} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="font-weight-bolder m-0">
          Salvar o checklist?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Não será possível desfazer esta ação!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-option-no" variant="secondary" onClick={closeModal}>
          NÃO
        </Button>
        <Button className="button-option-yes" variant="danger" onClick={handleSaveItens}>
          {!loading ? <span>SIM</span> : <Spinner animation="border" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckListItensUpdateModal;
