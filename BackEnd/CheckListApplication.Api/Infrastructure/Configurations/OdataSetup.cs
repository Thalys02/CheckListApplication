using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Microsoft.OData.Edm;
using System;
using System.Linq;
using System.Reflection;

namespace CheckListApplication.Api.Infrastructure.Configurations
{
    public static class OdataSetup
    {
        public static void AddOdataSetup(this IServiceCollection services)
        {
            services.AddOData();

            services.AddMvcCore(options =>
            {
                foreach (var outputFormatter in options.OutputFormatters.OfType<OutputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }

                foreach (var inputFormatter in options.InputFormatters.OfType<InputFormatter>().Where(x => x.SupportedMediaTypes.Count == 0))
                {
                    inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
                }
            });
        }

        public static void AddOdataConfig(this IApplicationBuilder app)
        {
            app.UseMvc(routeBuilder =>
            {
                routeBuilder.Expand().Select().OrderBy().Filter().SkipToken().MaxTop(100).Count();
                routeBuilder.MapODataServiceRoute("odata", "odata", GetEdmModel());
            });
        }

        private static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            builder.EnableLowerCamelCase();

            var entities = AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                            .Where(x => (x.FullName.Contains("CheckListApplication.Api.Entities"))
                                     && !x.IsInterface
                                     && !x.IsAbstract)
                            .ToList();

            entities.ForEach(entity =>
            {
                MethodInfo mi = builder.GetType().GetMethod("EntitySet");
                MethodInfo miConstructed = mi.MakeGenericMethod(entity);
                miConstructed.Invoke(builder, new[] { entity.Name });
            });

            return builder.GetEdmModel();
        }
    }
}
