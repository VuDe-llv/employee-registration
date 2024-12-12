using Microsoft.AspNetCore.Mvc;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaoDongCaNhanController : ControllerBase
    {
        private readonly ILaoDongCaNhanService _service;

        public LaoDongCaNhanController(ILaoDongCaNhanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var ldCaNhans = await _service.GetAllAsync();
            return Ok(ldCaNhans);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ldCaNhan = await _service.GetByIdAsync(id);
            if (ldCaNhan == null)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(ldCaNhan);
        }

        [HttpPost]
        public async Task<IActionResult> Create(LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (ldCaNhanDTO == null)
                return BadRequest(new { message = "Dữ liệu không hợp lệ." });

            var newLdCaNhan = await _service.AddAsync(ldCaNhanDTO);
            return CreatedAtAction(nameof(GetById), new { id = newLdCaNhan.MaLDCaNhan }, newLdCaNhan);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (id != ldCaNhanDTO.MaLDCaNhan)
                return BadRequest(new { message = "Mã lao động cá nhân không khớp với đường dẫn." });

            var updated = await _service.UpdateAsync(id, ldCaNhanDTO);
            if (!updated)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(new { message = "Xóa thành công." });
        }
    }
}
