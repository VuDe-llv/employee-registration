using Microsoft.EntityFrameworkCore;
using website_dangky_laodong.Data;
using website_dangky_laodong.Repositories;
using website_dangky_laodong.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình CORS để chỉ cho phép các origin cụ thể
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Register repositories
builder.Services.AddScoped<IKhoaRepository, KhoaRepository>();
builder.Services.AddScoped<ILaoDongCaNhanRepository, LaoDongCaNhanRepository>();
builder.Services.AddScoped<ILaoDongLopRepository, LaoDongLopRepository>();
builder.Services.AddScoped<ILopRepository, LopRepository>();
builder.Services.AddScoped<INguoiDungRepository, NguoiDungRepository>();
builder.Services.AddScoped<ITuanLaoDongRepository, TuanLaoDongRepository>();
builder.Services.AddScoped<IKhuVucPhanCongRepository, KhuVucPhanCongRepository>();

// Register services
builder.Services.AddScoped<IKhoaService, KhoaService>();
builder.Services.AddScoped<ILaoDongCaNhanService, LaoDongCaNhanService>();
builder.Services.AddScoped<ILaoDongLopService, LaoDongLopService>();
builder.Services.AddScoped<ILopService, LopService>();
builder.Services.AddScoped<INguoiDungService, NguoiDungService>();
builder.Services.AddScoped<ITuanLaoDongService, TuanLaoDongService>();
builder.Services.AddScoped<IKhuVucPhanCongService, KhuVucPhanCongService>();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Cấu hình middleware CORS để sử dụng chính sách đã định
app.UseCors("AllowLocalhost3000");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
