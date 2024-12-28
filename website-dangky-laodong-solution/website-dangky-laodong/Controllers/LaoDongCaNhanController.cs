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

        [HttpGet("by-week/{maTuanLaoDong}")]
        public async Task<IActionResult> GetByWeek(int maTuanLaoDong)
        {
            var ldCaNhans = await _service.GetByWeekAsync(maTuanLaoDong);
            if (!ldCaNhans.Any())
                return NotFound(new { message = "Không có dữ liệu lao động cá nhân cho tuần này." });

            return Ok(ldCaNhans);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (ldCaNhanDTO == null)
                return BadRequest(new { message = "Dữ liệu không hợp lệ." });

            var newLdCaNhan = await _service.AddAsync(ldCaNhanDTO);
            if (newLdCaNhan == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Không thể tạo dữ liệu Lao Dong Ca Nhan." });
            }

            return CreatedAtAction(nameof(GetById), new { id = newLdCaNhan.MaLDCaNhan }, newLdCaNhan);
        }

        [HttpPost("bulk-insert")]
        public async Task<IActionResult> AddBulk([FromQuery] DateTime ngayBatDau, [FromQuery] DateTime ngayKetThuc, [FromQuery] int maTuanLaoDong)
        {
            if (ngayBatDau > ngayKetThuc)
            {
                return BadRequest(new { message = "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc." });
            }

            await _service.AddBulkAsync(ngayBatDau, ngayKetThuc, maTuanLaoDong);
            return Ok(new { message = "Thêm dữ liệu hàng loạt thành công." });
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

        [HttpPut("info/{id}")]
        public async Task<IActionResult> UpdateInfo(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (id != ldCaNhanDTO.MaLDCaNhan)
                return BadRequest(new { message = "Mã lao động cá nhân không khớp với đường dẫn." });

            var updated = await _service.UpdateInfoAsync(id, ldCaNhanDTO);
            if (!updated)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpPut("deleteinfo/{id}")]
        public async Task<IActionResult> Delete(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (id != ldCaNhanDTO.MaLDCaNhan)
                return BadRequest(new { message = "Mã lao động cá nhân không khớp với đường dẫn." });

            var deleted = await _service.DeleteInfoAsync(id, ldCaNhanDTO);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(new { message = "Xóa thành công." });
        }

        [HttpPut("unsub/{id}")]
        public async Task<IActionResult> Unsub(int id, LaoDongCaNhanDTO ldCaNhanDTO)
        {
            if (id != ldCaNhanDTO.MaLDCaNhan)
                return BadRequest(new { message = "Mã lao động cá nhân không khớp với đường dẫn." });

            var deleted = await _service.UnsubAsync(id, ldCaNhanDTO);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy lao động cá nhân." });

            return Ok(new { message = "Hủy thành công." });
        }
    }
}
