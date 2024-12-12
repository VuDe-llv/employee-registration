using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Khoa> Khoas { get; set; }
        public DbSet<Lop> Lops { get; set; }
        public DbSet<NguoiDung> NguoiDungs { get; set; }
        public DbSet<TuanLaoDong> TuanLaoDongs { get; set; }
        public DbSet<LaoDongCaNhan> LaoDongCaNhans { get; set; }
        public DbSet<LaoDongLop> LaoDongLops { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // **Cấu hình bảng Khoa**
            modelBuilder.Entity<Khoa>(entity =>
            {
                entity.HasKey(k => k.MaKhoa);
                entity.Property(k => k.TenKhoa).HasMaxLength(100);

                entity.HasMany(k => k.Lops)
                      .WithOne(l => l.Khoa)
                      .HasForeignKey(l => l.MaKhoa)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // **Cấu hình bảng Lớp**
            modelBuilder.Entity<Lop>(entity =>
            {
                entity.HasKey(l => l.MaLop);
                entity.Property(l => l.TenLop).HasMaxLength(100);

                entity.HasMany(l => l.NguoiDungs)
                      .WithOne(nd => nd.Lop)
                      .HasForeignKey(nd => nd.MaLop)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(l => l.LaoDongCaNhans)
                      .WithOne(ldcn => ldcn.Lop)
                      .HasForeignKey(ldcn => ldcn.MaLop)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(l => l.LaoDongLops)
                      .WithOne(ldl => ldl.Lop)
                      .HasForeignKey(ldl => ldl.MaLop)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // **Cấu hình bảng Người Dùng**
            modelBuilder.Entity<NguoiDung>(entity =>
            {
                entity.HasKey(nd => nd.MaNguoiDung);
                entity.Property(nd => nd.TenNguoiDung).HasMaxLength(200);
                entity.Property(nd => nd.SoDienThoai).HasMaxLength(15);
                entity.Property(nd => nd.Email).HasMaxLength(100); 
                entity.Property(nd => nd.MatKhau).IsRequired();
                entity.Property(nd => nd.VaiTro).IsRequired();

                entity.HasMany(nd => nd.LaoDongCaNhans)
                      .WithOne(ldcn => ldcn.NguoiDung)
                      .HasForeignKey(ldcn => ldcn.MaNguoiDung)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasMany(nd => nd.LaoDongLops)
                      .WithOne(ldl => ldl.NguoiDung)
                      .HasForeignKey(ldl => ldl.MaNguoiDung)
                      .OnDelete(DeleteBehavior.NoAction);
            });

            // **Cấu hình bảng Tuần Lao Động**
            modelBuilder.Entity<TuanLaoDong>(entity =>
            {
                entity.HasKey(tld => tld.MaTuanLaoDong);
                entity.Property(tld => tld.TenTuan).HasMaxLength(100); 
                entity.Property(tld => tld.NgayBatDau).IsRequired(); 
                entity.Property(tld => tld.NgayKetThuc).IsRequired(); 
                entity.Property(tld => tld.LoaiLaoDong).HasMaxLength(50);

                entity.HasMany(tld => tld.LaoDongCaNhans)
                      .WithOne(ldcn => ldcn.TuanLaoDong)
                      .HasForeignKey(ldcn => ldcn.MaTuanLaoDong)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(tld => tld.LaoDongLops)
                      .WithOne(ldl => ldl.TuanLaoDong)
                      .HasForeignKey(ldl => ldl.MaTuanLaoDong)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // **Cấu hình bảng Lao Động Cá Nhân**
            modelBuilder.Entity<LaoDongCaNhan>(entity =>
            {
                entity.HasKey(ldcn => ldcn.MaLDCaNhan);
                entity.Property(ldcn => ldcn.BuoiLaoDong).HasMaxLength(50); 
                entity.Property(ldcn => ldcn.TrangThai).HasMaxLength(50); 
                entity.Property(ldcn => ldcn.ThoiGianDangKy).IsRequired(false); 

                entity.HasOne(ldcn => ldcn.Lop)
                      .WithMany(l => l.LaoDongCaNhans)
                      .HasForeignKey(ldcn => ldcn.MaLop)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ldcn => ldcn.NguoiDung)
                      .WithMany(nd => nd.LaoDongCaNhans)
                      .HasForeignKey(ldcn => ldcn.MaNguoiDung)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(ldcn => ldcn.TuanLaoDong)
                      .WithMany(tld => tld.LaoDongCaNhans)
                      .HasForeignKey(ldcn => ldcn.MaTuanLaoDong)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // **Cấu hình bảng Lao Động Lớp**
            modelBuilder.Entity<LaoDongLop>(entity =>
            {
                entity.HasKey(ldl => ldl.MaLDLop);
                entity.Property(ldl => ldl.BuoiLaoDong).HasMaxLength(50); 
                entity.Property(ldl => ldl.TrangThai).HasMaxLength(50); 
                entity.Property(ldl => ldl.ThoiGianDangKy).IsRequired(false);

                entity.HasOne(ldl => ldl.Lop)
                      .WithMany(l => l.LaoDongLops)
                      .HasForeignKey(ldl => ldl.MaLop)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(ldl => ldl.NguoiDung)
                      .WithMany(nd => nd.LaoDongLops)
                      .HasForeignKey(ldl => ldl.MaNguoiDung)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(ldl => ldl.TuanLaoDong)
                      .WithMany(tld => tld.LaoDongLops)
                      .HasForeignKey(ldl => ldl.MaTuanLaoDong)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}

// Add-Migration InitialCreate
// Update-Database