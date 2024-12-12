using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TuanLaoDongController : ControllerBase
    {
        private readonly ITuanLaoDongService _service;

        public TuanLaoDongController(ITuanLaoDongService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetTuanLaoDongs()
        {
            var tuanLaoDongs = await _service.GetAllAsync();
            return Ok(tuanLaoDongs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTuanLaoDong(int id)
        {
            var tuanLaoDong = await _service.GetByIdAsync(id);
            if (tuanLaoDong == null)
                return NotFound(new { message = "Không tìm thấy tuần lao động với mã được cung cấp." });

            return Ok(tuanLaoDong);
        }

        [HttpPost]
        public async Task<IActionResult> PostTuanLaoDong(TuanLaoDongDTO tuanLaoDongDTO)
        {
            if (string.IsNullOrWhiteSpace(tuanLaoDongDTO?.TenTuan))
                return BadRequest(new { message = "Tên tuần lao động không được để trống." });

            var newTuanLaoDong = await _service.AddAsync(tuanLaoDongDTO);
            if (newTuanLaoDong == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Không thể tạo tuần lao động." });
            }

            return CreatedAtAction(nameof(GetTuanLaoDong), new { id = newTuanLaoDong.MaTuanLaoDong }, newTuanLaoDong);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTuanLaoDong(int id, TuanLaoDongDTO tuanLaoDongDTO)
        {
            if (id != tuanLaoDongDTO.MaTuanLaoDong)
                return BadRequest(new { message = "Mã tuần lao động không khớp với đường dẫn." });

            var updated = await _service.UpdateAsync(id, tuanLaoDongDTO);
            if (!updated) return NotFound(new { message = "Không tìm thấy tuần lao động." });

            return Ok(new { message = "Cập nhật tuần lao động thành công." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTuanLaoDong(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound(new { message = "Không tìm thấy tuần lao động." });

            return Ok(new { message = "Xóa tuần lao động thành công." });
        }
    }
}
