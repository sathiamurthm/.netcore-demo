using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Trigent.Core.Infrastructure.IoC.Product
{
    public static class ProductModule
    {
        public static IServiceCollection AddProductModule(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddMediatR(typeof(ProductModule).Assembly);

            return serviceCollection;
        }
    }
}
