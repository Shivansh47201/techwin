// Test script to check heading levels in database
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

async function checkHeadingLevels() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db('techwin');
    
    // Check HomePage
    const homeCollection = db.collection('homepages');
    const homePage = await homeCollection.findOne({});
    console.log('🏠 HomePage Heading Levels:');
    console.log(JSON.stringify(homePage?.headingLevels, null, 2));
    
    // Check AboutPage
    const aboutCollection = db.collection('aboutpages');
    const aboutPage = await aboutCollection.findOne({});
    console.log('\n📄 AboutPage Heading Levels:');
    console.log(JSON.stringify(aboutPage?.headingLevels, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkHeadingLevels();
