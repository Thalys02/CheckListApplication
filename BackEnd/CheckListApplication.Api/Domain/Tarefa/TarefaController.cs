using AutoMapper;
using CheckListApplication.Api.Controllers.Tarefa.DTOs;
using CheckListApplication.Api.Infrastructure.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListApplication.Api.Controllers.Tarefa
{

    [Route("Tarefa")]
    public class TarefaController : ControllerBase
    {
        private readonly CheckListContext context;
        private readonly IMapper mapper;
        public TarefaController(CheckListContext context,
                                IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult Obter()
        {
            return Ok(context.Set<Entities.Tarefa>().AsNoTracking());
        }

        [HttpGet("{id}")]
        public IActionResult Obter(Guid id)
        {
            return Ok(context.Set<Entities.Tarefa>().AsNoTracking().Where(w => w.Id == id));
        }


        [HttpPost("Criar")]
        public virtual async Task<IActionResult> Criar([FromBody] TarefaCreateDTO dto)
        {
            var entity = mapper.Map<Entities.Tarefa>(dto);

            context.Add(entity);

            await context.SaveChangesAsync();

            return Ok();
        }


        [HttpPut("Atualizar")]
        public virtual async Task<IActionResult> Atualizar([FromBody] TarefaUpdateDTO dto)
        {
            var entity = await context.Tarefa.FirstOrDefaultAsync(f => f.Id == dto.Id);

            entity.DataAlteracao = DateTime.Now;

            mapper.Map(dto, entity);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("Remover/{id}")]
        public virtual async Task<IActionResult> Remover(Guid id)
        {
            var entity = await context.Set<Entities.Tarefa>().FindAsync(id);

            context.Remove(entity);

            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
