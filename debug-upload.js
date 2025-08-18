// Script debug để kiểm tra upload functionality
// Chạy script này trong browser console trên trang Ninja AI

// 1. Kiểm tra Supabase client
console.log('=== SUPABASE DEBUG ===');
console.log('Supabase URL:', window.supabase?.supabaseUrl);
console.log('Supabase Key:', window.supabase?.supabaseKey?.substring(0, 20) + '...');

// 2. Test kết nối Supabase
async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('students').select('count').limit(1);
    console.log('✅ Database connection:', data ? 'OK' : 'Failed');
    if (error) console.error('❌ Database error:', error);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

// 3. Test Storage bucket
async function testStorageBucket() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    console.log('📦 Available buckets:', data?.map(b => b.name));
    
    const ninjaAIBucket = data?.find(b => b.id === 'ninja-ai-uploads');
    if (ninjaAIBucket) {
      console.log('✅ ninja-ai-uploads bucket found:', ninjaAIBucket);
    } else {
      console.error('❌ ninja-ai-uploads bucket NOT found');
    }
    
    if (error) console.error('❌ Storage error:', error);
  } catch (err) {
    console.error('❌ Storage test failed:', err);
  }
}

// 4. Test upload với file giả
async function testFileUpload() {
  try {
    // Tạo file test nhỏ
    const testContent = 'Test CV content for debugging';
    const testFile = new File([testContent], 'test-cv.txt', { type: 'text/plain' });
    
    console.log('📄 Test file created:', {
      name: testFile.name,
      size: testFile.size,
      type: testFile.type
    });
    
    // Test upload
    const filePath = `debug-test/${Date.now()}-test.txt`;
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
        error: error.error
      });
    } else {
      console.log('✅ Upload successful:', data);
      
      // Test get public URL
      const { data: urlData } = supabase.storage
        .from('ninja-ai-uploads')
        .getPublicUrl(filePath);
      console.log('🔗 Public URL:', urlData.publicUrl);
      
      // Cleanup - xóa file test
      await supabase.storage.from('ninja-ai-uploads').remove([filePath]);
      console.log('🗑️ Test file cleaned up');
    }
  } catch (err) {
    console.error('❌ Upload test failed:', err);
  }
}

// 5. Chạy tất cả tests
async function runAllTests() {
  console.log('🚀 Starting Supabase debug tests...');
  await testSupabaseConnection();
  await testStorageBucket();
  await testFileUpload();
  console.log('✅ Debug tests completed');
}

// 6. Kiểm tra form validation functions
function testFormValidation() {
  console.log('=== FORM VALIDATION DEBUG ===');
  
  // Test file validation functions nếu có
  if (typeof isAllowedFile === 'function') {
    const testFiles = [
      new File(['test'], 'test.pdf', { type: 'application/pdf' }),
      new File(['test'], 'test.doc', { type: 'application/msword' }),
      new File(['test'], 'test.txt', { type: 'text/plain' })
    ];
    
    testFiles.forEach(file => {
      const isValid = isAllowedFile(file);
      console.log(`📄 ${file.name} (${file.type}): ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
  }
  
  // Test slugify function nếu có
  if (typeof slugify === 'function') {
    const testNames = ['Nguyễn Văn A', 'Test User 123', 'Special@#$%'];
    testNames.forEach(name => {
      console.log(`📝 "${name}" -> "${slugify(name)}"`);
    });
  }
}

// 7. Export functions để có thể gọi từ console
window.debugUpload = {
  runAllTests,
  testSupabaseConnection,
  testStorageBucket,
  testFileUpload,
  testFormValidation
};

console.log('🔧 Debug functions loaded. Run: debugUpload.runAllTests()');

// Auto run tests
runAllTests();