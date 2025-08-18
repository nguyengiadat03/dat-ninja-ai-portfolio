-- Script để thiết lập database tables và RLS policies
-- Chạy script này trong Supabase SQL Editor

-- 1. Tạo bảng applications nếu chưa có
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

-- 2. Tạo bảng students nếu chưa có (fallback table)
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  cv_url TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Thêm indexes để tối ưu performance
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at);

-- 4. Thiết lập RLS cho bảng applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Policy cho phép INSERT công khai (để form có thể submit)
DROP POLICY IF EXISTS "Allow public inserts on applications" ON applications;
CREATE POLICY "Allow public inserts on applications" ON applications
FOR INSERT WITH CHECK (true);

-- Policy cho phép SELECT (nếu cần admin xem)
DROP POLICY IF EXISTS "Allow authenticated selects on applications" ON applications;
CREATE POLICY "Allow authenticated selects on applications" ON applications
FOR SELECT USING (auth.role() = 'authenticated');

-- 5. Thiết lập RLS cho bảng students (fallback)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Policy cho phép INSERT công khai
DROP POLICY IF EXISTS "Allow public inserts on students" ON students;
CREATE POLICY "Allow public inserts on students" ON students
FOR INSERT WITH CHECK (true);

-- Policy cho phép SELECT (nếu cần admin xem)
DROP POLICY IF EXISTS "Allow authenticated selects on students" ON students;
CREATE POLICY "Allow authenticated selects on students" ON students
FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Tạo function để update timestamp tự động
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 7. Tạo triggers cho auto-update timestamp
DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Kiểm tra kết quả
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual
FROM pg_policies 
WHERE tablename IN ('applications', 'students')
ORDER BY tablename, policyname;

-- 9. Test insert để đảm bảo policies hoạt động
-- Uncomment để test:
/*
INSERT INTO applications (full_name, email, phone, cv_url, motivation) 
VALUES ('Test User', 'test@example.com', '0123456789', 'https://example.com/cv.pdf', 'Test motivation');

SELECT * FROM applications WHERE email = 'test@example.com';

-- Xóa test data
DELETE FROM applications WHERE email = 'test@example.com';
*/