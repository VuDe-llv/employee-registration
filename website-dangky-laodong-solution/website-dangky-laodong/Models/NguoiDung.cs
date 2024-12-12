namespace website_dangky_laodong.Models
{
    public class NguoiDung
    {
        public string MaNguoiDung { get; set; }
        public string? TenNguoiDung { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? MatKhau { get; set; }
        public string? VaiTro { get; set; }

        public int? MaLop { get; set; }
        public Lop Lop { get; set; }
        public ICollection<LaoDongCaNhan> LaoDongCaNhans { get; set; }
        public ICollection<LaoDongLop> LaoDongLops { get; set; }
    }
}
