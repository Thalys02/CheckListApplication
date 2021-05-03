using System;

namespace CheckListApplication.Api.Domain.TarefaItens.DTOs
{
    public class TarefaItensAtualizarDTO
    {
        public Guid Id { get; set; }
        public Guid TarefaId { get; set; }
        public string Descricao { get; set; }
        public bool Concluido { get; set; }
    }
}
