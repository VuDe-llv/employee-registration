using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ILaoDongCaNhanService
    {
        Task<IEnumerable<LaoDongCaNhanDTO>> GetAllAsync();
        Task<LaoDongCaNhanDTO> GetByIdAsync(int id);
        Task<LaoDongCaNhanDTO> AddAsync(LaoDongCaNhanDTO ldCaNhanDTO);
        Task<bool> UpdateAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO);
        Task<bool> DeleteAsync(int id);
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
                ThoiGianDangKy = ld.ThoiGianDangKy,
                MaLop = ld.MaLop,
                MaNguoiDung = ld.MaNguoiDung,
                TrangThai = ld.TrangThai,
                MaTuanLaoDong = ld.MaTuanLaoDong
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
                MaTuanLaoDong = ldCaNhan.MaTuanLaoDong
            };
        }

        public async Task<LaoDongCaNhanDTO> AddAsync(LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var ldCaNhan = new LaoDongCaNhan
            {
                NgayLaoDong = ldCaNhanDTO.NgayLaoDong,
                BuoiLaoDong = ldCaNhanDTO.BuoiLaoDong,
                ThoiGianDangKy = ldCaNhanDTO.ThoiGianDangKy,
                MaLop = ldCaNhanDTO.MaLop,
                MaNguoiDung = ldCaNhanDTO.MaNguoiDung,
                TrangThai = ldCaNhanDTO.TrangThai,
                MaTuanLaoDong = ldCaNhanDTO.MaTuanLaoDong
            };

            var addedLdCaNhan = await _repository.AddAsync(ldCaNhan);

            ldCaNhanDTO.MaLDCaNhan = addedLdCaNhan.MaLDCaNhan;
            return ldCaNhanDTO;
        }

        public async Task<bool> UpdateAsync(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            var existingLdCaNhan = await _repository.GetByIdAsync(id);
            if (existingLdCaNhan == null) return false;

            existingLdCaNhan.NgayLaoDong = ldCaNhanDTO.NgayLaoDong;
            existingLdCaNhan.BuoiLaoDong = ldCaNhanDTO.BuoiLaoDong;
            existingLdCaNhan.ThoiGianDangKy = ldCaNhanDTO.ThoiGianDangKy;
            existingLdCaNhan.MaLop = ldCaNhanDTO.MaLop;
            existingLdCaNhan.MaNguoiDung = ldCaNhanDTO.MaNguoiDung;
            existingLdCaNhan.TrangThai = ldCaNhanDTO.TrangThai;
            existingLdCaNhan.MaTuanLaoDong = ldCaNhanDTO.MaTuanLaoDong;

            await _repository.UpdateAsync(existingLdCaNhan);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ldCaNhan = await _repository.GetByIdAsync(id);
            if (ldCaNhan == null) return false;

            await _repository.DeleteAsync(ldCaNhan);
            return true;
        }
    }
}
