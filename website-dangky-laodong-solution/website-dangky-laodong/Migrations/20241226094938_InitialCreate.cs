using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace website_dangky_laodong.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Khoas",
                columns: table => new
                {
                    MaKhoa = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhoa = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Khoas", x => x.MaKhoa);
                });

            migrationBuilder.CreateTable(
                name: "KhuVucPhanCongs",
                columns: table => new
                {
                    MaKhuVuc = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenKhuVuc = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MoTaKhuVuc = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhuVucPhanCongs", x => x.MaKhuVuc);
                });

            migrationBuilder.CreateTable(
                name: "TuanLaoDongs",
                columns: table => new
                {
                    MaTuanLaoDong = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenTuan = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LoaiLaoDong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TuanLaoDongs", x => x.MaTuanLaoDong);
                });

            migrationBuilder.CreateTable(
                name: "Lops",
                columns: table => new
                {
                    MaLop = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLop = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MaKhoa = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lops", x => x.MaLop);
                    table.ForeignKey(
                        name: "FK_Lops_Khoas_MaKhoa",
                        column: x => x.MaKhoa,
                        principalTable: "Khoas",
                        principalColumn: "MaKhoa",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "NguoiDungs",
                columns: table => new
                {
                    MaNguoiDung = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNguoiDung = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MatKhau = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VaiTro = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaLop = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiDungs", x => x.MaNguoiDung);
                    table.ForeignKey(
                        name: "FK_NguoiDungs_Lops_MaLop",
                        column: x => x.MaLop,
                        principalTable: "Lops",
                        principalColumn: "MaLop",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LaoDongCaNhans",
                columns: table => new
                {
                    MaLDCaNhan = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NgayLaoDong = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BuoiLaoDong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThoiGianDangKy = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaLop = table.Column<int>(type: "int", nullable: true),
                    MaNguoiDung = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TrangThai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaTuanLaoDong = table.Column<int>(type: "int", nullable: true),
                    MaKhuVuc = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaoDongCaNhans", x => x.MaLDCaNhan);
                    table.ForeignKey(
                        name: "FK_LaoDongCaNhans_KhuVucPhanCongs_MaKhuVuc",
                        column: x => x.MaKhuVuc,
                        principalTable: "KhuVucPhanCongs",
                        principalColumn: "MaKhuVuc",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongCaNhans_Lops_MaLop",
                        column: x => x.MaLop,
                        principalTable: "Lops",
                        principalColumn: "MaLop",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongCaNhans_NguoiDungs_MaNguoiDung",
                        column: x => x.MaNguoiDung,
                        principalTable: "NguoiDungs",
                        principalColumn: "MaNguoiDung",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongCaNhans_TuanLaoDongs_MaTuanLaoDong",
                        column: x => x.MaTuanLaoDong,
                        principalTable: "TuanLaoDongs",
                        principalColumn: "MaTuanLaoDong",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "LaoDongLops",
                columns: table => new
                {
                    MaLDLop = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NgayLaoDong = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BuoiLaoDong = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ThoiGianDangKy = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaLop = table.Column<int>(type: "int", nullable: true),
                    MaNguoiDung = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TrangThai = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaTuanLaoDong = table.Column<int>(type: "int", nullable: true),
                    MaKhuVuc = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaoDongLops", x => x.MaLDLop);
                    table.ForeignKey(
                        name: "FK_LaoDongLops_KhuVucPhanCongs_MaKhuVuc",
                        column: x => x.MaKhuVuc,
                        principalTable: "KhuVucPhanCongs",
                        principalColumn: "MaKhuVuc",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongLops_Lops_MaLop",
                        column: x => x.MaLop,
                        principalTable: "Lops",
                        principalColumn: "MaLop",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongLops_NguoiDungs_MaNguoiDung",
                        column: x => x.MaNguoiDung,
                        principalTable: "NguoiDungs",
                        principalColumn: "MaNguoiDung",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_LaoDongLops_TuanLaoDongs_MaTuanLaoDong",
                        column: x => x.MaTuanLaoDong,
                        principalTable: "TuanLaoDongs",
                        principalColumn: "MaTuanLaoDong",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongCaNhans_MaKhuVuc",
                table: "LaoDongCaNhans",
                column: "MaKhuVuc");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongCaNhans_MaLop",
                table: "LaoDongCaNhans",
                column: "MaLop");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongCaNhans_MaNguoiDung",
                table: "LaoDongCaNhans",
                column: "MaNguoiDung");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongCaNhans_MaTuanLaoDong",
                table: "LaoDongCaNhans",
                column: "MaTuanLaoDong");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongLops_MaKhuVuc",
                table: "LaoDongLops",
                column: "MaKhuVuc");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongLops_MaLop",
                table: "LaoDongLops",
                column: "MaLop");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongLops_MaNguoiDung",
                table: "LaoDongLops",
                column: "MaNguoiDung");

            migrationBuilder.CreateIndex(
                name: "IX_LaoDongLops_MaTuanLaoDong",
                table: "LaoDongLops",
                column: "MaTuanLaoDong");

            migrationBuilder.CreateIndex(
                name: "IX_Lops_MaKhoa",
                table: "Lops",
                column: "MaKhoa");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDungs_MaLop",
                table: "NguoiDungs",
                column: "MaLop");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LaoDongCaNhans");

            migrationBuilder.DropTable(
                name: "LaoDongLops");

            migrationBuilder.DropTable(
                name: "KhuVucPhanCongs");

            migrationBuilder.DropTable(
                name: "NguoiDungs");

            migrationBuilder.DropTable(
                name: "TuanLaoDongs");

            migrationBuilder.DropTable(
                name: "Lops");

            migrationBuilder.DropTable(
                name: "Khoas");
        }
    }
}
