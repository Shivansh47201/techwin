async function testAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/admin/pages/home');
    const data = await response.json();
    
    console.log('\n📊 API Response Check:');
    console.log('  SEO exists:', !!data.seo);
    console.log('  SEO title:', data.seo?.title || 'MISSING');
    console.log('  headingLevels exists:', !!data.headingLevels);
    console.log('  Hero level:', data.headingLevels?.hero || 'MISSING');
    console.log('\n  Full SEO object:', JSON.stringify(data.seo, null, 2));
    console.log('\n  Full headingLevels object:', JSON.stringify(data.headingLevels, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testAPI();
