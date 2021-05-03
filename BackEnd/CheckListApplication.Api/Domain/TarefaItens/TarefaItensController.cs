using AutoMapper;
using CheckListApplication.Api.Controllers.TarefaItens.DTOs;
using CheckListApplication.Api.Domain.TarefaItens.DTOs;
using CheckListApplication.Api.Infrastructure.Data.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListApplication.Api.Controllers.TarefaItens
{

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
            return Ok(context.Set<Entities.TarefaItens>().AsNoTracking());
        }

        [HttpGet("{tarefaId}")]
        public IActionResult Obter(Guid tarefaId)
        {
            return Ok(context.Set<Entities.TarefaItens>().Include(i => i.Tarefa)
                                                         .Where(w => w.TarefaId == tarefaId)
                                                         .Select(tarefaItem=>  new
                                                         {
                                                             tarefaItem.Id,
                                                             tarefaItem.Descricao,
                                                             tarefaItem.Concluido,
                                                             tarefaId = tarefaItem.Tarefa.Id,
                                                             tarefaTitulo = tarefaItem.Tarefa.Titulo,
                                                             tarefaProtocolo = tarefaItem.Tarefa.Protocolo
                                                         })
                                                         .AsNoTracking());
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
            

            foreach (var item in dto.Itens)
            {
                var entity = await context.TarefaItens.FirstOrDefaultAsync(f => f.Id == item.Id);
                entity.DataAlteracao = DateTime.Now;
                
                entity.Descricao = item.Descricao;

                mapper.Map(dto, entity);
                
                context.UpdateRange(entity);
            }

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("AtualizarConclusaoItem")]
        public virtual async Task<IActionResult> AtualizarConclusaoItem([FromBody] TarefaItensAtualizarConclusaoDTO dto)
        {
            var entity = await context.TarefaItens.FirstOrDefaultAsync(f => f.Id == dto.ItemId);

            entity.DataAlteracao = DateTime.Now;

            entity.Concluido = dto.Concluido;

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

        [HttpDelete("RemoveAllItens/{tarefaId}")]
        public virtual async Task<IActionResult> RemoveAllItens(Guid tarefaId)
        {
            var entity = await context.Set<Entities.TarefaItens>().Where(w => w.TarefaId == tarefaId).ToListAsync();

            context.RemoveRange(entity);

            await context.SaveChangesAsync();

            return Ok();
        }
    }
}
