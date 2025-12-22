// Test script to update about page content
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

async function testUpdate() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('techwin');
    const collection = db.collection('aboutpages');
    
    // Check current data
    const current = await collection.findOne({});
    console.log('\n📄 Current About Page:');
    console.log('  Hero title:', current?.hero?.title);
    console.log('  Intro title:', current?.intro?.title);
    console.log('  Who We Are:', current?.whoWeAre?.content?.substring(0, 80) + '...');
    
    // Update with test data
    const testUpdate = {
      $set: {
        'hero.title': 'About Techwin - TEST UPDATE',
        'intro.title': 'Test Title - ' + new Date().toLocaleTimeString(),
      }
    };
    
    console.log('\n🔄 Updating with test data...');
    const result = await collection.updateOne({}, testUpdate);
    console.log('  Modified count:', result.modifiedCount);
    
    // Check updated data
    const updated = await collection.findOne({});
    console.log('\n✅ Updated About Page:');
    console.log('  Hero title:', updated?.hero?.title);
    console.log('  Intro title:', updated?.intro?.title);
    
    console.log('\n✅ Test complete. Visit http://localhost:3000/about to see changes.');
    console.log('⚠️  Remember to refresh the page (Ctrl+Shift+R or Cmd+Shift+R)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
  }
}

testUpdate();
