USE [DB_DKLD]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Khoas]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Khoas](
	[MaKhoa] [int] IDENTITY(1,1) NOT NULL,
	[TenKhoa] [nvarchar](100) NULL,
 CONSTRAINT [PK_Khoas] PRIMARY KEY CLUSTERED 
(
	[MaKhoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhuVucPhanCongs]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhuVucPhanCongs](
	[MaKhuVuc] [int] IDENTITY(1,1) NOT NULL,
	[TenKhuVuc] [nvarchar](100) NULL,
	[MoTaKhuVuc] [nvarchar](100) NULL,
 CONSTRAINT [PK_KhuVucPhanCongs] PRIMARY KEY CLUSTERED 
(
	[MaKhuVuc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LaoDongCaNhans]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LaoDongCaNhans](
	[MaLDCaNhan] [int] IDENTITY(1,1) NOT NULL,
	[NgayLaoDong] [datetime2](7) NOT NULL,
	[BuoiLaoDong] [nvarchar](50) NULL,
	[ThoiGianDangKy] [datetime2](7) NULL,
	[MaLop] [int] NULL,
	[MaNguoiDung] [nvarchar](450) NULL,
	[TrangThai] [nvarchar](50) NULL,
	[MaTuanLaoDong] [int] NULL,
	[MaKhuVuc] [int] NULL,
 CONSTRAINT [PK_LaoDongCaNhans] PRIMARY KEY CLUSTERED 
(
	[MaLDCaNhan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LaoDongLops]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LaoDongLops](
	[MaLDLop] [int] IDENTITY(1,1) NOT NULL,
	[NgayLaoDong] [datetime2](7) NOT NULL,
	[BuoiLaoDong] [nvarchar](50) NULL,
	[ThoiGianDangKy] [datetime2](7) NULL,
	[MaLop] [int] NULL,
	[MaNguoiDung] [nvarchar](450) NULL,
	[TrangThai] [nvarchar](50) NULL,
	[MaTuanLaoDong] [int] NULL,
	[MaKhuVuc] [int] NULL,
 CONSTRAINT [PK_LaoDongLops] PRIMARY KEY CLUSTERED 
(
	[MaLDLop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lops]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lops](
	[MaLop] [int] IDENTITY(1,1) NOT NULL,
	[TenLop] [nvarchar](100) NULL,
	[MaKhoa] [int] NULL,
 CONSTRAINT [PK_Lops] PRIMARY KEY CLUSTERED 
(
	[MaLop] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NguoiDungs]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NguoiDungs](
	[MaNguoiDung] [nvarchar](450) NOT NULL,
	[TenNguoiDung] [nvarchar](200) NULL,
	[SoDienThoai] [nvarchar](15) NULL,
	[Email] [nvarchar](100) NULL,
	[MatKhau] [nvarchar](max) NOT NULL,
	[VaiTro] [nvarchar](max) NOT NULL,
	[MaLop] [int] NULL,
 CONSTRAINT [PK_NguoiDungs] PRIMARY KEY CLUSTERED 
(
	[MaNguoiDung] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TuanLaoDongs]    Script Date: 12/28/2024 9:24:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TuanLaoDongs](
	[MaTuanLaoDong] [int] IDENTITY(1,1) NOT NULL,
	[TenTuan] [nvarchar](100) NULL,
	[NgayBatDau] [datetime2](7) NOT NULL,
	[NgayKetThuc] [datetime2](7) NOT NULL,
	[LoaiLaoDong] [nvarchar](50) NULL,
 CONSTRAINT [PK_TuanLaoDongs] PRIMARY KEY CLUSTERED 
(
	[MaTuanLaoDong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241226094938_InitialCreate', N'8.0.10')
GO
SET IDENTITY_INSERT [dbo].[Khoas] ON 

INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (2, N'Sư phạm Toán - Tin')
INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (3, N'Sư phạm Ngữ văn')
INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (4, N'Giáo dục Tiểu học và Mầm non')
INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (5, N'Ngoại ngữ')
INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (6, N'Giáo dục thể chất - Quốc phòng an ninh')
INSERT [dbo].[Khoas] ([MaKhoa], [TenKhoa]) VALUES (7, N'Công nghệ và Kỹ thuật')
SET IDENTITY_INSERT [dbo].[Khoas] OFF
GO
SET IDENTITY_INSERT [dbo].[KhuVucPhanCongs] ON 

INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (2, N'Dãy A1', N'Vệ sinh khu vực trước Dãy A1')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (3, N'Tòa C1', N'Vệ sinh 3 sân bóng chuyền gần khu vực C1')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (4, N'Sân bóng rổ', N'Vệ sinh khu vực sân bóng rổ ngang dãy B4')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (5, N'Cổng A - Cổng B', N'Vệ sinh vỉa hè từ cổng A đến cổng B')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (6, N'Cổng B - Cổng C', N'Vệ sinh vỉa hè từ cổng B đến cổng C')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (1002, N'Cổng C', N'Vệ sinh đường chạy trước C1')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (1003, N'Dãy B4', N'Vệ sinh khu vực trước Dãy B4')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (1004, N'Giảng đường 1', N'Dọn dẹp vệ sinh quanh giảng đường 1')
INSERT [dbo].[KhuVucPhanCongs] ([MaKhuVuc], [TenKhuVuc], [MoTaKhuVuc]) VALUES (1005, N'Dãy A9', N'Vệ sinh khu vực trước dãy A9')
SET IDENTITY_INSERT [dbo].[KhuVucPhanCongs] OFF
GO
SET IDENTITY_INSERT [dbo].[LaoDongCaNhans] ON 

INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:12:34.7435320' AS DateTime2), 1, N'0021410087', N'Hoàn thành', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (2, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-26T17:27:30.6420269' AS DateTime2), 2, N'0021411653', N'Hoàn thành', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (3, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-26T17:28:31.6648983' AS DateTime2), 2, N'0021412313', N'Hoàn thành', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (4, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-26T17:39:51.1075792' AS DateTime2), 2, N'0021411949', N'Hoàn thành', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (5, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:14:10.6561893' AS DateTime2), 1, N'0021412546', N'Hoàn thành', 1, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (6, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:23.0675985' AS DateTime2), 5, N'0022420002', N'Đang thực hiện', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (7, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-26T17:27:50.1543756' AS DateTime2), 2, N'0021411653', N'Đang thực hiện', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (8, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-26T17:36:30.7260544' AS DateTime2), 2, N'0021412313', N'Đang thực hiện', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (9, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-26T17:40:07.2813187' AS DateTime2), 2, N'0021411949', N'Đang thực hiện', 1, 3)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (10, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:12:39.7036218' AS DateTime2), 1, N'0021410087', N'Đang thực hiện', 1, 3)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (11, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-26T17:42:28.6709959' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (12, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-26T17:43:16.0474453' AS DateTime2), 2, N'0021411653', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (13, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:14:16.0497485' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (14, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:15:26.4710620' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (15, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:16:45.8557703' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (16, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-26T17:52:47.9440970' AS DateTime2), 2, N'0021411653', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (17, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:29.2959344' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (18, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:13:05.0874723' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (19, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:16:48.7824791' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (20, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:18:30.9629881' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (21, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:23:29.9107315' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (22, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:14:20.6606940' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (23, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:16:53.5482567' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (24, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:15:32.7523886' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (25, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:18:33.6503105' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 1002)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (26, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:16:58.0723797' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (27, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:13:11.0812611' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (28, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:18:37.2428932' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (29, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:36.3261892' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (30, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:23:33.6519606' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (31, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:02.0270744' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (32, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:14:25.2410058' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (33, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:01.2651044' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (34, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:18:40.3842441' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (35, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:22:35.6049529' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1002)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (36, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:18:43.8798382' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (37, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:13:16.9798689' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (38, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:42.1628139' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (39, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:04.5630557' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (40, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:19:53.7222312' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (41, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:13:24.8083923' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (42, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:18:47.3445919' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 1005)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (43, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:15:45.1889474' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (44, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:07.7020478' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (45, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:23:37.4036627' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 3)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (46, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:08.2205926' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (47, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:14:31.8823467' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (48, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:48.0802029' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (49, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:25:16.7470336' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (50, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:23:40.1102553' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (51, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:10.5571331' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (52, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:18:50.7692640' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (53, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:19:58.8874131' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 5)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (54, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:22:42.5017308' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (55, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:23:44.0956264' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1, 6)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (56, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:13.5646055' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (57, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:18:53.5580327' AS DateTime2), 2, N'0021412313', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (58, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:15:51.8113221' AS DateTime2), 5, N'0022420002', N'Đã đăng ký', 1, 1003)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (59, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:13:30.7767511' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (60, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:20:02.2964346' AS DateTime2), 1, N'0021412546', N'Đã đăng ký', 1, 1004)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1002, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T11:32:49.4351281' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1002, 4)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1003, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1004, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1005, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1006, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1007, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1008, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1009, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1010, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1011, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1012, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1013, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1014, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1015, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1016, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1017, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1018, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1019, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1020, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1021, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1022, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1023, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1024, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1025, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1026, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1027, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1028, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1029, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1030, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1031, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1032, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1033, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1034, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1035, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1036, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1037, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1038, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1039, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1040, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
GO
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1041, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1042, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1043, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1044, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1045, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1046, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1047, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1048, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1049, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1050, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1051, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1052, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1053, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1054, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1055, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1056, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1057, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1058, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1059, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1060, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
INSERT [dbo].[LaoDongCaNhans] ([MaLDCaNhan], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1061, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1002, NULL)
SET IDENTITY_INSERT [dbo].[LaoDongCaNhans] OFF
GO
SET IDENTITY_INSERT [dbo].[LaoDongLops] ON 

INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:18.8109790' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (2, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 2, 3)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (3, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:14.6696354' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (4, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:31:31.3199794' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 3)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (5, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:35:33.5254302' AS DateTime2), 6, N'0023430006', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (6, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:24.9977921' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (7, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:17.9043910' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 4)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (8, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:23:53.4162102' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 1002)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (9, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:21.7648735' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (10, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:31:34.1027954' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 6)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (11, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:20.5673395' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (12, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:23:56.0818017' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (13, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:31:36.5645232' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 5)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (14, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:27.7252568' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1003)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (15, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:23.4788732' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 1002)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (16, CAST(N'2024-12-17T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:23:58.7728051' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (17, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:30.6021014' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (18, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:31:39.4843339' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (19, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:25.9122558' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 1005)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (20, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:24:01.4337052' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 1005)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (21, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:35:37.0714776' AS DateTime2), 6, N'0023430006', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (22, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:25:25.7939341' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1003)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (23, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:24:05.1061462' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (24, CAST(N'2024-12-18T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:29.0921160' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 3)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (25, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:33.0611413' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 5)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (26, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:31:42.9271449' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 1003)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (27, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:24:08.4216540' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (28, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:31.8484813' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 6)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (29, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:35:39.8316748' AS DateTime2), 6, N'0023430006', N'Đã đăng ký', 2, 5)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (30, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:31:45.4145505' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 1003)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (31, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:35.6017900' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 3)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (32, CAST(N'2024-12-19T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:24:11.4370855' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 1002)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (33, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:34.3476243' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 6)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (34, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:31:47.7414217' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 4)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (35, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:24:15.0471460' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (36, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:17:38.4297124' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1005)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (37, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:31:50.3750518' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (38, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:24:21.9996034' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 6)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (39, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:36.5360434' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 1002)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (40, CAST(N'2024-12-20T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:43.9206985' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1004)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (41, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:24:17.7004419' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (42, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:35:42.8615654' AS DateTime2), 6, N'0023430006', N'Đã đăng ký', 2, 6)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (43, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:26:39.6370895' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 5)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (44, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T08:25:30.7843861' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 4)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (45, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:24:25.3282498' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 2, 2)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (46, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:17:47.3432059' AS DateTime2), 5, N'0022420001', N'Đã đăng ký', 2, 1005)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (47, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:26:42.2376314' AS DateTime2), 1, N'0021410087', N'Đã đăng ký', 2, 3)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (48, CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T08:31:53.7459710' AS DateTime2), 3, N'0024450003', N'Đã đăng ký', 2, 1002)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1002, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', CAST(N'2024-12-27T11:33:17.3743738' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1003, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1004, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1005, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1006, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', CAST(N'2024-12-27T11:34:06.3177474' AS DateTime2), 2, N'0021411949', N'Đã đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1007, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1008, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1009, CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1010, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1011, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1012, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1013, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1014, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1015, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1016, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1017, CAST(N'2024-12-24T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1018, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1019, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1020, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1021, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1022, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1023, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1024, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1025, CAST(N'2024-12-25T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1026, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1027, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1028, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1029, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1030, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1031, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1032, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1033, CAST(N'2024-12-26T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1034, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1035, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1036, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1037, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1038, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1039, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1040, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1041, CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1042, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1043, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1044, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1045, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Sáng', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1046, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1047, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1048, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
INSERT [dbo].[LaoDongLops] ([MaLDLop], [NgayLaoDong], [BuoiLaoDong], [ThoiGianDangKy], [MaLop], [MaNguoiDung], [TrangThai], [MaTuanLaoDong], [MaKhuVuc]) VALUES (1049, CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Chiều', NULL, NULL, NULL, N'Chưa đăng ký', 1003, NULL)
SET IDENTITY_INSERT [dbo].[LaoDongLops] OFF
GO
SET IDENTITY_INSERT [dbo].[Lops] ON 

INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (1, N'ĐHCNTT21A', 7)
INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (2, N'ĐHCNTT21B', 7)
INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (3, N'ĐHKTXD24A', 7)
INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (4, N'ĐHSTOAN21A', 2)
INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (5, N'ĐHSTIN22A', 2)
INSERT [dbo].[Lops] ([MaLop], [TenLop], [MaKhoa]) VALUES (6, N'ĐHSANH23B', 5)
SET IDENTITY_INSERT [dbo].[Lops] OFF
GO
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0021410087', N'Nguyễn Hải Đăng', N'0943572251', N'haidang1234@gmail.com', N'0021410087', N'represent', 1)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0021411653', N'Trần Hoàng Phúc', N'0783914486', N'hoangphuc2003@gmail.com', N'0021411653', N'user', 2)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0021411949', N'Lại Lâm Vũ', N'0907891780', N'lailamvu2003@gmail.com', N'0021411949', N'represent', 2)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0021412313', N'Bùi Ngọc Hải', N'0344363127', N'ngochai0957@gmail.com', N'0021412313', N'user', 2)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0021412546', N'Nguyễn Thị Thúy Kiều', N'0906353603', N'thuykieu2003@gmail.com', N'0021412546', N'user', 1)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0022420001', N'Nguyễn Văn A', N'0344363746', N'nguyenvana1234@gmail.com', N'0022420001', N'represent', 5)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0022420002', N'Lê Thị B', N'0783912275', N'lethib1234@gmail.com', N'0022420002', N'user', 5)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0023430006', N'Trần Văn E', N'0943570026', N'tranvane1234@gmail.com', N'0023430006', N'represent', 6)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0024450003', N'Trần Văn C', N'0906351314', N'tranvanc1234@gmail.com', N'0024450003', N'represent', 3)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'0024450005', N'Nguyễn Thị D', N'0943578863', N'nguyenthid1234@gmail.com', N'0024450005', N'user', 3)
INSERT [dbo].[NguoiDungs] ([MaNguoiDung], [TenNguoiDung], [SoDienThoai], [Email], [MatKhau], [VaiTro], [MaLop]) VALUES (N'admin123', N'Admin', N'0987654321', N'admin@gmail.com', N'admin123', N'admin', NULL)
GO
SET IDENTITY_INSERT [dbo].[TuanLaoDongs] ON 

INSERT [dbo].[TuanLaoDongs] ([MaTuanLaoDong], [TenTuan], [NgayBatDau], [NgayKetThuc], [LoaiLaoDong]) VALUES (1, N'Tuần 1', CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Lao động cá nhân')
INSERT [dbo].[TuanLaoDongs] ([MaTuanLaoDong], [TenTuan], [NgayBatDau], [NgayKetThuc], [LoaiLaoDong]) VALUES (2, N'Tuần 1', CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-21T00:00:00.0000000' AS DateTime2), N'Lao động lớp')
INSERT [dbo].[TuanLaoDongs] ([MaTuanLaoDong], [TenTuan], [NgayBatDau], [NgayKetThuc], [LoaiLaoDong]) VALUES (1002, N'Tuần 2', CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Lao động cá nhân')
INSERT [dbo].[TuanLaoDongs] ([MaTuanLaoDong], [TenTuan], [NgayBatDau], [NgayKetThuc], [LoaiLaoDong]) VALUES (1003, N'Tuần 2', CAST(N'2024-12-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-28T00:00:00.0000000' AS DateTime2), N'Lao động lớp')
SET IDENTITY_INSERT [dbo].[TuanLaoDongs] OFF
GO
ALTER TABLE [dbo].[LaoDongCaNhans]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongCaNhans_KhuVucPhanCongs_MaKhuVuc] FOREIGN KEY([MaKhuVuc])
REFERENCES [dbo].[KhuVucPhanCongs] ([MaKhuVuc])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongCaNhans] CHECK CONSTRAINT [FK_LaoDongCaNhans_KhuVucPhanCongs_MaKhuVuc]
GO
ALTER TABLE [dbo].[LaoDongCaNhans]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongCaNhans_Lops_MaLop] FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lops] ([MaLop])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongCaNhans] CHECK CONSTRAINT [FK_LaoDongCaNhans_Lops_MaLop]
GO
ALTER TABLE [dbo].[LaoDongCaNhans]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongCaNhans_NguoiDungs_MaNguoiDung] FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDungs] ([MaNguoiDung])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongCaNhans] CHECK CONSTRAINT [FK_LaoDongCaNhans_NguoiDungs_MaNguoiDung]
GO
ALTER TABLE [dbo].[LaoDongCaNhans]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongCaNhans_TuanLaoDongs_MaTuanLaoDong] FOREIGN KEY([MaTuanLaoDong])
REFERENCES [dbo].[TuanLaoDongs] ([MaTuanLaoDong])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongCaNhans] CHECK CONSTRAINT [FK_LaoDongCaNhans_TuanLaoDongs_MaTuanLaoDong]
GO
ALTER TABLE [dbo].[LaoDongLops]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongLops_KhuVucPhanCongs_MaKhuVuc] FOREIGN KEY([MaKhuVuc])
REFERENCES [dbo].[KhuVucPhanCongs] ([MaKhuVuc])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongLops] CHECK CONSTRAINT [FK_LaoDongLops_KhuVucPhanCongs_MaKhuVuc]
GO
ALTER TABLE [dbo].[LaoDongLops]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongLops_Lops_MaLop] FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lops] ([MaLop])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongLops] CHECK CONSTRAINT [FK_LaoDongLops_Lops_MaLop]
GO
ALTER TABLE [dbo].[LaoDongLops]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongLops_NguoiDungs_MaNguoiDung] FOREIGN KEY([MaNguoiDung])
REFERENCES [dbo].[NguoiDungs] ([MaNguoiDung])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongLops] CHECK CONSTRAINT [FK_LaoDongLops_NguoiDungs_MaNguoiDung]
GO
ALTER TABLE [dbo].[LaoDongLops]  WITH CHECK ADD  CONSTRAINT [FK_LaoDongLops_TuanLaoDongs_MaTuanLaoDong] FOREIGN KEY([MaTuanLaoDong])
REFERENCES [dbo].[TuanLaoDongs] ([MaTuanLaoDong])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[LaoDongLops] CHECK CONSTRAINT [FK_LaoDongLops_TuanLaoDongs_MaTuanLaoDong]
GO
ALTER TABLE [dbo].[Lops]  WITH CHECK ADD  CONSTRAINT [FK_Lops_Khoas_MaKhoa] FOREIGN KEY([MaKhoa])
REFERENCES [dbo].[Khoas] ([MaKhoa])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[Lops] CHECK CONSTRAINT [FK_Lops_Khoas_MaKhoa]
GO
ALTER TABLE [dbo].[NguoiDungs]  WITH CHECK ADD  CONSTRAINT [FK_NguoiDungs_Lops_MaLop] FOREIGN KEY([MaLop])
REFERENCES [dbo].[Lops] ([MaLop])
ON DELETE SET NULL
GO
ALTER TABLE [dbo].[NguoiDungs] CHECK CONSTRAINT [FK_NguoiDungs_Lops_MaLop]
GO
