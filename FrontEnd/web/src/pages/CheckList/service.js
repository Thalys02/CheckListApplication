import baseApi from "../../services/baseApi";

export class CheckListService {

  static findAll(){
    return baseApi.get("Tarefa");
  }
  
  static findById(tarefaId){
    return baseApi.get(`Tarefa/${tarefaId}`)
  }

  static create(data) {
    return baseApi.post("Tarefa/Criar", data);
  }
  
  static update(data){
    return baseApi.put("Tarefa/Atualizar", data);
  }

  static delete(tarefaId){
    return baseApi.delete(`Tarefa/Remover/${tarefaId}`);
  }

}
