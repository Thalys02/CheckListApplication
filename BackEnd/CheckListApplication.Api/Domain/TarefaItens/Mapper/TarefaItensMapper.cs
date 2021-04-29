using AutoMapper;
using CheckListApplication.Api.Controllers.TarefaItens.DTOs;

namespace CheckListApplication.Api.Controllers.TarefaItens.Mapper
{
    public class TarefaItensMapper : Profile
    {
        public TarefaItensMapper()
        {
            CreateMap<Entities.TarefaItens, TarefaItensCreateDTO>().ReverseMap();
            CreateMap<Entities.TarefaItens, TarefaItensUpdateDTO>().ReverseMap();
        }
    }
}
