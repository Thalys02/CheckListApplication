using System;

namespace CheckListApplication.Api.Controllers.Tarefa.DTOs
{
    public class TarefaUpdateDTO
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string Usuario { get; set; }

    }
}
