// Script to add SEO fields to existing HomePage document
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

const defaultSEO = {
  title: "Techwin — Single-Frequency Fiber Lasers | Ultra-narrow Linewidth Solutions",
  description: "Techwin specializes in single-frequency fiber lasers with ultra-narrow linewidth and high stability. 20+ years of experience serving LiDAR, quantum technology, sensing, and communications industries worldwide.",
  canonical: "https://www.techwin.com",
  ogTitle: "Techwin — World-class Single-Frequency Fiber Laser Solutions",
  ogDescription: "Leading manufacturer of single-frequency fiber lasers, high-power sources, and seed lasers. Trusted by customers in 30+ countries for LiDAR, quantum tech, and precision sensing applications.",
  ogImage: "/techwin-company/techwin-building.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Techwin — Single-Frequency Fiber Lasers",
  twitterDescription: "Ultra-narrow linewidth fiber lasers for LiDAR, quantum, sensing & communications. 20+ years of expertise.",
  twitterImage: "/techwin-company/techwin-building.jpg",
};

const defaultHeadingLevels = {
  hero: 'h1',
  companyProfile: 'h2',
  productFamilies: 'h2',
  applications: 'h2',
  trustStrip: 'h3',
  techHighlights: 'h2',
};

async function migrate() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const collection = db.collection('homepages');
    
    // Find the homepage document
    const homePage = await collection.findOne({});
    
    if (!homePage) {
      console.log('⚠️ No homepage document found');
      return;
    }
    
    console.log('📄 Found homepage document');
    
    const updates = {};
    
    // Force update with correct values
    console.log('🔧 Force updating SEO and headingLevels (overwriting existing if any)');
    updates.seo = defaultSEO;
    updates.headingLevels = defaultHeadingLevels;
    
    const result = await collection.updateOne(
      { _id: homePage._id },
      { $set: updates }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} document(s)`);
    
    // Verify the update
    const verifyDoc = await collection.findOne({ _id: homePage._id });
    console.log('\n📊 Verification:');
    console.log('  SEO exists:', !!verifyDoc.seo);
    console.log('  SEO title:', verifyDoc.seo?.title || '(missing)');
    console.log('  headingLevels exists:', !!verifyDoc.headingLevels);
    console.log('  Hero heading level:', verifyDoc.headingLevels?.hero || '(missing)');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

migrate();
