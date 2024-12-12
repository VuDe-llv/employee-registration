namespace website_dangky_laodong.Models
{
    public class LaoDongLop
    {
        public int MaLDLop { get; set; }
        public DateTime NgayLaoDong { get; set; }
        public string? BuoiLaoDong { get; set; }
        public DateTime? ThoiGianDangKy { get; set; }
        public int? MaLop { get; set; }
        public string? MaNguoiDung { get; set; }
        public string? TrangThai { get; set; }

        public int? MaTuanLaoDong { get; set; }
        public TuanLaoDong TuanLaoDong { get; set; }
        public NguoiDung NguoiDung { get; set; }
        public Lop Lop { get; set; }
    }
}
