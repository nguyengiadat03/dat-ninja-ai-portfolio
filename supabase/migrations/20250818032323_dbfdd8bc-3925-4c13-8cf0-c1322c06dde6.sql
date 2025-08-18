-- Enable RLS on all public tables that don't have it
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_sessions ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for students table (public submissions)
CREATE POLICY "Anyone can submit application" 
ON public.students 
FOR INSERT 
WITH CHECK (true);

-- Add RLS policies for chatbot_sessions (public access)
CREATE POLICY "Anyone can create sessions" 
ON public.chatbot_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read their sessions" 
ON public.chatbot_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their sessions" 
ON public.chatbot_sessions 
FOR UPDATE 
USING (true);

-- Add RLS policies for app_settings (read-only public access)
CREATE POLICY "Anyone can read app settings" 
ON public.app_settings 
FOR SELECT 
USING (true);

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.update_session_end_at()
RETURNS TRIGGER AS $$
BEGIN
    -- Chỉ cập nhật session_end_at khi status được chuyển thành 'ended'
    -- và trước đó nó chưa phải là 'ended' để tránh ghi đè không cần thiết.
    IF NEW.status = 'ended' AND OLD.status IS DISTINCT FROM 'ended' THEN
        NEW.session_end_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.is_session_owner(p_session_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    is_owner BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM public.chatbot_sessions s
        WHERE s.id = p_session_id
          AND (
            -- Trường hợp 1: Người dùng đã đăng nhập và user_id khớp
            (s.user_id IS NOT NULL AND s.user_id = auth.uid())
            OR
            -- Trường hợp 2: Người dùng ẩn danh và session_key khớp
            (s.user_id IS NULL AND s.session_key = current_setting('app.current_session_key', true))
          )
    ) INTO is_owner;
    RETURN is_owner;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;