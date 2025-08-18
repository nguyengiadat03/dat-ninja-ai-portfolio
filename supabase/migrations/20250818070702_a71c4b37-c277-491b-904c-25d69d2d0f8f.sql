-- Storage policies for CV uploads
-- Allow public read access to objects in 'cv_uploads' bucket
CREATE POLICY "Public read cv_uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'cv_uploads');

-- Allow public upload (insert) into 'cv_uploads' bucket
CREATE POLICY "Public upload cv_uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'cv_uploads');