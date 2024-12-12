using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface IKhoaRepository
    {
        Task<IEnumerable<Khoa>> GetAllAsync();
        Task<Khoa> GetByIdAsync(int id);
        Task<Khoa> AddAsync(Khoa khoa);
        Task UpdateAsync(Khoa khoa);
        Task DeleteAsync(Khoa khoa);
    }

    public class KhoaRepository : IKhoaRepository
    {
        private readonly AppDbContext _context;

        public KhoaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Khoa>> GetAllAsync()
        {
            return await _context.Khoas.ToListAsync();
        }

        public async Task<Khoa> GetByIdAsync(int id)
        {
            return await _context.Khoas.FindAsync(id);
        }

        public async Task<Khoa> AddAsync(Khoa khoa)
        {
            await _context.Khoas.AddAsync(khoa);
            await _context.SaveChangesAsync();
            return khoa;
        }

        public async Task UpdateAsync(Khoa khoa)
        {
            _context.Entry(khoa).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Khoa khoa)
        {
            _context.Khoas.Remove(khoa);
            await _context.SaveChangesAsync();
        }
    }
}
