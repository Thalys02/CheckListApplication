using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class FluentValidationSetup
    {
        public static void AddFluentValidationSetup(this IServiceCollection services)
        {
            services.AddMvc().AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<Startup>());
        }
    }
}
