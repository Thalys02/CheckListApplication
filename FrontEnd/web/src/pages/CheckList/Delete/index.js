import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

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
        <Button variant="secondary" onClick={closeModal}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={DeletarTarefa}>
          {!loading ? <span>Remover</span> : <Spinner animation="border" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckListDeleteModal;
