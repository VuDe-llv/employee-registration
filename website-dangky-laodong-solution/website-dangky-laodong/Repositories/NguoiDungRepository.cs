using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface INguoiDungRepository
    {
        Task<IEnumerable<NguoiDung>> GetAllAsync();
        Task<NguoiDung> GetByIdAsync(string id);
        Task<NguoiDung> AddAsync(NguoiDung nguoiDung);
        Task UpdateAsync(NguoiDung nguoiDung);
        Task DeleteAsync(NguoiDung nguoiDung);
    }

    public class NguoiDungRepository : INguoiDungRepository
    {
        private readonly AppDbContext _context;

        public NguoiDungRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<NguoiDung>> GetAllAsync()
        {
            return await _context.NguoiDungs.Include(n => n.Lop).ToListAsync();
        }

        public async Task<NguoiDung> GetByIdAsync(string id)
        {
            return await _context.NguoiDungs.Include(n => n.Lop).FirstOrDefaultAsync(n => n.MaNguoiDung == id);
        }

        public async Task<NguoiDung> AddAsync(NguoiDung nguoiDung)
        {
            await _context.NguoiDungs.AddAsync(nguoiDung);
            await _context.SaveChangesAsync();
            return nguoiDung;
        }

        public async Task UpdateAsync(NguoiDung nguoiDung)
        {
            _context.Entry(nguoiDung).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(NguoiDung nguoiDung)
        {
            _context.NguoiDungs.Remove(nguoiDung);
            await _context.SaveChangesAsync();
        }
    }
}
