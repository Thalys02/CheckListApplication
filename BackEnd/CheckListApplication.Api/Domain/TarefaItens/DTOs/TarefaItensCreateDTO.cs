using System;

namespace CheckListApplication.Api.Controllers.TarefaItens.DTOs
{
    public class TarefaItensCreateDTO
    {
        public Guid TarefaId { get; set; }
        public string Descricao { get; set; }
        public bool Concluido { get; set; }
    }
}
