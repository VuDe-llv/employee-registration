using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ILopRepository
    {
        Task<IEnumerable<Lop>> GetAllAsync();
        Task<Lop> GetByIdAsync(int id);
        Task<Lop> AddAsync(Lop lop);
        Task UpdateAsync(Lop lop);
        Task DeleteAsync(Lop lop);
    }

    public class LopRepository : ILopRepository
    {
        private readonly AppDbContext _context;

        public LopRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Lop>> GetAllAsync()
        {
            return await _context.Lops.ToListAsync();
        }

        public async Task<Lop> GetByIdAsync(int id)
        {
            return await _context.Lops.FindAsync(id);
        }

        public async Task<Lop> AddAsync(Lop lop)
        {
            await _context.Lops.AddAsync(lop);
            await _context.SaveChangesAsync();
            return lop;
        }

        public async Task UpdateAsync(Lop lop)
        {
            _context.Entry(lop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Lop lop)
        {
            _context.Lops.Remove(lop);
            await _context.SaveChangesAsync();
        }
    }
}
