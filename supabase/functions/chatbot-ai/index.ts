import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
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

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const { message, sessionId, sessionKey } = await req.json();

    console.log('Received chat request:', { message, sessionId, sessionKey });

    // Validate required fields
    if (!message || (!sessionId && !sessionKey)) {
      return new Response(
        JSON.stringify({ error: 'Thiếu thông tin yêu cầu' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    let currentSessionId = sessionId;

    // If no sessionId provided, create a new session for anonymous user
    if (!currentSessionId && sessionKey) {
      const { data: newSession, error: sessionError } = await supabase
        .from('chatbot_sessions')
        .insert([
          {
            session_key: sessionKey,
            user_id: null,
            status: 'active'
          }
        ])
        .select()
        .single();

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return new Response(
          JSON.stringify({ error: 'Không thể tạo phiên trò chuyện' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      currentSessionId = newSession.id;
    }

    // Save user message to database
    const { error: messageError } = await supabase
      .from('chatbot_messages')
      .insert([
        {
          session_id: currentSessionId,
          role: 'user',
          content: message
        }
      ]);

    if (messageError) {
      console.error('Error saving user message:', messageError);
    }

    // Get conversation history for context
    const { data: messageHistory } = await supabase
      .from('chatbot_messages')
      .select('role, content')
      .eq('session_id', currentSessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    // Prepare conversation context for Gemini
    const conversationHistory = messageHistory?.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    })) || [];

    // Add current message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: conversationHistory,
        systemInstruction: {
          parts: [
            {
              text: `Bạn là ĐạtGPT, trợ lý AI của Nguyễn Gia Đạt và chương trình Thực tập sinh Ninja AI. Hãy trả lời bằng tiếng Việt một cách thân thiện và hữu ích.

Thông tin về Nguyễn Gia Đạt:
- Lập trình viên Frontend chuyên nghiệp
- Có kinh nghiệm phát triển ứng dụng web hiện đại
- Thế mạnh trong việc kết hợp nghệ thuật và công nghệ
- Tạo nên những sản phẩm web mang dấu ấn riêng

Thông tin về chương trình Ninja AI:
- Chương trình đào tạo thực tập sinh chuyên sâu về AI và phát triển web
- Thời gian: 12 tuần 
- Tập trung vào kỹ năng thực tế và dự án thực tế
- Hỗ trợ mentor 1:1
- Tỷ lệ có việc làm cao (95%)
- Đào tạo từ cơ bản đến nâng cao về AI, Machine Learning, Deep Learning, NLP

Kỹ năng cần thiết:
- HTML/CSS, JavaScript, React
- Cơ bản về AI/ML  
- Tinh thần học hỏi

Để ứng tuyển: Điền form trên trang web hoặc gửi CV và portfolio.

Hãy trả lời ngắn gọn, súc tích và hữu ích. Khi không biết thông tin cụ thể, hãy khuyến khích người dùng liên hệ trực tiếp.`
            }
          ]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status, await response.text());
      throw new Error('Gemini API request failed');
    }

    const geminiData = await response.json();
    const aiMessage = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.';

    console.log('Gemini response:', aiMessage);

    // Save AI response to database
    const { error: aiMessageError } = await supabase
      .from('chatbot_messages')
      .insert([
        {
          session_id: currentSessionId,
          role: 'assistant',
          content: aiMessage
        }
      ]);

    if (aiMessageError) {
      console.error('Error saving AI message:', aiMessageError);
    }

    return new Response(
      JSON.stringify({ 
        message: aiMessage,
        sessionId: currentSessionId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(
      JSON.stringify({ error: 'Có lỗi xảy ra khi xử lý yêu cầu' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});