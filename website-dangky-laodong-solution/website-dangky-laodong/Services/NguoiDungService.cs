using website_dangky_laodong.DTOs;
using website_dangky_laodong.Models;
using website_dangky_laodong.Repositories;

namespace website_dangky_laodong.Services
{
    public interface INguoiDungService
    {
        Task<IEnumerable<NguoiDungDTO>> GetAllAsync();
        Task<NguoiDungDTO> GetByIdAsync(string id);
        Task<NguoiDungDTO> AddAsync(NguoiDungDTO nguoiDungDTO);
        Task<bool> UpdateAsync(string id, NguoiDungDTO nguoiDungDTO);
        Task<bool> DeleteAsync(string id);
        Task<NguoiDungDTO> LoginAsync(string maNguoiDung, string matKhau);
        Task<bool> ChangePasswordAsync(string maNguoiDung, string oldMatKhau, string newMatKhau);
    }

    public class NguoiDungService : INguoiDungService
    {
        private readonly INguoiDungRepository _repository;

        public NguoiDungService(INguoiDungRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<NguoiDungDTO>> GetAllAsync()
        {
            var users = await _repository.GetAllAsync();
            return users.Select(u => new NguoiDungDTO
            {
                MaNguoiDung = u.MaNguoiDung,
                TenNguoiDung = u.TenNguoiDung,
                SoDienThoai = u.SoDienThoai,
                Email = u.Email,
                VaiTro = u.VaiTro,
                MaLop = u.MaLop
            });
        }

        public async Task<NguoiDungDTO> GetByIdAsync(string id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return null;

            return new NguoiDungDTO
            {
                MaNguoiDung = user.MaNguoiDung,
                TenNguoiDung = user.TenNguoiDung,
                SoDienThoai = user.SoDienThoai,
                Email = user.Email,
                VaiTro = user.VaiTro,
                MaLop = user.MaLop
            };
        }

        public async Task<NguoiDungDTO> AddAsync(NguoiDungDTO nguoiDungDTO)
        {
            // Tự động gán mật khẩu là mã người dùng
            var user = new NguoiDung
            {
                MaNguoiDung = nguoiDungDTO.MaNguoiDung,
                TenNguoiDung = nguoiDungDTO.TenNguoiDung,
                SoDienThoai = nguoiDungDTO.SoDienThoai,
                Email = nguoiDungDTO.Email,
                MatKhau = nguoiDungDTO.MaNguoiDung,
                VaiTro = nguoiDungDTO.VaiTro,
                MaLop = nguoiDungDTO.MaLop
            };

            var addedUser = await _repository.AddAsync(user);

            return new NguoiDungDTO
            {
                MaNguoiDung = addedUser.MaNguoiDung,
                TenNguoiDung = addedUser.TenNguoiDung,
                SoDienThoai = addedUser.SoDienThoai,
                Email = addedUser.Email,
                VaiTro = addedUser.VaiTro,
                MaLop = addedUser.MaLop
            };
        }

        public async Task<bool> UpdateAsync(string id, NguoiDungDTO nguoiDungDTO)
        {
            var existingUser = await _repository.GetByIdAsync(id);
            if (existingUser == null) return false;

            existingUser.TenNguoiDung = nguoiDungDTO.TenNguoiDung;
            existingUser.SoDienThoai = nguoiDungDTO.SoDienThoai;
            existingUser.Email = nguoiDungDTO.Email;
            existingUser.VaiTro = nguoiDungDTO.VaiTro;
            existingUser.MaLop = nguoiDungDTO.MaLop;

            await _repository.UpdateAsync(existingUser);
            return true;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null) return false;

            await _repository.DeleteAsync(user);
            return true;
        }

        public async Task<NguoiDungDTO> LoginAsync(string maNguoiDung, string matKhau)
        {
            var user = await _repository.GetByIdAsync(maNguoiDung);
            if (user == null || user.MatKhau != matKhau)
                return null;

            return new NguoiDungDTO
            {
                MaNguoiDung = user.MaNguoiDung,
                TenNguoiDung = user.TenNguoiDung,
                SoDienThoai = user.SoDienThoai,
                Email = user.Email,
                VaiTro = user.VaiTro,
                MaLop = user.MaLop
            };
        }

        public async Task<bool> ChangePasswordAsync(string maNguoiDung, string oldMatKhau, string newMatKhau)
        {
            var user = await _repository.GetByIdAsync(maNguoiDung);
            if (user == null) return false;

            // Kiểm tra mật khẩu hiện tại có đúng không
            if (user.MatKhau != oldMatKhau)
            {
                return false; // Mật khẩu hiện tại không đúng
            }

            // Cập nhật mật khẩu mới
            user.MatKhau = newMatKhau;
            await _repository.UpdateAsync(user);
            return true;
        }
    }
}
