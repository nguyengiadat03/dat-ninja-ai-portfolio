-- Create storage bucket for CV uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', false);

-- Create policies for CV uploads
CREATE POLICY "Users can upload their own CV" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Users can view their own CV" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs');

CREATE POLICY "Users can update their own CV" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cvs');

CREATE POLICY "Users can delete their own CV" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cvs');