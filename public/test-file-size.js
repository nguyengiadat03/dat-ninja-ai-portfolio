// Script test file size validation
// Chạy trong browser console để test validation

console.log('🧪 Testing File Size Validation...');

// Test function để tạo file với size cụ thể
function createTestFile(sizeMB, name = 'test-cv.pdf', type = 'application/pdf') {
  const sizeBytes = sizeMB * 1024 * 1024;
  const content = new Array(sizeBytes).fill('a').join('');
  return new File([content], name, { type });
}

// Test các kích thước file khác nhau
const testSizes = [
  { size: 1, expected: 'pass', description: '1MB - Should pass' },
  { size: 3, expected: 'pass', description: '3MB - Should pass' },
  { size: 5, expected: 'pass', description: '5MB - Should pass (at limit)' },
  { size: 6, expected: 'fail', description: '6MB - Should fail' },
  { size: 10, expected: 'fail', description: '10MB - Should fail' },
  { size: 15, expected: 'fail', description: '15MB - Should fail' }
];

// Function để test validation
function testFileValidation(file) {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  
  if (file.size > MAX_SIZE) {
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `FILE_TOO_LARGE: File size ${fileSizeMB}MB exceeds 5MB limit`
    };
  }
  
  return { valid: true, error: null };
}

// Chạy tests
console.log('\n=== File Size Validation Tests ===');
testSizes.forEach(test => {
  const file = createTestFile(test.size);
  const result = testFileValidation(file);
  const actualSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  
  const passed = (test.expected === 'pass' && result.valid) || 
                 (test.expected === 'fail' && !result.valid);
  
  console.log(`${passed ? '✅' : '❌'} ${test.description}`);
  console.log(`   File: ${actualSizeMB}MB, Valid: ${result.valid}`);
  if (result.error) {
    console.log(`   Error: ${result.error}`);
  }
  console.log('');
});

// Test với file thực tế từ input
window.testActualFile = function() {
  const fileInput = document.querySelector('input[type="file"]');
  if (!fileInput || !fileInput.files[0]) {
    console.log('⚠️ No file selected. Please select a file first.');
    return;
  }
  
  const file = fileInput.files[0];
  const result = testFileValidation(file);
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  
  console.log('\n=== Testing Selected File ===');
  console.log(`File: ${file.name}`);
  console.log(`Size: ${fileSizeMB}MB`);
  console.log(`Type: ${file.type}`);
  console.log(`Valid: ${result.valid ? '✅ Yes' : '❌ No'}`);
  
  if (result.error) {
    console.log(`Error: ${result.error}`);
  }
  
  return result;
};

// Test Supabase upload limits
window.testSupabaseUpload = async function() {
  console.log('\n=== Testing Supabase Upload Limits ===');
  
  // Test với file 4MB (should work)
  const smallFile = createTestFile(4, 'test-small.pdf');
  console.log(`Testing 4MB file: ${(smallFile.size / (1024 * 1024)).toFixed(2)}MB`);
  
  try {
    // Import Supabase client
    const { createClient } = await import('https://cdn.skypack.dev/@supabase/supabase-js');
    const supabase = createClient(
      'https://yoxkoxpwgiwskdnjjhyd.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlveGtveHB3Z2l3c2tkbmpqaHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMjMyODQsImV4cCI6MjA3MDc5OTI4NH0.cqRYTVi1CNcAhgR4lNLwiluHR9aX6xJCaSTiwS2BBAM'
    );
    
    const filePath = `test-size/${Date.now()}-test.pdf`;
    
    const { data, error } = await supabase.storage
      .from('ninja-ai-uploads')
      .upload(filePath, smallFile, {
        cacheControl: '3600',
        contentType: smallFile.type,
        upsert: true
      });
    
    if (error) {
      console.error('❌ Upload failed:', error);
      
      if (error.message.includes('exceeded the maximum allowed size')) {
        console.log('💡 Supabase has a lower size limit than expected');
        console.log('💡 Try reducing MAX_SIZE to 2MB or 1MB');
      }
    } else {
      console.log('✅ Upload successful:', data);
      
      // Cleanup
      await supabase.storage.from('ninja-ai-uploads').remove([filePath]);
      console.log('🗑️ Test file cleaned up');
    }
  } catch (err) {
    console.error('❌ Test failed:', err);
  }
};

console.log('\n🔧 Available commands:');
console.log('- testActualFile() - Test currently selected file');
console.log('- testSupabaseUpload() - Test actual Supabase upload limits');
console.log('\n💡 Select a file in the form and run testActualFile() to test it');