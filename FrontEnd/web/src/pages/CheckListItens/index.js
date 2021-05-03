import { FiArrowLeft, FiCheckSquare } from "react-icons/fi";
import { FiX} from "react-icons/fi";
import { Form} from "react-bootstrap";
import React, { useState ,useEffect} from "react";
import { useToasts } from "react-toast-notifications";
import {Link} from 'react-router-dom';
import { useParams } from "react-router-dom";

import {CheckListItensService} from './service'
import { CheckListService } from "../CheckList/service";

import "./styles.css";
import CheckListItensDeleteModal from "./Delete";
import CheckListItensUpdateModal from "./Update";


function CheckListItens(){
  const params = useParams();
  const [tarefaItens, setTarefaItens] = useState([]);
  const [tarefa, setTarefa] = useState([]);
  const [currentProgressPercent, setCurrentProgressPercent] = useState(0);
  const [tarefaItemDescricao, setTarefaItemDescricao] = useState("");

  const [showExcluir, setShowExcluir] = useState(false);
  const closeModalExcluir = () => setShowExcluir(false);

  const [showUpdate,setShowUpdate]= useState(false);
  const closeModalUpdate = () => setShowUpdate(false);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  let progressBar = 0;
  let currentBar = 0;

  const resetFields = () => {
    setTarefaItemDescricao("");
  };

  async function handleSaveItens() {
    const data = {
      tarefaId: params.id ? params.id : "",
      descricao: tarefaItemDescricao,
    };
    if(tarefaItemDescricao.length === 0 && showUpdate === false){
      return setShowUpdate(true);
    }
    if(!showUpdate){
      try {
        await CheckListItensService.create(data);
        addToast("TarefaItem criada com sucesso.", { appearance: "success" });
        resetFields();
      } catch (error) {
        addToast(error.response.data.validacaoErros[0], {
          appearance: "error",
        });
      } finally {
        fetchTarefasItens();
      }
    }else{
      try {
        const data ={
          itens:[
            ...tarefaItens
          ]
        }
        await CheckListItensService.update(data);
        addToast("Itens atualizados com sucesso.", { appearance: "success" });
        resetFields();
      } catch (error) {
        addToast("Ocorreu um erro na atualização da lista de itens.", {
          appearance: "error",
        });
      } finally {
        fetchTarefasItens();
        closeModalUpdate();
      }
    }
  
  }

  async function fetchTarefasItens() {
    try {
      await CheckListItensService.findByTarefaId(params.id).then(({ data }) => {
        if(data.length === 0){
          setCurrentProgressPercent(0);
        }
        const tarefaItens = data;
        setTarefaItens(tarefaItens);
      });
    } catch (error) {
      addToast("Ocorreu um error ao retornar as tarefasItens.", {
        appearance: "error",
      });
    }
  }

  async function fetchTarefas() {
    try {
      const response = await CheckListService.findById(params.id);
      setTarefa(response.data);
    } catch (error) {
      addToast("Ocorreu um error ao retornar as tarefas.", {
        appearance: "error",
      });
    }
  }
  async function DeletarCheckListItens() {
    setLoading(true);
    try {
      await CheckListItensService.removeAllTarefasItens(params.id);
      addToast("TarefaItens removida com sucesso.", {
        appearance: "success",
      });
    } catch (error) {
      addToast("Ocorreu um error na remoção das tarefasItens.", {
        appearance: "error",
      });
    } finally {
      setLoading(true);
      fetchTarefasItens();
      closeModalExcluir();
    }
  }
  function openModalExclusaoTarefaItens() {
    setShowExcluir(true);
  }

  async function deleteTarefaItem(tarefaItemId) {
    try {
      await CheckListItensService.delete(tarefaItemId);
      addToast("Item removido com sucesso.", {
        appearance: "success",
      });
    } catch (error) {
      addToast("Ocorreu um erro ao tentar excluir o item!", {
        appearance: "error",
      });
    } finally {
      fetchTarefasItens();
    }
  }

  async function handleCheck (event, tarefaItemId){
    const data = {
      ItemId: tarefaItemId,
      Concluido: event.target.checked,
    };
    try {
      await CheckListItensService.updateConclusionItem(data);
      //Adicionar apenas se quiser exibir retorno de sucesso na conclusão de um item.
      // addToast("TarefaItem concluida com sucesso.", { appearance: "success" });
    } catch (error) {
      addToast(error.response.data.validacaoErros[0], {
        appearance: "error",
      });
    } finally {
      fetchTarefasItens();
    }
  };

  function updateStatusProgressBar(){
    function checkTarefaItemConcluido(tarefaItem) {
      return tarefaItem.concluido === true ? tarefaItem : null;
    }
    progressBar = tarefaItens.length;
    currentBar = tarefaItens.filter(checkTarefaItemConcluido).length;
    if (currentBar > 0) {
      setCurrentProgressPercent((currentBar * 100) / progressBar);
    } else {
      setCurrentProgressPercent(0);
    }
  }

  function addUpdateItens(tafetaItemDescricao,taferaItemId){
    setTarefaItens(
      [...tarefaItens].map((object) => {
        if (object.id === taferaItemId) {
          return {
            ...object,
            descricao: tafetaItemDescricao,
          };
        } else {
          return object;
        }
      })
    );
  }

  useEffect(() => {
    fetchTarefasItens();
  }, []);

  useEffect(() => {
    fetchTarefas();
  }, [params.id]);

  useEffect(() => {
    if (tarefaItens.length !== 0) {
      updateStatusProgressBar();
    }
  }, [tarefaItens]);

  return (
    <>
      <div className="title-header">
        <Link to="/">
          <FiArrowLeft className="arrow-left" />
        </Link>

        {tarefa[0] && (
          <h1>
            {tarefa[0].titulo}
            {tarefa[0].protocolo <= 10
              ? "#00" + tarefa[0].protocolo
              : "#0" + tarefa[0].protocolo}
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
          <span className="current-bar">
            {currentProgressPercent.toPrecision(3)}%
          </span>
        </div>
        {tarefaItens.map((tarefaItem, index) => (
          <div key={index} class="control-group">
            <label class="control control-checkbox">
              <input
                type="checkbox"
                checked={tarefaItem.concluido}
                onChange={(event) => handleCheck(event, tarefaItem.id)}
              />
              <div class="control_indicator"></div>
            </label>
            <div className="input-tarefaItem-description">
              <Form.Group>
                <Form.Control
                  value={tarefaItem.descricao}
                  onChange={(e) =>
                    addUpdateItens(e.target.value, tarefaItem.id)
                  }
                  maxLength={500}
                />
              </Form.Group>
            </div>

            <button
              id={tarefaItem.id}
              title="Remover tarefa"
              className="button-remove-tarefaItem"
              onClick={() => deleteTarefaItem(tarefaItem.id)}
            >
              <FiX />
            </button>
          </div>
        ))}
        <div className="add-item">
          <Form.Group>
            <Form.Label
              className="d-block"
            ></Form.Label>
            <Form.Control
              placeholder="Adicionar item..."
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
          <button
            className="button-delete-checklistIten"
            onClick={openModalExclusaoTarefaItens}
          >
            EXCLUIR
          </button>
          <button
            className="button-save-checklistIten"
            onClick={handleSaveItens}
          >
            SALVAR
          </button>
        </footer>

        <CheckListItensDeleteModal
          showExcluir={showExcluir}
          closeModal={closeModalExcluir}
          loading={loading}
          DeletarCheckListItens={DeletarCheckListItens}
        />

        <CheckListItensUpdateModal
        showUpdate={showUpdate}
        closeModal={closeModalUpdate}
        loading={loading}
        handleSaveItens={handleSaveItens}
        />
      </section>
    </>
  );
}

export default CheckListItens;