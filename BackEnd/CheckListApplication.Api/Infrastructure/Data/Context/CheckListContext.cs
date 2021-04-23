using CheckListApplication.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace CheckListApplication.Api.Infrastructure.Data.Context
{
    public class CheckListContext : DbContext
    {
        public CheckListContext(DbContextOptions<CheckListContext> options) : base(options) { }

        public DbSet<Tarefa> Tarefa { get; set; }
        public DbSet<TarefaItens> TarefaItens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CheckListContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
