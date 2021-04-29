
import React, { useState,useEffect } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";

import {CheckListService} from '../service'

function CheckListForm({showModal,closeModal,fetchTarefas,loading}){
  const [titulo, setTitulo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [label, setLabel] = useState("Adicionar Tarefa");

  const [error, setError] = useState("");
  const { addToast } = useToasts();
  
  const params = useParams();

  const resetFields = () => {
    setTitulo("");
    setUsuario("");
  };

  async function handleSave() {
    const data = {
      id: params.id ? params.id : "",
      titulo,
      usuario,
    };
    if(params.id){
      try {
        await CheckListService.update(data);
        closeModal();
        addToast("Tarefa atualizada com sucesso.", { appearance: "success" });
        resetFields();
      } catch (error) {
        addToast("Ocorreu um erro na atualização da tarefa.", {
          appearance: "error",
        });
      } finally {
        fetchTarefas();
      }
    }else{
      try {
        await CheckListService.create(data);
        closeModal();
        addToast("Tarefa criada com sucesso.", { appearance: "success" });
        resetFields();
      } catch (error) {
        addToast("Ocorreu um erro na criação da tarefa.", {
          appearance: "error",
        });
      } finally {
        fetchTarefas();
      }
    }
    
  }
  useEffect(() => {
    if (params.id && params.id !== "itens") {
      setLabel("Editar Tarefa");

      CheckListService.findById(params.id).then(({ data }) => {
        const tarefa = data[0];
        setTitulo(tarefa.titulo);
        setUsuario(tarefa.usuario);
      });
    } else {
      resetFields();
    }
  }, [params]);

  return (
    <Modal size="lg" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title className="font-weight-bolder">
          {label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          show={error !== ""}
          variant="danger"
          onClose={() => setError("")}
          dismissible
        >
          {error}
        </Alert>
        <Form.Group>
          <Form.Label className="d-block">*Titulo</Form.Label>
          <Form.Control
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={200}
          />
          <div className="d-flex justify-content-end mb-1">
            <span className="text-muted">
              máximo de caracteres: {titulo.length}/200
            </span>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>*Usuário</Form.Label>
          <Form.Control
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            maxLength={100}
          />
          <div className="d-flex justify-content-end mb-1">
            <span className="text-muted">
              máximo de caracteres: {usuario.length}/100
            </span>
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} variant="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="success">
          {!loading ? "Salvar" : <Spinner animation="border" />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckListForm;