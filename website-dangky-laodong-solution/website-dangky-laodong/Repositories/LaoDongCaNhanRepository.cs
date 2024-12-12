using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ILaoDongCaNhanRepository
    {
        Task<IEnumerable<LaoDongCaNhan>> GetAllAsync();
        Task<LaoDongCaNhan> GetByIdAsync(int id);
        Task<LaoDongCaNhan> AddAsync(LaoDongCaNhan ldCaNhan);
        Task UpdateAsync(LaoDongCaNhan ldCaNhan);
        Task DeleteAsync(LaoDongCaNhan ldCaNhan);
    }

    public class LaoDongCaNhanRepository : ILaoDongCaNhanRepository
    {
        private readonly AppDbContext _context;

        public LaoDongCaNhanRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LaoDongCaNhan>> GetAllAsync()
        {
            return await _context.LaoDongCaNhans
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .ToListAsync();
        }

        public async Task<LaoDongCaNhan> GetByIdAsync(int id)
        {
            return await _context.LaoDongCaNhans
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .FirstOrDefaultAsync(ld => ld.MaLDCaNhan == id);
        }

        public async Task<LaoDongCaNhan> AddAsync(LaoDongCaNhan ldCaNhan)
        {
            await _context.LaoDongCaNhans.AddAsync(ldCaNhan);
            await _context.SaveChangesAsync();
            return ldCaNhan;
        }

        public async Task UpdateAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.Entry(ldCaNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.LaoDongCaNhans.Remove(ldCaNhan);
            await _context.SaveChangesAsync();
        }
    }
}
