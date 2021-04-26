using AutoMapper;
using CheckListApplication.Api.Controllers.TarefaItens.DTOs;
using CheckListApplication.Api.Infrastructure.Data.Context;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListApplication.Api.Controllers.TarefaItens
{
    //[ODataRoutePrefix("TarefaItens")]
    [Route("TarefaItens")]
    public class TarefaItensController : ControllerBase
    {
        private readonly CheckListContext context;
        private readonly IMapper mapper;
        public TarefaItensController(CheckListContext context,
                                IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult Obter()
        {
            return Ok(context.Set<Entities.TarefaItens>().AsNoTracking().AsQueryable());
        }


        [HttpPost("Criar")]
        public virtual async Task<IActionResult> Criar([FromBody] TarefaItensCreateDTO dto)
        {
            var entity = mapper.Map<Entities.TarefaItens>(dto);

            context.Add(entity);

            await context.SaveChangesAsync();

            return Ok();
        }


        [HttpPut("Atualizar")]
        public virtual async Task<IActionResult> Atualizar([FromBody] TarefaItensUpdateDTO dto)
        {
            var entity = await context.TarefaItens.FirstOrDefaultAsync(f => f.Id == dto.ItemId);

            entity.DataAlteracao = DateTime.Now;

            mapper.Map(dto, entity);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("Remover/{id}")]
        public virtual async Task<IActionResult> Remover(Guid id)
        {
            var entity = await context.Set<Entities.TarefaItens>().FindAsync(id);

            context.Remove(entity);

            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
