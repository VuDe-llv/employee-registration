using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ILaoDongLopService
    {
        Task<IEnumerable<LaoDongLopDTO>> GetAllAsync();
        Task<LaoDongLopDTO> GetByIdAsync(int id);
        Task<LaoDongLopDTO> AddAsync(LaoDongLopDTO ldLopDTO);
        Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong);
        Task<bool> UpdateAsync(int id, LaoDongLopDTO ldLopDTO);
        Task<bool> UpdateInfoAsync(int id, LaoDongLopDTO ldLopDTO);
        Task<bool> DeleteInfoAsync(int id, LaoDongLopDTO ldLopDTO);
        Task<bool> UnsubAsync(int id, LaoDongLopDTO ldLopDTO);
    }

    public class LaoDongLopService : ILaoDongLopService
    {
        private readonly ILaoDongLopRepository _repository;

        public LaoDongLopService(ILaoDongLopRepository repository)
        {
            _repository = repository;
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
                MaTuanLaoDong = ld.MaTuanLaoDong,
                MaKhuVuc = ld.MaKhuVuc
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
                MaTuanLaoDong = ldLop.MaTuanLaoDong,
                MaKhuVuc = ldLop.MaKhuVuc
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
                MaTuanLaoDong = addedLdLop.MaTuanLaoDong,
                MaKhuVuc = addedLdLop.MaKhuVuc
            };
        }

        public async Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong)
        {
            var danhSachLaoDongLop = new List<LaoDongLop>();
            var currentDay = ngayBatDau;

            while (currentDay <= ngayKetThuc)
            {
                for (int i = 0; i < 8; i++)
                {
                    danhSachLaoDongLop.Add(new LaoDongLop
                    {
                        NgayLaoDong = currentDay,
                        BuoiLaoDong = i < 4 ? "Sáng" : "Chiều",
                        MaTuanLaoDong = maTuanLaoDong,
                        TrangThai = "Chưa đăng ký"
                    });
                }

                currentDay = currentDay.AddDays(1);
            }

            await _repository.AddBulkAsync(danhSachLaoDongLop);
        }

        public async Task<bool> UpdateAsync(int id, LaoDongLopDTO ldLopDTO)
        {
            var existingLdLop = await _repository.GetByIdAsync(id);
            if (existingLdLop == null) return false;

            existingLdLop.ThoiGianDangKy = DateTime.Now;
            existingLdLop.MaLop = ldLopDTO.MaLop;
            existingLdLop.MaNguoiDung = ldLopDTO.MaNguoiDung;
            existingLdLop.TrangThai = ldLopDTO.TrangThai;
            existingLdLop.MaTuanLaoDong = ldLopDTO.MaTuanLaoDong;
            existingLdLop.MaKhuVuc = ldLopDTO.MaKhuVuc;

            await _repository.UpdateAsync(existingLdLop);
            return true;
        }

        public async Task<bool> UpdateInfoAsync(int id, LaoDongLopDTO ldLopDTO)
        {
            var existinginfoLdLop = await _repository.GetByIdAsync(id);
            if (existinginfoLdLop == null) return false;

            existinginfoLdLop.TrangThai = ldLopDTO.TrangThai;
            existinginfoLdLop.MaKhuVuc = ldLopDTO.MaKhuVuc;

            await _repository.UpdateInfoAsync(existinginfoLdLop);
            return true;
        }

        public async Task<bool> DeleteInfoAsync(int id, LaoDongLopDTO ldLopDTO)
        {
            var deleteinfoLdLop = await _repository.GetByIdAsync(id);
            if (deleteinfoLdLop == null) return false;

            deleteinfoLdLop.MaLop = null;
            deleteinfoLdLop.MaNguoiDung = null;
            deleteinfoLdLop.ThoiGianDangKy = null;
            deleteinfoLdLop.TrangThai = "Chưa đăng ký";
            deleteinfoLdLop.MaKhuVuc = null;

            await _repository.DeleteInfoAsync(deleteinfoLdLop);
            return true;
        }

        public async Task<bool> UnsubAsync(int id, LaoDongLopDTO ldLopDTO)
        {
            var unsubLdLop = await _repository.GetByIdAsync(id);
            if (unsubLdLop == null) return false;

            unsubLdLop.MaLop = null;
            unsubLdLop.MaNguoiDung = null;
            unsubLdLop.ThoiGianDangKy = null;
            unsubLdLop.TrangThai = "Chưa đăng ký";

            await _repository.UnsubAsync(unsubLdLop);
            return true;
        }
    }
}
