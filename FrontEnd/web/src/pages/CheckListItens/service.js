import baseApi from "../../services/baseApi";

export class CheckListItensService {

//TODO- CONCLUIR ENDPOINT DE CRIAR TAREFAITEM, EDITAR E REMOVER ISOLADAMENTE.
  
  static findByTarefaId(tarefaId){
    return baseApi.get(`TarefaItens/${tarefaId}`)
  }
  static removeAllTarefasItens(tarefaId){
    return baseApi.delete(`TarefaItens/RemoveAllItens/${tarefaId}`)
  }

//   static create(data) {
//     return baseApi.post("Tarefa/Criar", data);
//   }
  
//   static update(data){
//     return baseApi.put("Tarefa/Atualizar", data);
//   }

//   static delete(tarefaId){
//     return baseApi.delete(`Tarefa/Remover/${tarefaId}`);
//   }

}
