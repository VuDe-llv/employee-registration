using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface IKhoaService
    {
        Task<IEnumerable<KhoaDTO>> GetAllAsync();
        Task<KhoaDTO> GetByIdAsync(int id);
        Task<KhoaDTO> AddAsync(KhoaDTO khoaDTO);
        Task<bool> UpdateAsync(int id, KhoaDTO khoaDTO);
        Task<bool> DeleteAsync(int id);
    }

    public class KhoaService : IKhoaService
    {
        private readonly IKhoaRepository _repository;

        public KhoaService(IKhoaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<KhoaDTO>> GetAllAsync()
        {
            var khoas = await _repository.GetAllAsync();
            return khoas.Select(k => new KhoaDTO
            {
                MaKhoa = k.MaKhoa,
                TenKhoa = k.TenKhoa
            });
        }

        public async Task<KhoaDTO> GetByIdAsync(int id)
        {
            var khoa = await _repository.GetByIdAsync(id);
            if (khoa == null) return null;

            return new KhoaDTO
            {
                MaKhoa = khoa.MaKhoa,
                TenKhoa = khoa.TenKhoa
            };
        }

        public async Task<KhoaDTO> AddAsync(KhoaDTO khoaDTO)
        {
            var khoa = new Khoa
            {
                TenKhoa = khoaDTO.TenKhoa
            };

            var addedKhoa = await _repository.AddAsync(khoa);

            return new KhoaDTO
            {
                MaKhoa = addedKhoa.MaKhoa,
                TenKhoa = addedKhoa.TenKhoa
            };
        }

        public async Task<bool> UpdateAsync(int id, KhoaDTO khoaDTO)
        {
            var existingKhoa = await _repository.GetByIdAsync(id);
            if (existingKhoa == null) return false;

            existingKhoa.TenKhoa = khoaDTO.TenKhoa;

            await _repository.UpdateAsync(existingKhoa);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var khoa = await _repository.GetByIdAsync(id);
            if (khoa == null) return false;

            await _repository.DeleteAsync(khoa);
            return true;
        }
    }
}
