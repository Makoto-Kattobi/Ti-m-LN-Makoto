# 📚 MộcThư — Trang Truyện Chữ

Giao diện phong cách Valvrareteam, chạy trên **GitHub Pages** hoàn toàn miễn phí.

---

## 🚀 Cài đặt lên GitHub Pages (5 phút)

### Bước 1: Tạo Repository
1. Vào **github.com** → Đăng ký / Đăng nhập
2. Bấm **New repository**
3. Tên repo: `mocthu` (hoặc bất kỳ tên nào)
4. Chọn **Public**
5. Bấm **Create repository**

### Bước 2: Upload file
1. Trong repo vừa tạo, bấm **Add file → Upload files**
2. Kéo thả toàn bộ thư mục (index.html, truyen.html, chuong.html, danh-sach.html, css/, js/, data/)
3. Bấm **Commit changes**

### Bước 3: Bật GitHub Pages
1. Vào **Settings** của repo
2. Kéo xuống mục **Pages** (cột bên trái)
3. Source: **Deploy from a branch**
4. Branch: **main** → **/ (root)**
5. Bấm **Save**

### Bước 4: Truy cập
Sau 1-2 phút, trang web của bạn sẽ có địa chỉ:
```
https://[username].github.io/[repo-name]/
```

---

## 📖 Cách thêm truyện mới

### 1. Mở file `data/truyen.json`
Thêm một object mới vào mảng, ví dụ:

```json
{
  "id": "ten-truyen-slug",
  "ten": "Tên Truyện",
  "ten_goc": "原名 (tùy chọn)",
  "bia": "",
  "bia_text": "字",
  "trang_thai": "hot",
  "trang_thai_text": "Đang tiến hành",
  "the_loai": ["Chinese Novel", "Tiên Hiệp", "Action"],
  "nguon": "cn",
  "luot_doc": "0",
  "danh_gia": "5.0",
  "so_chuong": 1,
  "tac_gia": "Tên tác giả",
  "dich_gia": "Tên dịch giả",
  "mo_ta": "Mô tả truyện ở đây...",
  "chuong_moi": [
    {"so": "1", "ten": "Chương 1: Mở đầu", "thoi_gian": "vừa xong"}
  ]
}
```

**Lưu ý về `bia_text`**: Điền 1-2 ký tự Hán/Latin để hiển thị khi chưa có ảnh bìa.

**Lưu ý về `trang_thai`**:
- `"hot"` → Badge đỏ HOT
- `"new"` → Badge xanh MỚI
- `"done"` → Badge xanh FULL
- `""` → Không có badge

**Lưu ý về `bia`**: Để trống `""` nếu dùng ký tự placeholder. Hoặc điền đường dẫn ảnh như `"images/ten-truyen.jpg"`

---

### 2. Mở file `data/chuong.json`
Thêm nội dung chương theo cấu trúc:

```json
"ten-truyen-slug": {
  "ten_truyen": "Tên Truyện",
  "chuong": [
    {
      "so": 1,
      "ten": "Chương 1: Tên chương",
      "thoi_gian": "2 giờ trước",
      "noi_dung": "<p>Nội dung chương...</p><p>Đoạn tiếp...</p>"
    },
    {
      "so": 2,
      "ten": "Chương 2: Tên chương",
      "thoi_gian": "1 ngày trước",
      "noi_dung": "<p>Nội dung chương 2...</p>"
    }
  ]
}
```

**Định dạng nội dung (`noi_dung`)**: Dùng HTML cơ bản
- `<p>đoạn văn</p>` — Đoạn văn
- `<em>in nghiêng</em>` — In nghiêng
- `<strong>in đậm</strong>` — In đậm
- `<br>` — Xuống dòng

---

## 🖼️ Thêm ảnh bìa

1. Tạo thư mục `images/` trong repo
2. Upload ảnh vào đó (ví dụ: `images/lang-tieu.jpg`)
3. Trong `truyen.json`, điền:
```json
"bia": "images/lang-tieu.jpg"
```

---

## 🎨 Thay đổi tên trang

Mở file `js/app.js`, tìm và đổi:
```js
<span class="logo-text">Mộc<span>Thư</span></span>
```
→ thành tên bạn muốn.

---

## 💡 Cấu trúc file

```
📁 website/
  📄 index.html        ← Trang chủ
  📄 truyen.html       ← Chi tiết truyện
  📄 chuong.html       ← Đọc chương
  📄 danh-sach.html    ← Danh sách + tìm kiếm
  📁 css/
    📄 style.css       ← CSS dùng chung
  📁 js/
    📄 app.js          ← JavaScript dùng chung
  📁 data/
    📄 truyen.json     ← Thông tin các truyện
    📄 chuong.json     ← Nội dung từng chương
  📁 images/           ← Ảnh bìa (tự tạo)
  📄 README.md
```

---

## ✅ Tính năng

- **Trang chủ**: Danh sách truyện mới cập nhật, sidebar nổi bật, bình luận
- **Chi tiết truyện**: Bìa, mô tả, thống kê, danh sách chương có tìm kiếm
- **Đọc chương**: Tùy chỉnh font (4 cỡ), nền (4 kiểu), thanh tiến độ đọc, phím ← → để chuyển chương
- **Danh sách**: Tìm kiếm realtime, lọc theo thể loại, sắp xếp, phân trang
- **Dark mode**: Tự nhớ lựa chọn của người dùng
- **Responsive**: Hoạt động tốt trên mobile

---

## 💰 Thêm AdSense

Sau khi được Google duyệt AdSense, mở `js/app.js` và tìm:
```html
<div class="ad-box"><i class="fas fa-ad"></i><span>Quảng cáo 300×250</span></div>
```
Thay bằng mã AdSense của bạn:
```html
<ins class="adsbygoogle" ...></ins>
```

---

*Made with ❤️ by MộcThư*
