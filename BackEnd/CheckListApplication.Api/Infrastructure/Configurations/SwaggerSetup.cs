using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class SwaggerSetup
    {
        public static void AddSwaggerSetup(this IServiceCollection services)
        {
            services.AddSwaggerGen(setupAction =>
            {
                setupAction.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "Api CheckList",
                        Version = "v1",
                        Description = "Chalenge CheckListApi"
                    });

            });
        }
        public static void AddSwaggerConfig(this IApplicationBuilder app)
        {
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "swagger/api/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("api/v1/swagger.json", "Api");
            });
        }
    }
}
