-- Script để thiết lập Storage bucket và policies cho upload file CV
-- Chạy script này trong Supabase SQL Editor

-- 1. Tạo bucket 'ninja-ai-uploads' nếu chưa có
INSERT INTO storage.buckets (id, name, public)
VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Thiết lập policy cho phép upload file (INSERT)
CREATE POLICY "Allow public uploads to ninja-ai-uploads bucket" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'ninja-ai-uploads'
);

-- 3. Thiết lập policy cho phép đọc file (SELECT)
CREATE POLICY "Allow public access to ninja-ai-uploads bucket" ON storage.objects
FOR SELECT USING (
  bucket_id = 'ninja-ai-uploads'
);

-- 4. Thiết lập policy cho phép cập nhật file (UPDATE) - optional
CREATE POLICY "Allow public updates to ninja-ai-uploads bucket" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'ninja-ai-uploads'
) WITH CHECK (
  bucket_id = 'ninja-ai-uploads'
);

-- 5. Thiết lập policy cho phép xóa file (DELETE) - optional
CREATE POLICY "Allow public deletes from ninja-ai-uploads bucket" ON storage.objects
FOR DELETE USING (
  bucket_id = 'ninja-ai-uploads'
);

-- 6. Kiểm tra xem bucket đã được tạo chưa
SELECT * FROM storage.buckets WHERE id = 'ninja-ai-uploads';

-- 7. Kiểm tra policies đã được tạo chưa
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage'
AND policyname LIKE '%ninja-ai-uploads%';