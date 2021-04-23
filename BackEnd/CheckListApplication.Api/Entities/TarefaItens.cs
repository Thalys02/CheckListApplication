using CheckListApplication.Api.Entities.Base;
using System;

namespace CheckListApplication.Api.Entities
{
    public class TarefaItens : BaseEntity
    {
        public Guid TarefaId { get; set; }
        public string Descricao { get; set; }
        
        public Tarefa Tarefa { get; set; }
    }
}
