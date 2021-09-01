using Microsoft.EntityFrameworkCore.Migrations;

namespace RVAProjekat.Migrations
{
    public partial class m2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "KomeIme",
                table: "Obavjestenja",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KomeIme",
                table: "Obavjestenja");
        }
    }
}
