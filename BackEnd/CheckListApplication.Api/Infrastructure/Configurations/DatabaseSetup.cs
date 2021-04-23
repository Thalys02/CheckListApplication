
using CheckListApplication.Api.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class DatabaseSetup
    {
        public static void AddDatabaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CheckListContext>(options =>
            {
                options.UseSqlServer(configuration.GetSection("ConnStringSettings:ConnString").Value);
            });
        }
    }
}
