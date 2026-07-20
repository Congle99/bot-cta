# Albion CTA Tracker Bot

Discord bot tự động đọc ảnh chụp màn hình sự kiện CTA (Call To Arms) trong game Albion Online, ghi nhận danh sách thành viên tham gia bằng OCR, lưu vào database và tổng hợp báo cáo điểm danh theo tháng cho từng thành viên guild.

---

## 🚀 Tính năng

- **Nhận diện ảnh CTA bằng OCR**: Bot đọc ảnh chụp màn hình danh sách người tham gia CTA (hỗ trợ tiếng Anh + tiếng Việt qua Tesseract OCR).
- **Ghi nhận tự động**: Tên thành viên trong ảnh được tự động khớp và lưu vào database cho phiên CTA đó.
- **Theo dõi phiên CTA**: Quản lý nhiều phiên CTA diễn ra trong tháng, tránh trùng lặp dữ liệu.
- **Báo cáo điểm danh theo tháng**: Tự động tính % số buổi CTA mỗi thành viên đã tham gia trên tổng số buổi trong tháng.
- **Lệnh Slash Command**: Hỗ trợ các lệnh quản lý CTA trực tiếp trong Discord.

---

## 🛠 Tech Stack

- Node.js
- Discord.js
- Tesseract.js (OCR - nhận diện văn bản từ ảnh)
- SQLite (lưu trữ dữ liệu CTA)

---

## 📁 Cấu trúc project

```
├── commands/           # Các slash command của bot
│   ├── checkrole.js
│   ├── ctafinish.js
│   └── ctareport.js
├── database/            # Kết nối và schema database
├── src/
│   ├── checkCTA.js       # Xử lý ảnh CTA đầu vào
│   ├── ocr.js            # Nhận diện text từ ảnh (OCR)
│   ├── cleanOCR.js        # Làm sạch/chuẩn hóa kết quả OCR
│   ├── ctaSession.js      # Quản lý phiên CTA
│   ├── finishCTA.js       # Kết thúc và lưu kết quả phiên CTA
│   ├── saveCTAResult.js    # Lưu kết quả vào database
│   ├── formatCTAReport.js  # Định dạng báo cáo 1 buổi CTA
│   ├── getMonthlyReport.js # Truy vấn dữ liệu tổng hợp theo tháng
│   └── formatMonthlyReport.js # Định dạng báo cáo % tham gia theo tháng
├── index.js              # Entry point
└── deploy-commands.js    # Đăng ký slash command lên Discord
```

---

## ⚙️ Cách chạy

1. Clone repo và cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` với nội dung:
```
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id
```

3. Đăng ký slash command:
```bash
node deploy-commands.js
```

4. Chạy bot:
```bash
node index.js
```

---

## 📌 Ghi chú phát triển

Bot được xây dựng để hỗ trợ quản lý guild trong Albion Online, giảm thời gian điểm danh thủ công từ ảnh chụp màn hình sự kiện CTA.
