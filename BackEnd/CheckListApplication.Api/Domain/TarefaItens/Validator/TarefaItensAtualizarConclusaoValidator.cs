using CheckListApplication.Api.Domain.TarefaItens.DTOs;
using FluentValidation;

namespace CheckListApplication.Api.Domain.TarefaItens.Validator
{
    public class TarefaItensAtualizarConclusaoValidator : AbstractValidator<TarefaItensAtualizarConclusaoDTO>
    {
        public TarefaItensAtualizarConclusaoValidator()
        {
            RuleFor(p => p.Concluido).NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");
            RuleFor(p => p.ItemId).NotNull().NotEmpty().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}
