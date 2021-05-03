using CheckListApplication.Api.Controllers.TarefaItens.DTOs;
using FluentValidation;

namespace CheckListApplication.Api.Domain.TarefaItens.Validator
{
    public class TarefaItensCreateValidator : AbstractValidator<TarefaItensCreateDTO>
    {
        public TarefaItensCreateValidator()
        {
            RuleFor(p => p.TarefaId).NotEmpty().NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");
            RuleFor(p => p.Descricao).NotEmpty().NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}
