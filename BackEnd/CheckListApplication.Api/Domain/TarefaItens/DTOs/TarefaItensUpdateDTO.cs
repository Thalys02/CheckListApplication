using CheckListApplication.Api.Domain.TarefaItens.DTOs;
using System.Collections.Generic;

namespace CheckListApplication.Api.Controllers.TarefaItens.DTOs
{
    public class TarefaItensUpdateDTO
    {
        public List<TarefaItensAtualizarDTO> Itens { get; set; }
    }
}
