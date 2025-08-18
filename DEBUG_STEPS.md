# Hướng dẫn Debug Lỗi Upload File

## Bước 1: Kiểm tra trong Browser

1. **Mở trang Ninja AI**: http://localhost:8081/programs/ninja-ai
2. **Mở Developer Tools**: F12 hoặc Ctrl+Shift+I
3. **Vào tab Console**

## Bước 2: Chạy Script Debug

1. **Copy và paste script debug vào Console**:
```javascript
// Paste toàn bộ nội dung file debug-upload.js vào console
```

2. **Hoặc load script trực tiếp**:
```javascript
// Tạo script tag để load file debug
const script = document.createElement('script');
script.src = '/debug-upload.js';
document.head.appendChild(script);
```

3. **Chạy test**:
```javascript
debugUpload.runAllTests();
```

## Bước 3: Test Upload Thực Tế

1. **Điền form với thông tin test**:
   - Họ tên: Test User
   - Email: test@example.com
   - Số điện thoại: 0123456789
   - Chọn file CV (PDF, DOC, DOCX)
   - Motivation: Test upload

2. **Quan sát Console khi click "Gửi đơn ứng tuyển"**

3. **Ghi lại lỗi cụ thể** nếu có

## Bước 4: Kiểm tra Supabase Dashboard

### Storage Check:
1. Vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project: `yoxkoxpwgiwskdnjjhyd`
3. Vào **Storage** > **Buckets**
4. Kiểm tra bucket `ninja-ai-uploads` có tồn tại không
5. Nếu chưa có, tạo bucket mới:
   - Name: `ninja-ai-uploads`
   - Public: ✅ Checked

### Policies Check:
1. Vào **Storage** > **Policies**
2. Chọn bucket `ninja-ai-uploads`
3. Kiểm tra có policies cho INSERT và SELECT không
4. Nếu chưa có, chạy script SQL:

```sql
-- Copy từ file setup-storage.sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow public uploads to ninja-ai-uploads bucket" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'ninja-ai-uploads'
);

CREATE POLICY "Allow public access to ninja-ai-uploads bucket" ON storage.objects
FOR SELECT USING (
  bucket_id = 'ninja-ai-uploads'
);
```

### Database Check:
1. Vào **SQL Editor**
2. Chạy script test:

```sql
-- Kiểm tra bảng applications
SELECT * FROM applications LIMIT 1;

-- Kiểm tra bảng students
SELECT * FROM students LIMIT 1;

-- Nếu không có bảng, tạo mới
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cv_url TEXT,
  motivation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on applications" ON applications
FOR INSERT WITH CHECK (true);
```

## Bước 5: Các Lỗi Thường Gặp

### Lỗi 403 Forbidden:
```
UPLOAD_ERROR: new row violates row-level security policy
```
**Fix**: Thiếu RLS policy cho INSERT

### Lỗi 404 Not Found:
```
UPLOAD_ERROR: Bucket not found
```
**Fix**: Bucket chưa được tạo hoặc sai tên

### Lỗi Network:
```
UPLOAD_ERROR: fetch failed
```
**Fix**: Kiểm tra kết nối internet và Supabase URL

### Lỗi File Validation:
```
FILE_TYPE_NOT_ALLOWED
```
**Fix**: Chỉ chấp nhận .pdf, .doc, .docx

## Bước 6: Gửi Thông Tin Debug

Nếu vẫn lỗi, gửi cho tôi:

1. **Screenshot lỗi trong Console**
2. **Thông tin từ debugUpload.runAllTests()**
3. **Screenshot Supabase Storage dashboard**
4. **Loại file đang upload** (tên, size, type)
5. **Thông báo lỗi cụ thể** từ toast message

## Bước 7: Quick Fix Commands

### Nếu thiếu bucket:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true)
ON CONFLICT (id) DO NOTHING;
```

### Nếu thiếu storage policies:
```sql
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'ninja-ai-uploads');

CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'ninja-ai-uploads');
```

### Nếu thiếu database table:
```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cv_url TEXT,
  motivation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts" ON applications FOR INSERT WITH CHECK (true);
```

---

**Lưu ý**: Sau khi fix, refresh trang và thử upload lại. Nếu vẫn lỗi, gửi thông tin debug để được hỗ trợ cụ thể hơn.