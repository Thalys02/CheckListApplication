using CheckListApplication.Api.Entities.Base;
using System.Collections.Generic;

namespace CheckListApplication.Api.Entities
{
    public class Tarefa : BaseEntity
    {
        public string Titulo { get; set; }
        public string Usuario { get; set; }
        public ICollection<TarefaItens> Itens { get; set; } = new List<TarefaItens>();
    }
}
