using Microsoft.AspNetCore.Builder;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class CorsSetup
    {
        public static void AddCorsConfig(this IApplicationBuilder app)
        {
            app.UseCors(options => options
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
        }
    }
}
