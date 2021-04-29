using Microsoft.EntityFrameworkCore.Migrations;

namespace CheckListApplication.Api.Migrations
{
    public partial class AdicionadoCampoConcluido : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Concluido",
                table: "TarefaItens",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Concluido",
                table: "TarefaItens");
        }
    }
}
