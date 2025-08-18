-- Script test để kiểm tra upload functionality
-- Chạy script này trong Supabase SQL Editor để verify setup

-- 1. Kiểm tra bucket đã được tạo chưa
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE id = 'ninja-ai-uploads';

-- 2. Kiểm tra Storage policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%ninja-ai-uploads%'
ORDER BY policyname;

-- 3. Kiểm tra bảng applications
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'applications'
ORDER BY ordinal_position;

-- 4. Kiểm tra bảng students (fallback)
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'students'
ORDER BY ordinal_position;

-- 5. Kiểm tra RLS policies cho applications
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'applications'
ORDER BY policyname;

-- 6. Kiểm tra RLS policies cho students
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'students'
ORDER BY policyname;

-- 7. Test insert vào applications (uncomment để test)
/*
INSERT INTO applications (
  full_name, 
  email, 
  phone, 
  cv_url, 
  motivation
) VALUES (
  'Test User Upload', 
  'test-upload@example.com', 
  '0123456789', 
  'https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/public/ninja-ai-uploads/test/test-cv.pdf', 
  'Test motivation for upload functionality'
);

SELECT * FROM applications WHERE email = 'test-upload@example.com';

-- Cleanup test data
DELETE FROM applications WHERE email = 'test-upload@example.com';
*/

-- 8. Test insert vào students (uncomment để test)
/*
INSERT INTO students (
  full_name, 
  email, 
  phone_number, 
  cv_url
) VALUES (
  'Test Student Upload', 
  'test-student-upload@example.com', 
  '0987654321', 
  'https://yoxkoxpwgiwskdnjjhyd.supabase.co/storage/v1/object/public/ninja-ai-uploads/test/test-student-cv.pdf'
);

SELECT * FROM students WHERE email = 'test-student-upload@example.com';

-- Cleanup test data
DELETE FROM students WHERE email = 'test-student-upload@example.com';
*/

-- 9. Kiểm tra storage objects (nếu có file test)
SELECT 
  name,
  bucket_id,
  owner,
  created_at,
  updated_at,
  last_accessed_at,
  metadata
FROM storage.objects 
WHERE bucket_id = 'ninja-ai-uploads'
ORDER BY created_at DESC
LIMIT 10;

-- 10. Summary check - tất cả components cần thiết
SELECT 
  'Storage Bucket' as component,
  CASE 
    WHEN EXISTS(SELECT 1 FROM storage.buckets WHERE id = 'ninja-ai-uploads') 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'Storage Policies' as component,
  CASE 
    WHEN EXISTS(
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'objects' 
        AND schemaname = 'storage'
        AND policyname LIKE '%ninja-ai-uploads%'
    ) 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'Applications Table' as component,
  CASE 
    WHEN EXISTS(
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'applications'
    ) 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'Students Table' as component,
  CASE 
    WHEN EXISTS(
      SELECT 1 FROM information_schema.tables 
      WHERE table_name = 'students'
    ) 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'Applications RLS' as component,
  CASE 
    WHEN EXISTS(
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'applications'
        AND cmd = 'INSERT'
    ) 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status
UNION ALL
SELECT 
  'Students RLS' as component,
  CASE 
    WHEN EXISTS(
      SELECT 1 FROM pg_policies 
      WHERE tablename = 'students'
        AND cmd = 'INSERT'
    ) 
    THEN '✅ OK' 
    ELSE '❌ Missing' 
  END as status;

-- Kết quả mong đợi: Tất cả components đều hiển thị ✅ OK