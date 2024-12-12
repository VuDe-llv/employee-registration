namespace website_dangky_laodong.DTOs
{
    public class TuanLaoDongDTO
    {
        public int MaTuanLaoDong { get; set; }
        public string? TenTuan { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public string? LoaiLaoDong { get; set; }
    }
}
