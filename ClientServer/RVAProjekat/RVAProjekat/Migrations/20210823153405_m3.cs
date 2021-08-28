using Microsoft.EntityFrameworkCore.Migrations;

namespace RVAProjekat.Migrations
{
    public partial class m3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Obavjestenja",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OdkogaId = table.Column<int>(nullable: false),
                    OdkogaIme = table.Column<string>(nullable: true),
                    KomeId = table.Column<int>(nullable: false),
                    KomeIme = table.Column<string>(nullable: true),
                    Opis = table.Column<string>(nullable: true),
                    IdArtikla = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Obavjestenja", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Obavjestenja");
        }
    }
}
