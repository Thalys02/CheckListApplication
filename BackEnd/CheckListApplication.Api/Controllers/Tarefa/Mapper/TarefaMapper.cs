using AutoMapper;
using CheckListApplication.Api.Controllers.Tarefa.DTOs;

namespace CheckListApplication.Api.Controllers.Tarefa.Mapper
{
    public class TarefaMapper : Profile
    {
        public TarefaMapper()
        {
            CreateMap<Entities.Tarefa, TarefaCreateDTO>().ReverseMap();
            CreateMap<Entities.Tarefa, TarefaUpdateDTO>().ReverseMap();
        }
    }
}
