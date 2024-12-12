using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ITuanLaoDongRepository
    {
        Task<IEnumerable<TuanLaoDong>> GetAllAsync();
        Task<TuanLaoDong> GetByIdAsync(int id);
        Task<TuanLaoDong> AddAsync(TuanLaoDong tuanLaoDong);
        Task UpdateAsync(TuanLaoDong tuanLaoDong);
        Task DeleteAsync(TuanLaoDong tuanLaoDong);
    }

    public class TuanLaoDongRepository : ITuanLaoDongRepository
    {
        private readonly AppDbContext _context;

        public TuanLaoDongRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TuanLaoDong>> GetAllAsync()
        {
            return await _context.TuanLaoDongs.ToListAsync();
        }

        public async Task<TuanLaoDong> GetByIdAsync(int id)
        {
            return await _context.TuanLaoDongs.FindAsync(id);
        }

        public async Task<TuanLaoDong> AddAsync(TuanLaoDong tuanLaoDong)
        {
            await _context.TuanLaoDongs.AddAsync(tuanLaoDong);
            await _context.SaveChangesAsync();
            return tuanLaoDong;
        }

        public async Task UpdateAsync(TuanLaoDong tuanLaoDong)
        {
            _context.Entry(tuanLaoDong).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TuanLaoDong tuanLaoDong)
        {
            _context.TuanLaoDongs.Remove(tuanLaoDong);
            await _context.SaveChangesAsync();
        }
    }
}
