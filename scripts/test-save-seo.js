async function testSaveSEO() {
  try {
    // First, get current data
    console.log('📥 Fetching current data...');
    const getResponse = await fetch('http://localhost:3000/api/admin/pages/home');
    const currentData = await getResponse.json();
    
    console.log('\n📊 Current SEO title:', currentData.seo?.title || 'MISSING');
    console.log('📊 Current Hero heading:', currentData.headingLevels?.hero || 'MISSING');
    
    // Modify SEO data
    const updatedData = {
      ...currentData,
      seo: {
        ...currentData.seo,
        title: 'TEST TITLE - ' + Date.now(),
        description: 'TEST DESCRIPTION - Updated',
        canonical: 'https://www.techwin.com/test',
      },
      headingLevels: {
        ...currentData.headingLevels,
        hero: 'h2', // Change from h1 to h2
      }
    };
    
    // Save updated data
    console.log('\n💾 Saving updated data...');
    console.log('📤 Request body SEO title:', updatedData.seo.title);
    console.log('📤 Request body Hero level:', updatedData.headingLevels.hero);
    
    const putResponse = await fetch('http://localhost:3000/api/admin/pages/home', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    
    const savedData = await putResponse.json();
    console.log('\n✅ Save response status:', putResponse.status);
    console.log('✅ Saved SEO title:', savedData.seo?.title);
    console.log('✅ Saved Hero heading:', savedData.headingLevels?.hero);
    
    // Verify by fetching again
    console.log('\n🔍 Verifying by fetching again...');
    const verifyResponse = await fetch('http://localhost:3000/api/admin/pages/home');
    const verifiedData = await verifyResponse.json();
    
    console.log('🔍 Verified SEO title:', verifiedData.seo?.title);
    console.log('🔍 Verified Hero heading:', verifiedData.headingLevels?.hero);
    
    if (verifiedData.seo?.title === updatedData.seo.title) {
      console.log('\n✅ SUCCESS - Data saved and verified!');
    } else {
      console.log('\n❌ FAILED - Data did not persist!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testSaveSEO();
