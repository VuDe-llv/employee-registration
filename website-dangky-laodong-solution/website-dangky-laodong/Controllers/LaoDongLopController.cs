using Microsoft.AspNetCore.Mvc;
using website_dangky_laodong.DTOs;
using website_dangky_laodong.Services;

namespace website_dangky_laodong.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LaoDongLopController : ControllerBase
    {
        private readonly ILaoDongLopService _service;

        public LaoDongLopController(ILaoDongLopService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var ldLops = await _service.GetAllAsync();
            return Ok(ldLops);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ldLop = await _service.GetByIdAsync(id);
            if (ldLop == null)
                return NotFound(new { message = "Không tìm thấy lao động lớp." });

            return Ok(ldLop);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LaoDongLopDTO ldLopDTO)
        {
            if (ldLopDTO == null)
                return BadRequest(new { message = "Dữ liệu không hợp lệ." });

            var newLdLop = await _service.AddAsync(ldLopDTO);
            if (newLdLop == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Không thể tạo dữ liệu Lao Dong Lop." });
            }

            return CreatedAtAction(nameof(GetById), new { id = newLdLop.MaLDLop }, newLdLop);
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
        public async Task<IActionResult> Update(int id, LaoDongLopDTO ldLopDTO)
        {
            if (id != ldLopDTO.MaLDLop)
                return BadRequest(new { message = "Mã lao động lớp không khớp với đường dẫn." });

            var updated = await _service.UpdateAsync(id, ldLopDTO);
            if (!updated)
                return NotFound(new { message = "Không tìm thấy lao động lớp." });

            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpPut("info/{id}")]
        public async Task<IActionResult> UpdateInfo(int id, LaoDongLopDTO ldLopDTO)
        {
            if (id != ldLopDTO.MaLDLop)
                return BadRequest(new { message = "Mã lao động lớp không khớp với đường dẫn." });

            var updated = await _service.UpdateInfoAsync(id, ldLopDTO);
            if (!updated)
                return NotFound(new { message = "Không tìm thấy lao động lớp." });

            return Ok(new { message = "Cập nhật thành công." });
        }

        [HttpPut("deleteinfo/{id}")]
        public async Task<IActionResult> Delete(int id, LaoDongLopDTO ldLopDTO)
        {
            if (id != ldLopDTO.MaLDLop)
                return BadRequest(new { message = "Mã lao động lớp không khớp với đường dẫn." });

            var deleted = await _service.DeleteInfoAsync(id, ldLopDTO);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy lao động lớp." });

            return Ok(new { message = "Xóa thành công." });
        }

        [HttpPut("unsub/{id}")]
        public async Task<IActionResult> Unsub(int id, LaoDongLopDTO ldLopDTO)
        {
            if (id != ldLopDTO.MaLDLop)
                return BadRequest(new { message = "Mã lao động lớp không khớp với đường dẫn." });

            var deleted = await _service.UnsubAsync(id, ldLopDTO);
            if (!deleted)
                return NotFound(new { message = "Không tìm thấy lao động lớp." });

            return Ok(new { message = "Hủy thành công." });
        }
    }
}
