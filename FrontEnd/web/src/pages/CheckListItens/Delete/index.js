import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

function CheckListItensDeleteModal({
  showExcluir,
  closeModal,
  loading,
  DeletarCheckListItens
}) {
  return (
    <Modal show={showExcluir} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="font-weight-bolder m-0">
          Excluir todo checklist?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Não será possível desfazer esta ação!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          NÃO
        </Button>
        <Button variant="danger" onClick={DeletarCheckListItens}>
          {!loading ? <span>SIM</span> : <Spinner animation="border" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckListItensDeleteModal;
