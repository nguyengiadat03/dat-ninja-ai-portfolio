import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { fullName, email, phoneNumber, cvUrl } = await req.json();

    console.log('Received application:', { fullName, email, phoneNumber, cvUrl });

    // Validate required fields
    if (!fullName || !email || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: 'Thiếu thông tin bắt buộc' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert into students table
    console.log('Attempting to insert:', { fullName, email, phoneNumber, cvUrl });
    
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          full_name: fullName,
          email: email,
          phone_number: phoneNumber,
          cv_url: cvUrl || '',
          status: 'pending'
        }
      ])
      .select();
    
    console.log('Insert result:', { data, error });

    if (error) {
      console.error('Database error:', error);
      
      // Handle unique constraint violations
      if (error.code === '23505') {
        if (error.message.includes('email')) {
          return new Response(
            JSON.stringify({ error: 'Email này đã được sử dụng' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
        if (error.message.includes('phone_number')) {
          return new Response(
            JSON.stringify({ error: 'Số điện thoại này đã được sử dụng' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }

      return new Response(
        JSON.stringify({ error: 'Có lỗi xảy ra khi gửi đơn ứng tuyển' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Application submitted successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Đơn ứng tuyển đã được gửi thành công!',
        data: data[0]
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Lỗi hệ thống' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});