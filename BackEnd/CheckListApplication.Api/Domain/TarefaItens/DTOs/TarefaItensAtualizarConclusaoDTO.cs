using System;

namespace CheckListApplication.Api.Domain.TarefaItens.DTOs
{
    public class TarefaItensAtualizarConclusaoDTO
    {
        public Guid ItemId { get; set; }
        public bool Concluido { get; set; }
    }
}
