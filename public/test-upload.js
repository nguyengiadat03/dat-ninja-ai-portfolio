// Test script để debug upload issue
// Chạy script này trong browser console

console.log('🔧 Starting Supabase Upload Debug...');

// Import Supabase client (nếu chưa có)
if (typeof window.supabase === 'undefined') {
  console.log('⚠️ Supabase client not found in window. Trying to access from module...');
  // Thử access từ React app context
  const reactRoot = document.querySelector('#root');
  if (reactRoot && reactRoot._reactInternalFiber) {
    console.log('🔍 Trying to find Supabase from React context...');
  }
}

// Test functions
window.testSupabaseUpload = {
  // 1. Test basic connection
  async testConnection() {
    console.log('\n=== Testing Supabase Connection ===');
    try {
      // Tạo Supabase client trực tiếp
      const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js');
      const supabase = createClient(
        'https://yoxkoxpwgiwskdnjjhyd.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveGtveHB3Z2l3c2tkbmpqaHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMjMyODQsImV4cCI6MjA3MDc5OTI4NH0.cqRYTVi1CNcAhgR4lNLwiluHR9aX6xJCaSTiwS2BBAM'
      );
      
      window.testSupabase = supabase;
      
      // Test database connection
      const { data, error } = await supabase.from('students').select('count').limit(1);
      if (error) {
        console.error('❌ Database connection failed:', error);
        return false;
      }
      console.log('✅ Database connection successful');
      return true;
    } catch (err) {
      console.error('❌ Connection test failed:', err);
      return false;
    }
  },

  // 2. Test storage bucket
  async testBucket() {
    console.log('\n=== Testing Storage Bucket ===');
    try {
      const supabase = window.testSupabase;
      if (!supabase) {
        console.error('❌ Supabase client not initialized. Run testConnection() first.');
        return false;
      }

      // List buckets
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      if (bucketError) {
        console.error('❌ Failed to list buckets:', bucketError);
        return false;
      }

      console.log('📦 Available buckets:', buckets.map(b => b.name));
      
      const ninjaAIBucket = buckets.find(b => b.id === 'ninja-ai-uploads');
      if (!ninjaAIBucket) {
        console.error('❌ ninja-ai-uploads bucket not found!');
        console.log('💡 Create bucket with SQL:');
        console.log(`INSERT INTO storage.buckets (id, name, public) VALUES ('ninja-ai-uploads', 'ninja-ai-uploads', true);`);
        return false;
      }
      
      console.log('✅ ninja-ai-uploads bucket found:', ninjaAIBucket);
      return true;
    } catch (err) {
      console.error('❌ Bucket test failed:', err);
      return false;
    }
  },

  // 3. Test file upload
  async testUpload() {
    console.log('\n=== Testing File Upload ===');
    try {
      const supabase = window.testSupabase;
      if (!supabase) {
        console.error('❌ Supabase client not initialized. Run testConnection() first.');
        return false;
      }

      // Create test file
      const testContent = 'Test CV content for debugging upload functionality';
      const testFile = new File([testContent], 'debug-test-cv.txt', { 
        type: 'text/plain',
        lastModified: Date.now()
      });
      
      console.log('📄 Created test file:', {
        name: testFile.name,
        size: testFile.size,
        type: testFile.type
      });

      // Generate file path
      const timestamp = Date.now();
      const filePath = `debug-test/${timestamp}-test-cv.txt`;
      
      console.log('📁 Upload path:', filePath);

      // Attempt upload
      const { data, error } = await supabase.storage
        .from('ninja-ai-uploads')
        .upload(filePath, testFile, {
          cacheControl: '3600',
          contentType: testFile.type,
          upsert: true
        });

      if (error) {
        console.error('❌ Upload failed:', error);
        console.error('Error details:', {
          message: error.message,
          statusCode: error.statusCode,
          error: error.error,
          details: error.details
        });
        
        // Suggest fixes based on error
        if (error.message.includes('row-level security')) {
          console.log('💡 Fix: Add storage policy for INSERT');
          console.log(`CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ninja-ai-uploads');`);
        }
        if (error.message.includes('not found')) {
          console.log('💡 Fix: Create the bucket first');
        }
        return false;
      }

      console.log('✅ Upload successful:', data);
      
      // Test getting public URL
      const { data: urlData } = supabase.storage
        .from('ninja-ai-uploads')
        .getPublicUrl(filePath);
      
      console.log('🔗 Public URL:', urlData.publicUrl);
      
      // Test if file is accessible
      try {
        const response = await fetch(urlData.publicUrl);
        if (response.ok) {
          console.log('✅ File is publicly accessible');
        } else {
          console.warn('⚠️ File uploaded but not publicly accessible:', response.status);
        }
      } catch (fetchErr) {
        console.warn('⚠️ Could not test file accessibility:', fetchErr);
      }
      
      // Cleanup
      const { error: deleteError } = await supabase.storage
        .from('ninja-ai-uploads')
        .remove([filePath]);
      
      if (deleteError) {
        console.warn('⚠️ Could not cleanup test file:', deleteError);
      } else {
        console.log('🗑️ Test file cleaned up');
      }
      
      return true;
    } catch (err) {
      console.error('❌ Upload test failed:', err);
      return false;
    }
  },

  // 4. Test database insert
  async testDatabaseInsert() {
    console.log('\n=== Testing Database Insert ===');
    try {
      const supabase = window.testSupabase;
      if (!supabase) {
        console.error('❌ Supabase client not initialized. Run testConnection() first.');
        return false;
      }

      const testData = {
        full_name: 'Debug Test User',
        email: `debug-test-${Date.now()}@example.com`,
        phone: '0123456789',
        cv_url: 'https://example.com/test-cv.pdf',
        motivation: 'This is a debug test application'
      };

      console.log('📝 Testing insert with data:', testData);

      // Try applications table first
      let { data, error } = await supabase
        .from('applications')
        .insert([testData])
        .select();

      if (error) {
        console.warn('⚠️ Applications table failed:', error.message);
        
        // Try students table as fallback
        console.log('🔄 Trying students table as fallback...');
        const result = await supabase
          .from('students')
          .insert([testData])
          .select();
        
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('❌ Database insert failed:', error);
        
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          console.log('💡 Fix: Create the table first');
          console.log('CREATE TABLE applications (id SERIAL PRIMARY KEY, full_name VARCHAR(255), email VARCHAR(255), phone VARCHAR(20), cv_url TEXT, motivation TEXT, created_at TIMESTAMP DEFAULT NOW());');
        }
        if (error.message.includes('row-level security')) {
          console.log('💡 Fix: Add RLS policy for INSERT');
          console.log('CREATE POLICY "Allow public inserts" ON applications FOR INSERT WITH CHECK (true);');
        }
        return false;
      }

      console.log('✅ Database insert successful:', data);
      
      // Cleanup - delete test record
      if (data && data[0]) {
        const { error: deleteError } = await supabase
          .from(error ? 'students' : 'applications')
          .delete()
          .eq('id', data[0].id);
        
        if (deleteError) {
          console.warn('⚠️ Could not cleanup test record:', deleteError);
        } else {
          console.log('🗑️ Test record cleaned up');
        }
      }
      
      return true;
    } catch (err) {
      console.error('❌ Database test failed:', err);
      return false;
    }
  },

  // 5. Run all tests
  async runAll() {
    console.log('🚀 Running all Supabase tests...');
    
    const results = {
      connection: await this.testConnection(),
      bucket: await this.testBucket(),
      upload: await this.testUpload(),
      database: await this.testDatabaseInsert()
    };
    
    console.log('\n=== Test Results Summary ===');
    Object.entries(results).forEach(([test, passed]) => {
      console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
    });
    
    const allPassed = Object.values(results).every(Boolean);
    console.log(`\n${allPassed ? '🎉 All tests passed!' : '⚠️ Some tests failed. Check the logs above for fixes.'}`);
    
    return results;
  }
};

// Auto-run tests
console.log('🔧 Test functions loaded. Available commands:');
console.log('- testSupabaseUpload.runAll() - Run all tests');
console.log('- testSupabaseUpload.testConnection() - Test connection only');
console.log('- testSupabaseUpload.testBucket() - Test bucket only');
console.log('- testSupabaseUpload.testUpload() - Test upload only');
console.log('- testSupabaseUpload.testDatabaseInsert() - Test database only');

// Run all tests automatically
testSupabaseUpload.runAll();