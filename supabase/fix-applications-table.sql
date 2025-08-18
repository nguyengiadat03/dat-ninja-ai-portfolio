-- Script khẩn cấp để fix lỗi PGRST205: Could not find table 'applications'
-- Chạy script này ngay trong Supabase SQL Editor

-- 1. Tạo bảng applications
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cv_url TEXT,
  motivation TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Thiết lập RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 3. Tạo policy cho INSERT (quan trọng nhất)
DROP POLICY IF EXISTS "Allow public inserts on applications" ON applications;
CREATE POLICY "Allow public inserts on applications" ON applications
FOR INSERT WITH CHECK (true);

-- 4. Tạo policy cho SELECT (để admin có thể xem)
DROP POLICY IF EXISTS "Allow authenticated selects on applications" ON applications;
CREATE POLICY "Allow authenticated selects on applications" ON applications
FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Tạo index để tối ưu performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);

-- 6. Kiểm tra kết quả
SELECT 
  'applications' as table_name,
  COUNT(*) as row_count,
  'Table created successfully' as status
FROM applications;

-- 7. Kiểm tra policies
SELECT 
  policyname,
  cmd,
  'Policy active' as status
FROM pg_policies 
WHERE tablename = 'applications';

-- 8. Test insert (uncomment để test)
/*
INSERT INTO applications (full_name, email, phone, cv_url, motivation) 
VALUES ('Test User', 'test@example.com', '0123456789', 'https://example.com/cv.pdf', 'Test motivation');

SELECT * FROM applications WHERE email = 'test@example.com';

-- Cleanup test
DELETE FROM applications WHERE email = 'test@example.com';
*/