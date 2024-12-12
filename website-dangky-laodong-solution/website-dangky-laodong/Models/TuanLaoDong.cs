namespace website_dangky_laodong.Models
{
    public class TuanLaoDong
    {
        public int MaTuanLaoDong { get; set; }
        public string? TenTuan { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public string? LoaiLaoDong { get; set; }

        public ICollection<LaoDongLop> LaoDongLops { get; set; }
        public ICollection<LaoDongCaNhan> LaoDongCaNhans { get; set; }
    }
}
