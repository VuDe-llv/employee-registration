using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ILaoDongCaNhanRepository
    {
        Task<IEnumerable<LaoDongCaNhan>> GetAllAsync();
        Task<LaoDongCaNhan> GetByIdAsync(int id);
        Task<IEnumerable<LaoDongCaNhan>> GetByWeekAsync(int maTuanLaoDong);
        Task<LaoDongCaNhan> AddAsync(LaoDongCaNhan ldCaNhan);
        Task AddBulkAsync(IEnumerable<LaoDongCaNhan> danhSachLaoDongCaNhan);
        Task UpdateAsync(LaoDongCaNhan ldCaNhan);
        Task UpdateInfoAsync(LaoDongCaNhan ldCaNhan);
        Task DeleteInfoAsync(LaoDongCaNhan ldCaNhan);
        Task UnsubAsync(LaoDongCaNhan ldCaNhan);
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
                .Include(ld => ld.KhuVucPhanCong)
                .ToListAsync();
        }

        public async Task<LaoDongCaNhan> GetByIdAsync(int id)
        {
            return await _context.LaoDongCaNhans
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .Include(ld => ld.KhuVucPhanCong)
                .FirstOrDefaultAsync(ld => ld.MaLDCaNhan == id);
        }

        public async Task<IEnumerable<LaoDongCaNhan>> GetByWeekAsync(int maTuanLaoDong)
        {
            return await _context.LaoDongCaNhans
                .Where(ld => ld.MaTuanLaoDong == maTuanLaoDong)
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .Include(ld => ld.KhuVucPhanCong)
                .ToListAsync();
        }

        public async Task<LaoDongCaNhan> AddAsync(LaoDongCaNhan ldCaNhan)
        {
            await _context.LaoDongCaNhans.AddAsync(ldCaNhan);
            await _context.SaveChangesAsync();
            return ldCaNhan;
        }

        public async Task AddBulkAsync(IEnumerable<LaoDongCaNhan> danhSachLaoDongCaNhan)
        {
            await _context.LaoDongCaNhans.AddRangeAsync(danhSachLaoDongCaNhan);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.Entry(ldCaNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInfoAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.Entry(ldCaNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInfoAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.Entry(ldCaNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UnsubAsync(LaoDongCaNhan ldCaNhan)
        {
            _context.Entry(ldCaNhan).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
