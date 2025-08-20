-- Fix RLS policies for students table to allow public submissions
-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can insert students" ON public.students;
DROP POLICY IF EXISTS "Anyone can submit application" ON public.students;

-- Create a single, clear policy for public submissions
CREATE POLICY "Allow public CV submissions" 
ON public.students 
FOR INSERT 
WITH CHECK (true);

-- Also add a policy to allow the service to read for duplicate checking
CREATE POLICY "Allow service to check duplicates" 
ON public.students 
FOR SELECT 
USING (true);