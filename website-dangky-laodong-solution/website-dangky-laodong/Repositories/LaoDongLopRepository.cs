using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Models;

namespace website_dangky_laodong.Repositories
{
    public interface ILaoDongLopRepository
    {
        Task<IEnumerable<LaoDongLop>> GetPagedAsync(int page, int pageSize);
        Task<IEnumerable<LaoDongLop>> GetAllAsync();
        Task<LaoDongLop> GetByIdAsync(int id);
        Task<LaoDongLop> AddAsync(LaoDongLop ldLop);
        Task AddBulkAsync(IEnumerable<LaoDongLop> danhSachLaoDongLop);
        Task UpdateAsync(LaoDongLop ldLop);
        Task DeleteAsync(LaoDongLop ldLop);
    }
    public class LaoDongLopRepository : ILaoDongLopRepository
    {
        private readonly AppDbContext _context;

        public LaoDongLopRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LaoDongLop>> GetPagedAsync(int page, int pageSize)
        {
            return await _context.LaoDongLops
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .Skip((page - 1) * pageSize) // Bỏ qua các bản ghi đã qua
                .Take(pageSize) // Lấy số bản ghi theo trang
                .ToListAsync();
        }

        public async Task<IEnumerable<LaoDongLop>> GetAllAsync()
        {
            return await _context.LaoDongLops
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
                .ToListAsync();
        }

        public async Task<LaoDongLop> GetByIdAsync(int id)
        {
            return await _context.LaoDongLops
                .Include(ld => ld.Lop)
                .Include(ld => ld.TuanLaoDong)
                .Include(ld => ld.NguoiDung)
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

        public async Task DeleteAsync(LaoDongLop ldLop)
        {
            _context.LaoDongLops.Remove(ldLop);
            await _context.SaveChangesAsync();
        }
    }
}
