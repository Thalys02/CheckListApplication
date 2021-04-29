using CheckListApplication.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CheckListApplication.Api.Infrastructure.Data.Mapping
{
    public class TarefaItensMapping : IEntityTypeConfiguration<TarefaItens>
    {
        public void Configure(EntityTypeBuilder<TarefaItens> builder)
        {
            builder.ToTable("TarefaItens");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Descricao).HasMaxLength(400).IsRequired();
            builder.Property(p => p.Concluido).IsRequired();

            builder.HasOne(p => p.Tarefa).WithMany(p => p.Itens).HasForeignKey(p => p.TarefaId);

        }
    }
}
