using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ILaoDongLopService
    {
        Task<IEnumerable<LaoDongLop>> GetPagedAsync(int page, int pageSize);
        Task<IEnumerable<LaoDongLopDTO>> GetAllAsync();
        Task<LaoDongLopDTO> GetByIdAsync(int id);
        Task<LaoDongLopDTO> AddAsync(LaoDongLopDTO ldLopDTO);
        Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong);
        Task<bool> UpdateAsync(int id, LaoDongLopDTO ldLopDTO);
        Task<bool> DeleteAsync(int id);
    }

    public class LaoDongLopService : ILaoDongLopService
    {
        private readonly ILaoDongLopRepository _repository;

        public LaoDongLopService(ILaoDongLopRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LaoDongLop>> GetPagedAsync(int page, int pageSize)
        {
            return await _repository.GetPagedAsync(page, pageSize);
        }

        public async Task<IEnumerable<LaoDongLopDTO>> GetAllAsync()
        {
            var ldLops = await _repository.GetAllAsync();
            return ldLops.Select(ld => new LaoDongLopDTO
            {
                MaLDLop = ld.MaLDLop,
                NgayLaoDong = ld.NgayLaoDong,
                BuoiLaoDong = ld.BuoiLaoDong,
                ThoiGianDangKy = ld.ThoiGianDangKy == null ? null : ld.ThoiGianDangKy,
                MaLop = ld.MaLop,
                MaNguoiDung = ld.MaNguoiDung,
                TrangThai = ld.TrangThai,
                MaTuanLaoDong = ld.MaTuanLaoDong
            });
        }

        public async Task<LaoDongLopDTO> GetByIdAsync(int id)
        {
            var ldLop = await _repository.GetByIdAsync(id);
            if (ldLop == null) return null;

            return new LaoDongLopDTO
            {
                MaLDLop = ldLop.MaLDLop,
                NgayLaoDong = ldLop.NgayLaoDong,
                BuoiLaoDong = ldLop.BuoiLaoDong,
                ThoiGianDangKy = ldLop.ThoiGianDangKy,
                MaLop = ldLop.MaLop,
                MaNguoiDung = ldLop.MaNguoiDung,
                TrangThai = ldLop.TrangThai,
                MaTuanLaoDong = ldLop.MaTuanLaoDong
            };
        }

        public async Task<LaoDongLopDTO> AddAsync(LaoDongLopDTO ldLopDTO)
        {
            if (ldLopDTO.MaTuanLaoDong == null)
            {
                throw new ArgumentException("Mã tuần lao động không được để trống.");
            }

            var ldLop = new LaoDongLop
            {
                NgayLaoDong = ldLopDTO.NgayLaoDong,
                BuoiLaoDong = ldLopDTO.BuoiLaoDong,
                MaTuanLaoDong = ldLopDTO.MaTuanLaoDong,
                TrangThai = ldLopDTO.TrangThai
            };

            var addedLdLop = await _repository.AddAsync(ldLop);
            if (addedLdLop == null)
            {
                throw new Exception("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu.");
            }

            return new LaoDongLopDTO
            {
                MaLDLop = addedLdLop.MaLDLop,
                NgayLaoDong = addedLdLop.NgayLaoDong,
                BuoiLaoDong = addedLdLop.BuoiLaoDong,
                ThoiGianDangKy = addedLdLop.ThoiGianDangKy,
                MaLop = addedLdLop.MaLop,
                MaNguoiDung = addedLdLop.MaNguoiDung,
                TrangThai = addedLdLop.TrangThai,
                MaTuanLaoDong = addedLdLop.MaTuanLaoDong
            };
        }

        public async Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong)
        {
            var danhSachLaoDongLop = new List<LaoDongLop>();
            var currentDay = ngayBatDau;

            while (currentDay <= ngayKetThuc)
            {
                for (int i = 0; i < 8; i++) // Tạo 8 dòng cho mỗi ngày
                {
                    danhSachLaoDongLop.Add(new LaoDongLop
                    {
                        NgayLaoDong = currentDay,
                        BuoiLaoDong = i < 4 ? "Sáng" : "Chiều", // 4 dòng buổi sáng, 4 dòng buổi chiều
                        MaTuanLaoDong = maTuanLaoDong,
                        TrangThai = "Chưa thực hiện"
                    });
                }

                currentDay = currentDay.AddDays(1); // Tăng ngày lên 1
            }

            await _repository.AddBulkAsync(danhSachLaoDongLop);
        }

        public async Task<bool> UpdateAsync(int id, LaoDongLopDTO ldLopDTO)
        {
            var existingLdLop = await _repository.GetByIdAsync(id);
            if (existingLdLop == null) return false;

            existingLdLop.NgayLaoDong = ldLopDTO.NgayLaoDong;
            existingLdLop.BuoiLaoDong = ldLopDTO.BuoiLaoDong;
            existingLdLop.ThoiGianDangKy = ldLopDTO.ThoiGianDangKy;
            existingLdLop.MaLop = ldLopDTO.MaLop;
            existingLdLop.MaNguoiDung = ldLopDTO.MaNguoiDung;
            existingLdLop.TrangThai = ldLopDTO.TrangThai;
            existingLdLop.MaTuanLaoDong = ldLopDTO.MaTuanLaoDong;

            await _repository.UpdateAsync(existingLdLop);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ldLop = await _repository.GetByIdAsync(id);
            if (ldLop == null) return false;

            await _repository.DeleteAsync(ldLop);
            return true;
        }
    }
}
