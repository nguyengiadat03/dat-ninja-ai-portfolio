-- Storage policies for CV uploads
-- Allow public read access to objects in 'cv_uploads' bucket
create policy if not exists "Public read cv_uploads"
on storage.objects
for select
to public
using (bucket_id = 'cv_uploads');

-- Allow public upload (insert) into 'cv_uploads' bucket
create policy if not exists "Public upload cv_uploads"
on storage.objects
for insert
to public
with check (bucket_id = 'cv_uploads');