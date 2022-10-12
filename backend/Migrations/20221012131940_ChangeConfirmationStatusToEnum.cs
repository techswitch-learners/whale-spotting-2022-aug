using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WhaleSpotting.Migrations
{
    public partial class ChangeConfirmationStatusToEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sightings_ConfirmationStatuses_ConfirmationStatusId",
                table: "Sightings");

            migrationBuilder.DropTable(
                name: "ConfirmationStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Sightings_ConfirmationStatusId",
                table: "Sightings");

            migrationBuilder.DropColumn(
                name: "ConfirmationStatusId",
                table: "Sightings");

            migrationBuilder.AddColumn<int>(
                name: "ConfirmationStatus",
                table: "Sightings",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmationStatus",
                table: "Sightings");

            migrationBuilder.AddColumn<int>(
                name: "ConfirmationStatusId",
                table: "Sightings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ConfirmationStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConfirmationStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sightings_ConfirmationStatusId",
                table: "Sightings",
                column: "ConfirmationStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sightings_ConfirmationStatuses_ConfirmationStatusId",
                table: "Sightings",
                column: "ConfirmationStatusId",
                principalTable: "ConfirmationStatuses",
                principalColumn: "Id");
        }
    }
}
