import { FiArrowLeft, FiCheckSquare } from "react-icons/fi";
import { FiX} from "react-icons/fi";
import { Form, Spinner, Alert } from "react-bootstrap";
import React, { useState ,useEffect} from "react";
import { useToasts } from "react-toast-notifications";
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";

import {CheckListItensService} from './service'

import "./styles.css";
import CheckListItensDeleteModal from "./Delete";

function CheckListItens(){
  const params = useParams();
  const [tarefaItens, setTarefaItens] = useState([]);
  const [tarefaItemConcluido,setTarefaItemConcluido] = useState([]);
  const [currentProgressPercent,setCurrentProgressPercent] = useState(0);
  const [tarefaItemDescricao,setTarefaItemDescricao] = useState("")

  const [showExcluir, setShowExcluir] = useState(false);
  const closeModalExcluir = () => setShowExcluir(false);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  let progressBar =0;
  let currentBar = 0;
  // async function handleSaveItens() {
  //   const data = {
  //     id: params.id ? params.id : "",
  //     titulo,
  //     usuario,
  //   };
  //   if (params.id) {
  //     try {
  //       await CheckListService.update(data);
  //       addToast("Tarefa atualizada com sucesso.", { appearance: "success" });
  //     } catch (error) {
  //       addToast("Ocorreu um erro na atualização da tarefa.", {
  //         appearance: "error",
  //       });
  //     } finally {
  //       fetchTarefasItens();
  //     }
  //   } else {
  //     try {
  //       await CheckListService.create(data);
  //       addToast("Tarefa criada com sucesso.", { appearance: "success" });
  //     } catch (error) {
  //       addToast("Ocorreu um erro na criação da tarefa.", {
  //         appearance: "error",
  //       });
  //     } finally {
  //       fetchTarefasItens();
  //     }
  //   }
  // }

  async function fetchTarefasItens(){
    debugger
    try {
      CheckListItensService.findByTarefaId(params.id).then(({ data }) => {
        const tarefaItens = data;
        console.log(tarefaItens)
        setTarefaItens(tarefaItens);
      });
    } catch (error) {
      addToast("Ocorreu um error ao retornar as tarefasItens.", {
        appearance: "error",
      });
    }
  }
  async function DeletarCheckListItens(){
    debugger
    setLoading(true);
    try {
      CheckListItensService.removeAllTarefasItens(params.id);
      addToast('TarefaItens removida com sucesso.', {
        appearance: "success"
      });
      closeModalExcluir();
      fetchTarefasItens();
    } catch (error) {
      addToast("Ocorreu um error na remoção das tarefasItens.", {
        appearance: "error",
      });
    }finally{
      setLoading(true);
      
    }
  }
  function openModalExclusaoTarefaItens(){
    setShowExcluir(true)
  }


  //TODO-CORRIGIR A LOGICA DE SELEÇÃO DO CHECKBOX
  const handleCheck = (event) => {
    setTarefaItemConcluido(event.target.checked)
  };

  useEffect(() => {
    fetchTarefasItens();
  }, []);

  useEffect(() => {
    debugger
    if(tarefaItens.length!==0){
      function checkTarefaItemConcluido(tarefaItem) {
        return tarefaItem.concluido ===true;
      }
      progressBar =  tarefaItens.length;
      currentBar = tarefaItens.filter(checkTarefaItemConcluido).length
      if(currentBar>0){
        setCurrentProgressPercent((currentBar*100)/progressBar);
      }
      
    }
  }, [tarefaItens]);

  return (
    <>
      <div className="title-header">
        <Link to="/">
          <FiArrowLeft className="arrow-left" />
        </Link>

        {tarefaItens[0] && (
          <h1>
            {tarefaItens[0].tarefaTitulo}
            {tarefaItens[0].tarefaProtocolo <= 10
              ? "#00" + tarefaItens[0].tarefaProtocolo
              : "#0" + tarefaItens[0].tarefaProtocolo}
          </h1>
        )}
      </div>
      <div className="title-itens">
        <FiCheckSquare className="check-square" />
        <h3>Itens</h3>
      </div>
      <section>
        <div className="check-list-bar">
          <div
            className="progress-bar"
            style={{ width: `${currentProgressPercent}%` }}
          ></div>
          <span className="current-bar">{currentProgressPercent.toPrecision(3)}%</span>
        </div>
        {tarefaItens.map((tarefaItem, index) => (
          <div key={index} class="control-group">
            <label class="control control-checkbox" onClick={() => ""}>
              {tarefaItem.descricao}
              <input
                type="checkbox"
                checked={tarefaItemConcluido}
                onChange={(event) => handleCheck(event)}
              />
              <div class="control_indicator"></div>
            </label>
            <button
              id={tarefaItem.id}
              title="Remover tarefa"
              className="button-remove-tarefaItem"
              onClick={() => ""}
            >
              <FiX />
            </button>
          </div>
        ))}
        <div className="add-item">
        <Form.Group>
          <Form.Label
            className="d-block"
            title="Adicionar item..."
          ></Form.Label>
          <Form.Control
            value={tarefaItemDescricao}
            onChange={(e) => setTarefaItemDescricao(e.target.value)}
            maxLength={200}
          />
          <div className="d-flex justify-content-end mb-1">
            <span className="text-muted">
              máximo de caracteres: {tarefaItemDescricao.length}/500
            </span>
          </div>
        </Form.Group>
        </div>
        
        <footer>
          <button className="button-delete-checklistIten" onClick={openModalExclusaoTarefaItens}>
            EXCLUIR
          </button>
          <button className="button-save-checklistIten" onClick={""}>
            SALVAR
          </button>
        </footer>

        <CheckListItensDeleteModal
         showExcluir={showExcluir}
         closeModal={closeModalExcluir}
         loading={loading}
         DeletarCheckListItens={DeletarCheckListItens}
        />
      </section>
    </> 
  );
}

export default CheckListItens;