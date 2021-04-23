using System;

namespace CheckListApplication.Api.Controllers.TarefaItens.DTOs
{
    public class TarefaItensUpdateDTO
    {
        public Guid ItemId { get; set; }
        public Guid TarefaId { get; set; }
        public string Descricao { get; set; }
    }
}
