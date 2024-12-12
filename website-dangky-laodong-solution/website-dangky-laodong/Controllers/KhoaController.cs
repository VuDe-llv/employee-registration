using Microsoft.AspNetCore.Mvc;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KhoaController : ControllerBase
    {
        private readonly IKhoaService _service;

        public KhoaController(IKhoaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetKhoas()
        {
            var khoas = await _service.GetAllAsync();
            return Ok(khoas);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetKhoa(int id)
        {
            var khoa = await _service.GetByIdAsync(id);
            if (khoa == null) return NotFound(new { message = "Không tìm thấy khoa với mã được cung cấp." });

            return Ok(khoa);
        }

        [HttpPost]
        public async Task<IActionResult> PostKhoa(KhoaDTO khoaDTO)
        {
            if (string.IsNullOrWhiteSpace(khoaDTO?.TenKhoa))
                return BadRequest(new { message = "Tên khoa không được để trống." });

            var newKhoa = await _service.AddAsync(khoaDTO);
            return CreatedAtAction(nameof(GetKhoa), new { id = newKhoa.MaKhoa }, newKhoa);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutKhoa(int id, KhoaDTO khoaDTO)
        {
            if (id != khoaDTO.MaKhoa)
                return BadRequest(new { message = "Mã khoa không khớp với đường dẫn." });

            var updated = await _service.UpdateAsync(id, khoaDTO);
            if (!updated) return NotFound(new { message = "Không tìm thấy khoa." });

            return Ok(new { message = "Cập nhật khoa thành công." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKhoa(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = "Không tìm thấy khoa." });

            return Ok(new { message = "Xóa khoa thành công." });
        }
    }
}
