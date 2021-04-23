using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class DependencyInjectionSetup
    {
        public static void AddDependecyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            //services.AddScoped<INotificationHandler, NotificationHandler>();
        }
    }
}
