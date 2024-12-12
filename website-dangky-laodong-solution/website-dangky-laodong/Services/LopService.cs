using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ILopService
    {
        Task<IEnumerable<LopDTO>> GetAllAsync();
        Task<LopDTO> GetByIdAsync(int id);
        Task<LopDTO> AddAsync(LopDTO lopDTO);
        Task<bool> UpdateAsync(int id, LopDTO lopDTO);
        Task<bool> DeleteAsync(int id);
    }

    public class LopService : ILopService
    {
        private readonly ILopRepository _repository;

        public LopService(ILopRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<LopDTO>> GetAllAsync()
        {
            var lops = await _repository.GetAllAsync();
            return lops.Select(l => new LopDTO
            {
                MaLop = l.MaLop,
                TenLop = l.TenLop,
                MaKhoa = l.MaKhoa
            });
        }

        public async Task<LopDTO> GetByIdAsync(int id)
        {
            var lop = await _repository.GetByIdAsync(id);
            if (lop == null) return null;

            return new LopDTO
            {
                MaLop = lop.MaLop,
                TenLop = lop.TenLop,
                MaKhoa = lop.MaKhoa
            };
        }

        public async Task<LopDTO> AddAsync(LopDTO lopDTO)
        {
            var lop = new Lop
            {
                TenLop = lopDTO.TenLop,
                MaKhoa = lopDTO.MaKhoa
            };

            var addedLop = await _repository.AddAsync(lop);

            return new LopDTO
            {
                MaLop = addedLop.MaLop,
                TenLop = addedLop.TenLop,
                MaKhoa = addedLop.MaKhoa
            };
        }

        public async Task<bool> UpdateAsync(int id, LopDTO lopDTO)
        {
            var existingLop = await _repository.GetByIdAsync(id);
            if (existingLop == null) return false;

            existingLop.TenLop = lopDTO.TenLop;
            existingLop.MaKhoa = lopDTO.MaKhoa;

            await _repository.UpdateAsync(existingLop);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var lop = await _repository.GetByIdAsync(id);
            if (lop == null) return false;

            await _repository.DeleteAsync(lop);
            return true;
        }
    }
}
