-- Script để tăng giới hạn file upload trong Supabase Storage
-- Chạy script này trong Supabase SQL Editor nếu vẫn gặp lỗi "object exceeded the maximum allowed size"

-- 1. Kiểm tra cấu hình hiện tại của bucket
SELECT 
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'ninja-ai-uploads';

-- 2. Cập nhật giới hạn file size cho bucket (nếu cần)
-- Lưu ý: file_size_limit tính bằng bytes, 10MB = 10485760 bytes
UPDATE storage.buckets 
SET file_size_limit = 10485760  -- 10MB in bytes
WHERE id = 'ninja-ai-uploads';

-- 3. Kiểm tra lại sau khi cập nhật
SELECT 
  id,
  name,
  public,
  file_size_limit,
  ROUND(file_size_limit / 1024.0 / 1024.0, 2) as size_limit_mb
FROM storage.buckets 
WHERE id = 'ninja-ai-uploads';

-- 4. Nếu bucket chưa có giới hạn, có thể tạo mới với giới hạn 10MB
-- (Chỉ chạy nếu bucket chưa tồn tại)
/*
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true, 10485760)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit;
*/

-- 5. Kiểm tra policies có ảnh hưởng đến file size không
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%ninja-ai-uploads%';

-- 6. Thông tin debug
SELECT 
  'Bucket Configuration' as info_type,
  CASE 
    WHEN file_size_limit IS NULL THEN 'No limit set (may use default)'
    WHEN file_size_limit >= 10485760 THEN 'Supports 10MB+'
    ELSE CONCAT('Limited to ', ROUND(file_size_limit / 1024.0 / 1024.0, 2), 'MB')
  END as status
FROM storage.buckets 
WHERE id = 'ninja-ai-uploads'

UNION ALL

SELECT 
  'Bucket Exists' as info_type,
  CASE 
    WHEN COUNT(*) > 0 THEN 'Yes'
    ELSE 'No - Run setup-storage.sql first'
  END as status
FROM storage.buckets 
WHERE id = 'ninja-ai-uploads';

-- 7. Test query để kiểm tra upload có thành công không
-- (Chạy sau khi thử upload từ frontend)
/*
SELECT 
  name,
  bucket_id,
  ROUND(metadata->>'size'::numeric / 1024.0 / 1024.0, 2) as size_mb,
  created_at
FROM storage.objects 
WHERE bucket_id = 'ninja-ai-uploads'
ORDER BY created_at DESC
LIMIT 10;
*/

-- Ghi chú:
-- - Supabase có thể có giới hạn mặc định ở mức project level
-- - Nếu vẫn lỗi, có thể cần upgrade plan hoặc liên hệ Supabase support
-- - Một số giới hạn có thể được set ở level Edge Function hoặc API Gateway