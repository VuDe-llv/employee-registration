using Microsoft.AspNetCore.Mvc;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NguoiDungController : ControllerBase
    {
        private readonly INguoiDungService _service;

        public NguoiDungController(INguoiDungService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetNguoiDungs()
        {
            var users = await _service.GetAllAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNguoiDung(string id)
        {
            var user = await _service.GetByIdAsync(id);
            if (user == null) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> PostNguoiDung(NguoiDungDTO nguoiDungDTO)
        {
            var newUser = await _service.AddAsync(nguoiDungDTO);
            return CreatedAtAction(nameof(GetNguoiDung), new { id = newUser.MaNguoiDung }, newUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutNguoiDung(string id, NguoiDungDTO nguoiDungDTO)
        {
            var updated = await _service.UpdateAsync(id, nguoiDungDTO);
            if (!updated) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNguoiDung(string id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = "Không tìm thấy người dùng." });

            return Ok(new { message = "Xóa thành công." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            var user = await _service.LoginAsync(loginDTO.MaNguoiDung, loginDTO.MatKhau);

            if (user == null)
                return Unauthorized(new { message = "Tài khoản hoặc mật khẩu không đúng." });

            return Ok(new
            {
                message = "Đăng nhập thành công.",
                user
            });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] DoiMatKhauDTO doiMatMhauDTO)
        {
            var result = await _service.ChangePasswordAsync(doiMatMhauDTO.MaNguoiDung, doiMatMhauDTO.OldMatKhau, doiMatMhauDTO.NewMatKhau);
            if (!result)
            {
                return BadRequest(new { message = "Mật khẩu hiện tại không đúng hoặc không thể đổi mật khẩu." });
            }

            return Ok(new { message = "Đổi mật khẩu thành công." });
        }
    }
}
