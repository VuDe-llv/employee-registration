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
    }
}
