namespace website_dangky_laodong.Models
{
    public class Khoa
    {
        public int MaKhoa { get; set; }
        public string? TenKhoa { get; set; }

        public ICollection<Lop> Lops { get; set; }
    }
}