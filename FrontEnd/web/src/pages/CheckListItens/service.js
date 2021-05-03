import baseApi from "../../services/baseApi";

export class CheckListItensService {

//TODO- CONCLUIR ENDPOINT DE CRIAR TAREFAITEM, EDITAR E REMOVER ISOLADAMENTE.
  
  static findByTarefaId(tarefaId){
    return baseApi.get(`TarefaItens/${tarefaId}`)
  }
  static removeAllTarefasItens(tarefaId){
    return baseApi.delete(`TarefaItens/RemoveAllItens/${tarefaId}`)
  }

  static create(data) {
    return baseApi.post("TarefaItens/Criar", data);
  }
  
  static update(data){
    return baseApi.put("TarefaItens/Atualizar", data);
  }

  static updateConclusionItem(data){
    return baseApi.put("TarefaItens/AtualizarConclusaoItem", data);
  }

  static delete(tarefaItemId){
    return baseApi.delete(`TarefaItens/Remover/${tarefaItemId}`);
  }

}
