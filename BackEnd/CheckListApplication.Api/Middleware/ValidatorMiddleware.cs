using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Threading.Tasks;

namespace CheckListApplication.Api.Middleware
{
    public class ValidatorMiddleware : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                var errorsInModel = context.ModelState.Where(e => e.Value.Errors.Count > 0)
                                            .ToDictionary(k => k.Key, k => k.Value.Errors.Select(s => s.ErrorMessage))
                                            .ToList();

                context.Result = new BadRequestObjectResult(new
                {
                    validacaoErros = errorsInModel.SelectMany(error => error.Value).ToList()
                });

                return;
            }

            await next();
        }
    }
}