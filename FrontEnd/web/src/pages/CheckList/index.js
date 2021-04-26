import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FiX, FiUser,FiEdit } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { useToasts } from "react-toast-notifications";
import {formatDate} from "../../helpers/date"
import CheckListForm from "../CheckList/Form"
import CheckListDeleteModal from "./Delete"
import { CheckListService } from "./service";

import "./styles.css";

function CheckList(){
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada,setTarefaSelecionada] = useState([])

  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const open = () => setShow(true);
  const close = () => setShow(false);

  const [showExcluir, setShowExcluir] = useState(false);
  const closeModalExcluir = () => setShowExcluir(false);


  async function fetchTarefas(){
    try {
      const response = await CheckListService.findAll();
      setTarefas(response.data);
    } catch (error) {
      addToast("Ocorreu um error ao retornar as tarefas.", {
        appearance: "error",
      });
    }
  }

  async function DeleteTarefa(){
    setLoading(true);
    try {
        await CheckListService.delete(tarefaSelecionada.id);
      
      addToast('Tarefa removida com sucesso.', {
        appearance: "success"
      });
      closeModalExcluir();
      fetchTarefas();
    } catch (err) {
      addToast('Ocorreu um erro na remoção da tarefa.', {
        appearance: "error"
      });
    } finally {
      setLoading(false);
      setTarefaSelecionada([])
    }
  }
  function openModalExclusao(tarefa){
    setShowExcluir(true)
    setTarefaSelecionada(tarefa)
  }

  function openUpdateTarefa(tarefaId){
    setShow(true)
    history.push(`/${tarefaId}`);
  }

  function openModalAddTarefa(){
    open();
    history.push("/");
  }
  function openEditItems(tarefaId){
    debugger
    history.push(`/itens/${tarefaId}`)
  }

  useEffect(() => {
    fetchTarefas();
  }, []);

  return (
    <section>
      <div className="checklist-count">Tarefas ({tarefas.length})</div>
      <div className="checkList-container">
        {tarefas.map((tarefa) => (
          <div title="Editar tarefa" className="checkList-element">
            <div
              id={tarefa.id}
              className="checkList-description"
              onClick={() => openEditItems(tarefa.id)}
            >
              <h3>
                {tarefa.titulo}
                <span className="protocolo-span">#00{tarefa.protocolo}</span>
              </h3>

              <span className="usuario-span">
                <FiUser />
                {tarefa.usuario}
              </span>
              <br />
              <span className="dataCriacao-span">
                <IoIosTimer />
                {formatDate(tarefa.dataCriacao)}
              </span>
            </div>
            <button
              title="Remover tarefa"
              className="button-close"
              onClick={() => openModalExclusao(tarefa)}
            >
              <FiX />
            </button>
            <div></div>
            <button
              title="Editar tarefa"
              className="button-edit"
              onClick={() => openUpdateTarefa(tarefa.id)}
            >
              <FiEdit />
            </button>
          </div>
        ))}
      </div>
      <footer>
        <button className="button-add-checklist" onClick={openModalAddTarefa}>
          NOVO CHECKLIST
        </button>
      </footer>

      <CheckListForm
        showModal={show}
        closeModal={close}
        fetchTarefas={fetchTarefas}
        loading={loading}
      />

      <CheckListDeleteModal
        DeletarTarefa={DeleteTarefa}
        loading={loading}
        showExcluir={showExcluir}
        closeModal={closeModalExcluir}
      />
    </section>
  );
}

export default CheckList;