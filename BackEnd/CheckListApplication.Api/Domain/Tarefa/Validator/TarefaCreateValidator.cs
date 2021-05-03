using CheckListApplication.Api.Controllers.Tarefa.DTOs;
using FluentValidation;

namespace CheckListApplication.Api.Domain.Tarefa.Validator
{
    public class TarefaCreateValidator : AbstractValidator<TarefaCreateDTO>
    {
        public TarefaCreateValidator()
        {
            RuleFor(p => p.Titulo).NotEmpty().NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");
            RuleFor(p => p.Usuario).NotEmpty().NotNull().WithMessage("O campo {PropertyName} precisa ser fornecido");
        }
    }
}
