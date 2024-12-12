namespace website_dangky_laodong.Models
{
    public class Lop
    {
        public int MaLop { get; set; }
        public string? TenLop { get; set; }
        public int? MaKhoa { get; set; }

        public Khoa Khoa { get; set; }

        public ICollection<NguoiDung> NguoiDungs { get; set; }

        public ICollection<LaoDongCaNhan> LaoDongCaNhans { get; set; }

        public ICollection<LaoDongLop> LaoDongLops { get; set; }
    }
}
