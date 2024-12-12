using Microsoft.AspNetCore.Mvc;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LopController : ControllerBase
    {
        private readonly ILopService _service;

        public LopController(ILopService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetLops()
        {
            var lops = await _service.GetAllAsync();
            return Ok(lops);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLop(int id)
        {
            var lop = await _service.GetByIdAsync(id);
            if (lop == null) return NotFound(new { message = "Không tìm thấy lớp với mã được cung cấp." });

            return Ok(lop);
        }

        [HttpPost]
        public async Task<IActionResult> PostLop(LopDTO lopDTO)
        {
            if (string.IsNullOrWhiteSpace(lopDTO?.TenLop))
                return BadRequest(new { message = "Tên lớp không được để trống." });

            var newLop = await _service.AddAsync(lopDTO);
            return CreatedAtAction(nameof(GetLop), new { id = newLop.MaLop }, newLop);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLop(int id, LopDTO lopDTO)
        {
            if (id != lopDTO.MaLop)
                return BadRequest(new { message = "Mã lớp không khớp với đường dẫn." });

            var updated = await _service.UpdateAsync(id, lopDTO);
            if (!updated) return NotFound(new { message = "Không tìm thấy lớp." });

            return Ok(new { message = "Cập nhật lớp thành công." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLop(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = "Không tìm thấy lớp." });

            return Ok(new { message = "Xóa lớp thành công." });
        }
    }
}
