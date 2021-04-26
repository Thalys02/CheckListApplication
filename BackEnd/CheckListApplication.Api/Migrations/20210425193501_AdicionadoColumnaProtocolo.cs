using Microsoft.EntityFrameworkCore.Migrations;

namespace CheckListApplication.Api.Migrations
{
    public partial class AdicionadoColumnaProtocolo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Protocolo",
                table: "Tarefa",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Protocolo",
                table: "Tarefa");
        }
    }
}
