using CheckListApplication.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CheckListApplication.Api.Infrastructure.Data.Mapping
{
    public class TarefaMapping : IEntityTypeConfiguration<Tarefa>
    {
        public void Configure(EntityTypeBuilder<Tarefa> builder)
        {
            builder.ToTable("Tarefa");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Titulo).HasMaxLength(200).IsRequired();
            builder.Property(p => p.Usuario).HasMaxLength(100).IsRequired();
            builder.Property(p => p.Protocolo).ValueGeneratedOnAdd();

            builder.HasMany(p => p.Itens).WithOne(p => p.Tarefa).HasForeignKey(p => p.TarefaId);
        }
    }
}
