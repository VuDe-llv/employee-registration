using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ILaoDongCaNhanService
    {
        Task<IEnumerable<LaoDongCaNhanDTO>> GetAllAsync();
        Task<LaoDongCaNhanDTO> GetByIdAsync(int id);
        Task<IEnumerable<LaoDongCaNhanDTO>> GetByWeekAsync(int maTuanLaoDong);
        Task<LaoDongCaNhanDTO> AddAsync(LaoDongCaNhanDTO ldCaNhanDTO);
        Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong);
        Task<bool> UpdateAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO);
        Task<bool> UpdateInfoAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO);
        Task<bool> DeleteInfoAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO);
        Task<bool> UnsubAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO);
    }

    public class LaoDongCaNhanService : ILaoDongCaNhanService
    {
        private readonly ILaoDongCaNhanRepository _repository;

        public LaoDongCaNhanService(ILaoDongCaNhanRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LaoDongCaNhanDTO>> GetAllAsync()
        {
            var ldCaNhans = await _repository.GetAllAsync();
            return ldCaNhans.Select(ld => new LaoDongCaNhanDTO
            {
                MaLDCaNhan = ld.MaLDCaNhan,
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

        public async Task<LaoDongCaNhanDTO> GetByIdAsync(int id)
        {
            var ldCaNhan = await _repository.GetByIdAsync(id);
            if (ldCaNhan == null) return null;

            return new LaoDongCaNhanDTO
            {
                MaLDCaNhan = ldCaNhan.MaLDCaNhan,
                NgayLaoDong = ldCaNhan.NgayLaoDong,
                BuoiLaoDong = ldCaNhan.BuoiLaoDong,
                ThoiGianDangKy = ldCaNhan.ThoiGianDangKy,
                MaLop = ldCaNhan.MaLop,
                MaNguoiDung = ldCaNhan.MaNguoiDung,
                TrangThai = ldCaNhan.TrangThai,
                MaTuanLaoDong = ldCaNhan.MaTuanLaoDong,
                MaKhuVuc = ldCaNhan.MaKhuVuc
            };
        }

        public async Task<IEnumerable<LaoDongCaNhanDTO>> GetByWeekAsync(int maTuanLaoDong)
        {
            var ldCaNhans = await _repository.GetByWeekAsync(maTuanLaoDong);
            return ldCaNhans.Select(ld => new LaoDongCaNhanDTO
            {
                MaLDCaNhan = ld.MaLDCaNhan,
                NgayLaoDong = ld.NgayLaoDong,
                BuoiLaoDong = ld.BuoiLaoDong,
                ThoiGianDangKy = ld.ThoiGianDangKy,
                MaLop = ld.MaLop,
                MaNguoiDung = ld.MaNguoiDung,
                TrangThai = ld.TrangThai,
                MaTuanLaoDong = ld.MaTuanLaoDong,
                MaKhuVuc = ld.MaKhuVuc
            });
        }

        public async Task<LaoDongCaNhanDTO> AddAsync(LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (ldCaNhanDTO.MaTuanLaoDong == null)
            {
                throw new ArgumentException("Mã tuần lao động không được để trống.");
            }

            var ldCaNhan = new LaoDongCaNhan
            {
                NgayLaoDong = ldCaNhanDTO.NgayLaoDong,
                BuoiLaoDong = ldCaNhanDTO.BuoiLaoDong,
                MaTuanLaoDong = ldCaNhanDTO.MaTuanLaoDong,
                TrangThai = ldCaNhanDTO.TrangThai
            };

            var addedLdCaNhan = await _repository.AddAsync(ldCaNhan);
            if (addedLdCaNhan == null)
            {
                throw new Exception("Lỗi khi thêm dữ liệu vào cơ sở dữ liệu.");
            }

            return new LaoDongCaNhanDTO
            {
                MaLDCaNhan = addedLdCaNhan.MaLDCaNhan,
                NgayLaoDong = addedLdCaNhan.NgayLaoDong,
                BuoiLaoDong = addedLdCaNhan.BuoiLaoDong,
                ThoiGianDangKy = addedLdCaNhan.ThoiGianDangKy,
                MaLop = addedLdCaNhan.MaLop,
                MaNguoiDung = addedLdCaNhan.MaNguoiDung,
                TrangThai = addedLdCaNhan.TrangThai,
                MaTuanLaoDong = addedLdCaNhan.MaTuanLaoDong,
                MaKhuVuc = addedLdCaNhan.MaKhuVuc
            };
        }

        public async Task AddBulkAsync(DateTime ngayBatDau, DateTime ngayKetThuc, int maTuanLaoDong)
        {
            var danhSachLaoDongCaNhan = new List<LaoDongCaNhan>();
            var currentDay = ngayBatDau;

            while (currentDay <= ngayKetThuc)
            {
                for (int i = 0; i < 10; i++)
                {
                    danhSachLaoDongCaNhan.Add(new LaoDongCaNhan
                    {
                        NgayLaoDong = currentDay,
                        BuoiLaoDong = i < 5 ? "Sáng" : "Chiều",
                        MaTuanLaoDong = maTuanLaoDong,
                        TrangThai = "Chưa đăng ký"
                    });
                }

                currentDay = currentDay.AddDays(1);
            }

            await _repository.AddBulkAsync(danhSachLaoDongCaNhan);
        }

        public async Task<bool> UpdateAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var existingLdCaNhan = await _repository.GetByIdAsync(id);
            if (existingLdCaNhan == null) return false;

            existingLdCaNhan.ThoiGianDangKy = DateTime.Now;
            existingLdCaNhan.MaLop = ldCaNhanDTO.MaLop;
            existingLdCaNhan.MaNguoiDung = ldCaNhanDTO.MaNguoiDung;
            existingLdCaNhan.TrangThai = ldCaNhanDTO.TrangThai;
            existingLdCaNhan.MaTuanLaoDong = ldCaNhanDTO.MaTuanLaoDong;
            existingLdCaNhan.MaKhuVuc = ldCaNhanDTO.MaKhuVuc;

            await _repository.UpdateAsync(existingLdCaNhan);
            return true;
        }

        public async Task<bool> UpdateInfoAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var existinginfoLdCaNhan = await _repository.GetByIdAsync(id);
            if (existinginfoLdCaNhan == null) return false;

            existinginfoLdCaNhan.TrangThai = ldCaNhanDTO.TrangThai;
            existinginfoLdCaNhan.MaKhuVuc = ldCaNhanDTO.MaKhuVuc;

            await _repository.UpdateInfoAsync(existinginfoLdCaNhan);
            return true;
        }

        public async Task<bool> DeleteInfoAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var deleteinfoLdCaNhan = await _repository.GetByIdAsync(id);
            if (deleteinfoLdCaNhan == null) return false;

            deleteinfoLdCaNhan.MaLop = null;
            deleteinfoLdCaNhan.MaNguoiDung = null;
            deleteinfoLdCaNhan.ThoiGianDangKy = null;
            deleteinfoLdCaNhan.TrangThai = "Chưa đăng ký";
            deleteinfoLdCaNhan.MaKhuVuc = null;

            await _repository.DeleteInfoAsync(deleteinfoLdCaNhan);
            return true;
        }

        public async Task<bool> UnsubAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var unsubLdCaNhan = await _repository.GetByIdAsync(id);
            if (unsubLdCaNhan == null) return false;

            unsubLdCaNhan.MaLop = null;
            unsubLdCaNhan.MaNguoiDung = null;
            unsubLdCaNhan.ThoiGianDangKy = null;
            unsubLdCaNhan.TrangThai = "Chưa đăng ký";

            await _repository.UnsubAsync(unsubLdCaNhan);
            return true;
        }
    }
}
