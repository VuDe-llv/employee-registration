using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface IKhuVucPhanCongService
    {
        Task<IEnumerable<KhuVucPhanCongDTO>> GetAllAsync();
        Task<KhuVucPhanCongDTO> GetByIdAsync(int id);
        Task<KhuVucPhanCongDTO> AddAsync(KhuVucPhanCongDTO khuVucPhanCongDTO);
        Task<bool> UpdateAsync(int id, KhuVucPhanCongDTO khuVucPhanCongDTO);
        Task<bool> DeleteAsync(int id);
    }
    public class KhuVucPhanCongService : IKhuVucPhanCongService
    {
        private readonly IKhuVucPhanCongRepository _repository;

        public KhuVucPhanCongService(IKhuVucPhanCongRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<KhuVucPhanCongDTO>> GetAllAsync()
        {
            var khuVucPhanCongs = await _repository.GetAllAsync();
            return khuVucPhanCongs.Select(kv => new KhuVucPhanCongDTO
            {
                MaKhuVuc = kv.MaKhuVuc,
                TenKhuVuc = kv.TenKhuVuc,
                MoTaKhuVuc = kv.MoTaKhuVuc
            });
        }

        public async Task<KhuVucPhanCongDTO> GetByIdAsync(int id)
        {
            var khuVucPhanCong = await _repository.GetByIdAsync(id);
            if (khuVucPhanCong == null) return null;

            return new KhuVucPhanCongDTO
            {
                MaKhuVuc = khuVucPhanCong.MaKhuVuc,
                TenKhuVuc = khuVucPhanCong.TenKhuVuc,
                MoTaKhuVuc = khuVucPhanCong.MoTaKhuVuc
            };
        }

        public async Task<KhuVucPhanCongDTO> AddAsync(KhuVucPhanCongDTO khuVucPhanCongDTO)
        {
            var khuVucPhanCong = new KhuVucPhanCong
            {
                MaKhuVuc = khuVucPhanCongDTO.MaKhuVuc,
                TenKhuVuc = khuVucPhanCongDTO.TenKhuVuc,
                MoTaKhuVuc = khuVucPhanCongDTO.MoTaKhuVuc
            };

            var addedKhuVucPhanCong = await _repository.AddAsync(khuVucPhanCong);

            return new KhuVucPhanCongDTO
            {
                MaKhuVuc = addedKhuVucPhanCong.MaKhuVuc,
                TenKhuVuc = addedKhuVucPhanCong.TenKhuVuc,
                MoTaKhuVuc = addedKhuVucPhanCong.MoTaKhuVuc
            };
        }

        public async Task<bool> UpdateAsync(int id, KhuVucPhanCongDTO khuVucPhanCongDTO)
        {
            var existingKhuVucPhanCong = await _repository.GetByIdAsync(id);
            if (existingKhuVucPhanCong == null) return false;

            existingKhuVucPhanCong.TenKhuVuc = khuVucPhanCongDTO.TenKhuVuc;
            existingKhuVucPhanCong.MoTaKhuVuc = khuVucPhanCongDTO.MoTaKhuVuc;

            await _repository.UpdateAsync(existingKhuVucPhanCong);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var khuVucPhanCong = await _repository.GetByIdAsync(id);
            if (khuVucPhanCong == null) return false;

            await _repository.DeleteAsync(khuVucPhanCong);
            return true;
        }
    }
}
