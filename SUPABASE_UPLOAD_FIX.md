# Hướng dẫn Fix Lỗi Upload File lên Supabase Storage

## Vấn đề hiện tại
Khi upload file CV lên Supabase Storage, có thể gặp các lỗi sau:
- **403 Forbidden**: Thiếu quyền upload hoặc chưa có Storage Policy
- **404 Not Found**: Bucket không tồn tại hoặc sai tên bucket
- **Upload thất bại**: Cấu hình Storage chưa đúng

## Các bước khắc phục

### Bước 1: Kiểm tra và tạo Storage Bucket

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project của bạn
3. Vào **Storage** > **Buckets**
4. Kiểm tra xem bucket `ninja-ai-uploads` đã tồn tại chưa
5. Nếu chưa có, tạo bucket mới:
   - Click **New bucket**
   - Name: `ninja-ai-uploads`
   - Public bucket: **Checked** ✅
   - Click **Save**

### Bước 2: Thiết lập Storage Policies

1. Vào **Storage** > **Policies**
2. Chọn bucket `ninja-ai-uploads`
3. Chạy script SQL sau trong **SQL Editor**:

```sql
-- Chạy file setup-storage.sql đã được tạo
```

Hoặc thực hiện thủ công:

#### Tạo Policy cho Upload (INSERT)
- Policy name: `Allow public uploads`
- Allowed operation: `INSERT`
- Target roles: `public`
- USING expression: `true`
- WITH CHECK expression: `bucket_id = 'ninja-ai-uploads'`

#### Tạo Policy cho Download (SELECT)
- Policy name: `Allow public access`
- Allowed operation: `SELECT`
- Target roles: `public`
- USING expression: `bucket_id = 'ninja-ai-uploads'`

### Bước 3: Kiểm tra Database Tables

Đảm bảo có bảng để lưu thông tin ứng viên:

```sql
-- Kiểm tra bảng applications
SELECT * FROM applications LIMIT 1;

-- Hoặc bảng students (fallback)
SELECT * FROM students LIMIT 1;
```

Nếu chưa có, tạo bảng:

```sql
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  cv_url TEXT,
  motivation TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Thiết lập RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy cho INSERT
CREATE POLICY "Allow public inserts" ON applications
FOR INSERT WITH CHECK (true);

-- Policy cho SELECT (nếu cần)
CREATE POLICY "Allow public selects" ON applications
FOR SELECT USING (true);
```

### Bước 4: Test Upload Function

1. Mở trang Ninja AI program
2. Điền form và chọn file CV
3. Click "Gửi đơn ứng tuyển"
4. Kiểm tra:
   - File có được upload lên Storage không
   - Thông tin có được lưu vào database không
   - Toast message hiển thị thành công

### Bước 5: Debug nếu vẫn lỗi

#### Kiểm tra Console Logs
```javascript
// Mở Developer Tools > Console
// Xem lỗi chi tiết khi upload
console.error("UPLOAD/APPLY ERROR:", err);
```

#### Các lỗi thường gặp và cách fix:

**403 Forbidden:**
- Kiểm tra Storage Policies đã được tạo đúng chưa
- Đảm bảo bucket là public
- Kiểm tra RLS policies cho bảng database

**404 Not Found:**
- Kiểm tra tên bucket có đúng là `ninja-ai-uploads` không
- Kiểm tra bucket có tồn tại trong project không

**File too large:**
- Kiểm tra file size < 10MB
- Kiểm tra Supabase plan limits

**Invalid file type:**
- Chỉ cho phép: .pdf, .doc, .docx
- Kiểm tra function `isAllowedFile()` trong code

### Bước 6: Cải thiện Error Handling (Optional)

Code đã có error handling tốt, nhưng có thể cải thiện:

1. **Thêm retry mechanism** cho upload thất bại
2. **Progress indicator** khi upload file lớn
3. **Better validation** cho file type và size
4. **Logging** chi tiết hơn cho debug

## Kiểm tra cuối cùng

✅ Bucket `ninja-ai-uploads` đã được tạo và public
✅ Storage Policies đã được thiết lập đúng
✅ Database table và RLS policies đã OK
✅ Upload function hoạt động bình thường
✅ Error handling hiển thị message rõ ràng

## Liên hệ hỗ trợ

Nếu vẫn gặp vấn đề, hãy:
1. Kiểm tra Supabase Dashboard > Logs
2. Xem Network tab trong Developer Tools
3. Gửi screenshot lỗi cụ thể để được hỗ trợ

---

**Lưu ý**: File này được tạo tự động để hỗ trợ debug lỗi upload. Sau khi fix xong có thể xóa file này.