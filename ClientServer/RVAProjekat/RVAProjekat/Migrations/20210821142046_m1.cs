using Microsoft.EntityFrameworkCore.Migrations;

namespace RVAProjekat.Migrations
{
    public partial class m1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(nullable: true),
                    Naslov = table.Column<string>(nullable: true),
                    Kategorija = table.Column<string>(nullable: true),
                    NudimTrazim = table.Column<string>(nullable: true),
                    Cijena = table.Column<string>(nullable: true),
                    Fiksno = table.Column<bool>(nullable: false),
                    PrihvatamZamjenu = table.Column<bool>(nullable: false),
                    TekstOglasa = table.Column<string>(nullable: true),
                    MjestoGrad = table.Column<string>(nullable: true),
                    Telefon = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ocjenas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Komentar = table.Column<string>(nullable: true),
                    BrOcjene = table.Column<int>(nullable: false),
                    KorisnickoIme = table.Column<string>(nullable: true),
                    IdKorisnika = table.Column<int>(nullable: false),
                    IdKorisnikaOcijenjenog = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ocjenas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(nullable: true),
                    Prezime = table.Column<string>(nullable: true),
                    KorisnickoIme = table.Column<string>(nullable: true),
                    Lozinka = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Uloga = table.Column<string>(nullable: true),
                    ProsjecnaOcjena = table.Column<double>(nullable: false),
                    BrOcjena = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Ocjenas");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
