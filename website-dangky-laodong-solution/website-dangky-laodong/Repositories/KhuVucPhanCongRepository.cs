using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface IKhuVucPhanCongRepository
    {
        Task<IEnumerable<KhuVucPhanCong>> GetAllAsync();
        Task<KhuVucPhanCong> GetByIdAsync(int id);
        Task<KhuVucPhanCong> AddAsync(KhuVucPhanCong khuVucPhanCong);
        Task UpdateAsync(KhuVucPhanCong khuVucPhanCong);
        Task DeleteAsync(KhuVucPhanCong khuVucPhanCong);
    }

    public class KhuVucPhanCongRepository : IKhuVucPhanCongRepository
    {
        private readonly AppDbContext _context;

        public KhuVucPhanCongRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<KhuVucPhanCong>> GetAllAsync()
        {
            return await _context.KhuVucPhanCongs.ToListAsync();
        }

        public async Task<KhuVucPhanCong> GetByIdAsync(int id)
        {
            return await _context.KhuVucPhanCongs.FindAsync(id);
        }

        public async Task<KhuVucPhanCong> AddAsync(KhuVucPhanCong khuVucPhanCong)
        {
            await _context.KhuVucPhanCongs.AddAsync(khuVucPhanCong);
            await _context.SaveChangesAsync();
            return khuVucPhanCong;
        }

        public async Task UpdateAsync(KhuVucPhanCong khuVucPhanCong)
        {
            _context.Entry(khuVucPhanCong).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(KhuVucPhanCong khuVucPhanCong)
        {
            _context.KhuVucPhanCongs.Remove(khuVucPhanCong);
            await _context.SaveChangesAsync();
        }
    }
}
