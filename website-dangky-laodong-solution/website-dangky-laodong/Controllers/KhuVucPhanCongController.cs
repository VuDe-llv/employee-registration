    using Microsoft.AspNetCore.Mvc;
    using website_dangky_laodong.DTOs;
    using website_dangky_laodong.Services;

    namespace website_dangky_laodong.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class KhuVucPhanCongController : ControllerBase
        {
            private readonly IKhuVucPhanCongService _service;

            public KhuVucPhanCongController(IKhuVucPhanCongService service)
            {
                _service = service;
            }

            [HttpGet]
            public async Task<IActionResult> GetKhuVucPhanCongs()
            {
                var khuVucPhanCongs = await _service.GetAllAsync();
                return Ok(khuVucPhanCongs);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetKhuVucPhanCong(int id)
            {
                var khuVucPhanCong = await _service.GetByIdAsync(id);
                if (khuVucPhanCong == null)
                    return NotFound(new { message = "Không tìm thấy khu vực phân công với mã được cung cấp." });

                return Ok(khuVucPhanCong);
            }

            [HttpPost]
            public async Task<IActionResult> PostKhuVucPhanCong(KhuVucPhanCongDTO khuVucPhanCongDTO)
            {
                if (string.IsNullOrWhiteSpace(khuVucPhanCongDTO?.TenKhuVuc))
                    return BadRequest(new { message = "Tên khu vực phân công không được để trống." });

                var newKhuVucPhanCong = await _service.AddAsync(khuVucPhanCongDTO);
                if (newKhuVucPhanCong == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Không thể tạo khu vực phân công." });
                }

                return CreatedAtAction(nameof(GetKhuVucPhanCong), new { id = newKhuVucPhanCong.MaKhuVuc }, newKhuVucPhanCong);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> PutKhuVucPhanCong(int id, KhuVucPhanCongDTO khuVucPhanCongDTO)
            {
                if (id != khuVucPhanCongDTO.MaKhuVuc)
                    return BadRequest(new { message = "Mã khu vực phân công không khớp với đường dẫn." });

                var updated = await _service.UpdateAsync(id, khuVucPhanCongDTO);
                if (!updated) return NotFound(new { message = "Không tìm thấy khu vực phân công." });

                return Ok(new { message = "Cập nhật khu vực phân công thành công." });
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteKhuVucPhanCong(int id)
            {
                var deleted = await _service.DeleteAsync(id);
                if (!deleted) return NotFound(new { message = "Không tìm thấy khu vực phân công." });

                return Ok(new { message = "Xóa khu vực phân công thành công." });
            }
        }
    }
