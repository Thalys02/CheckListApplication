using CheckListApplication.Api.Middleware;
using Microsoft.Extensions.DependencyInjection;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class MiddlewareSetup
    {
        public static void AddMiddlewareSetup(this IServiceCollection services)
        {
            services.AddControllers()
             .ConfigureApiBehaviorOptions(options =>
             {
                 options.SuppressModelStateInvalidFilter = true;
             });

            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add<ValidatorMiddleware>();
            });
        }
    }
}
