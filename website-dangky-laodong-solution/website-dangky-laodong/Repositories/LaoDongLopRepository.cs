using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ILaoDongLopRepository
    {
        Task<IEnumerable<LaoDongLop>> GetAllAsync();
        Task<LaoDongLop> GetByIdAsync(int id);
        Task<LaoDongLop> AddAsync(LaoDongLop ldLop);
        Task AddBulkAsync(IEnumerable<LaoDongLop> danhSachLaoDongLop);
        Task UpdateAsync(LaoDongLop ldLop);
        Task UpdateInfoAsync(LaoDongLop ldLop);
        Task DeleteInfoAsync(LaoDongLop ldLop);
        Task UnsubAsync(LaoDongLop ldLop);
    }

    public class LaoDongLopRepository : ILaoDongLopRepository
    {
        private readonly AppDbContext _context;

        public LaoDongLopRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LaoDongLop>> GetAllAsync()
        {
            return await _context.LaoDongLops
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .Include(ld => ld.KhuVucPhanCong)
                .ToListAsync();
        }

        public async Task<LaoDongLop> GetByIdAsync(int id)
        {
            return await _context.LaoDongLops
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .Include(ld => ld.KhuVucPhanCong)
                .FirstOrDefaultAsync(ld => ld.MaLDLop == id);
        }

        public async Task<LaoDongLop> AddAsync(LaoDongLop ldLop)
        {
            await _context.LaoDongLops.AddAsync(ldLop);
            await _context.SaveChangesAsync();
            return ldLop;
        }

        public async Task AddBulkAsync(IEnumerable<LaoDongLop> danhSachLaoDongLop)
        {
            await _context.LaoDongLops.AddRangeAsync(danhSachLaoDongLop);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LaoDongLop ldLop)
        {
            _context.Entry(ldLop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateInfoAsync(LaoDongLop ldLop)
        {
            _context.Entry(ldLop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInfoAsync(LaoDongLop ldLop)
        {
            _context.Entry(ldLop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task UnsubAsync(LaoDongLop ldLop)
        {
            _context.Entry(ldLop).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
