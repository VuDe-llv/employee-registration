using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface ITuanLaoDongService
    {
        Task<IEnumerable<TuanLaoDongDTO>> GetAllAsync();
        Task<TuanLaoDongDTO> GetByIdAsync(int id);
        Task<TuanLaoDongDTO> AddAsync(TuanLaoDongDTO tuanLaoDongDTO);
        Task<bool> UpdateAsync(int id, TuanLaoDongDTO tuanLaoDongDTO);
        Task<bool> DeleteAsync(int id);
    }

    public class TuanLaoDongService : ITuanLaoDongService
    {
        private readonly ITuanLaoDongRepository _repository;

        public TuanLaoDongService(ITuanLaoDongRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<TuanLaoDongDTO>> GetAllAsync()
        {
            var tuanLaoDongs = await _repository.GetAllAsync();
            return tuanLaoDongs.Select(t => new TuanLaoDongDTO
            {
                MaTuanLaoDong = t.MaTuanLaoDong,
                TenTuan = t.TenTuan,
                NgayBatDau = t.NgayBatDau,
                NgayKetThuc = t.NgayKetThuc,
                LoaiLaoDong = t.LoaiLaoDong
            });
        }

        public async Task<TuanLaoDongDTO> GetByIdAsync(int id)
        {
            var tuanLaoDong = await _repository.GetByIdAsync(id);
            if (tuanLaoDong == null) return null;

            return new TuanLaoDongDTO
            {
                MaTuanLaoDong = tuanLaoDong.MaTuanLaoDong,
                TenTuan = tuanLaoDong.TenTuan,
                NgayBatDau = tuanLaoDong.NgayBatDau,
                NgayKetThuc = tuanLaoDong.NgayKetThuc,
                LoaiLaoDong = tuanLaoDong.LoaiLaoDong
            };
        }

        public async Task<TuanLaoDongDTO> AddAsync(TuanLaoDongDTO tuanLaoDongDTO)
        {
            var tuanLaoDong = new TuanLaoDong
            {
                TenTuan = tuanLaoDongDTO.TenTuan,
                NgayBatDau = tuanLaoDongDTO.NgayBatDau,
                NgayKetThuc = tuanLaoDongDTO.NgayKetThuc,
                LoaiLaoDong = tuanLaoDongDTO.LoaiLaoDong
            };

            var addedTuanLaoDong = await _repository.AddAsync(tuanLaoDong);

            return new TuanLaoDongDTO
            {
                MaTuanLaoDong = addedTuanLaoDong.MaTuanLaoDong,
                TenTuan = addedTuanLaoDong.TenTuan,
                NgayBatDau = addedTuanLaoDong.NgayBatDau,
                NgayKetThuc = addedTuanLaoDong.NgayKetThuc,
                LoaiLaoDong = addedTuanLaoDong.LoaiLaoDong
            };
        }

        public async Task<bool> UpdateAsync(int id, TuanLaoDongDTO tuanLaoDongDTO)
        {
            var existingTuanLaoDong = await _repository.GetByIdAsync(id);
            if (existingTuanLaoDong == null) return false;

            existingTuanLaoDong.TenTuan = tuanLaoDongDTO.TenTuan;
            existingTuanLaoDong.NgayBatDau = tuanLaoDongDTO.NgayBatDau;
            existingTuanLaoDong.NgayKetThuc = tuanLaoDongDTO.NgayKetThuc;
            existingTuanLaoDong.LoaiLaoDong = tuanLaoDongDTO.LoaiLaoDong;

            await _repository.UpdateAsync(existingTuanLaoDong);
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tuanLaoDong = await _repository.GetByIdAsync(id);
            if (tuanLaoDong == null) return false;

            await _repository.DeleteAsync(tuanLaoDong);
            return true;
        }
    }
}
