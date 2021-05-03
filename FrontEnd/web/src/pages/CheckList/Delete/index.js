import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

import "../styles.css";

function CheckListDeleteModal({
  showExcluir,
  closeModal,
  loading,
  DeletarTarefa
}) {
  return (
    <Modal show={showExcluir} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="font-weight-bolder m-0">
          Confirmar ação
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Deseja excluir esse Registro ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-option-no" onClick={closeModal}>
          Não
        </Button>
        <Button className="button-option-yes" onClick={DeletarTarefa}>
          {!loading ? <span>Sim</span> : <Spinner animation="border" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckListDeleteModal;
