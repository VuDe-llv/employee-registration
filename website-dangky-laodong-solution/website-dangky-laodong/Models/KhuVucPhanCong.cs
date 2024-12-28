namespace website_dangky_laodong.Models
{
    public class KhuVucPhanCong
    {
        public int MaKhuVuc { get; set; }
        public string? TenKhuVuc { get; set; }
        public string? MoTaKhuVuc { get; set; }
        public ICollection<LaoDongLop> LaoDongLops { get; set; }
        public ICollection<LaoDongCaNhan> LaoDongCaNhans { get; set; }
    }
}
