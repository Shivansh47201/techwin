// scripts/add-seo-to-aboutpage.js
require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('\u274C MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function migrate() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('\ud83d\udd17 Connecting to MongoDB...');
    await client.connect();
    console.log('\u2705 Connected to MongoDB Atlas');

    const db = client.db('techwin');
    const collection = db.collection('aboutpages');

    const defaultSEO = {
      title: "About Techwin | Premium Fiber Laser Manufacturer in Hangzhou",
      description: "Learn about Techwin, a leading fiber laser manufacturer in Hangzhou, China. Discover our expertise in ultra-narrow linewidth lasers, high-power systems, and innovative photonic solutions for global markets.",
      canonical: "https://www.techwin.com/about",
      ogTitle: "About Techwin — World-class Fiber Laser Solutions",
      ogDescription: "Leading manufacturer of single-frequency fiber lasers with 20+ years of experience. Serving customers worldwide with innovative photonic solutions.",
      ogImage: "/techwin-company/techwin-building.jpg",
      twitterCard: "summary_large_image",
      twitterTitle: "About Techwin — Fiber Laser Excellence",
      twitterDescription: "20+ years of expertise in single-frequency fiber lasers. Trusted by customers in 30+ countries.",
      twitterImage: "/techwin-company/techwin-building.jpg",
    };

    const defaultHeadingLevels = {
      aboutHero: 'h1',
      techwinIntro: 'h2',
      whoWeAre: 'h2',
      expertiseProducts: 'h2',
      commitment: 'h2',
      whyChoose: 'h2',
      sustainability: 'h2',
      finalStatement: 'h3',
    };

    const result = await collection.updateOne(
      {},
      {
        $set: {
          seo: defaultSEO,
          headingLevels: defaultHeadingLevels,
        },
      },
      { upsert: true }
    );

    console.log('\n\u2705 Migration completed!');
    console.log(`\ud83d\udcca Updated ${result.modifiedCount} document(s)`);
    console.log(`\ud83c\udd95 Upserted: ${result.upsertedCount > 0 ? 'Yes' : 'No'}`);

    // Verify the update
    const aboutPage = await collection.findOne({});
    console.log('\n\ud83d\udd0d Verification:');
    console.log('- SEO fields:', Object.keys(aboutPage.seo || {}).join(', '));
    console.log('- Heading Levels:', Object.keys(aboutPage.headingLevels || {}).join(', '));
    console.log('\n\ud83d\udcca Updates applied:', Object.keys(result.upsertedId ? { seo: 1, headingLevels: 1 } : (result.modifiedCount > 0 ? { seo: 1, headingLevels: 1 } : {})));

  } catch (error) {
    console.error('\u274C Migration error:', error);
  } finally {
    await client.close();
    console.log('\n\ud83d\udd12 Connection closed');
  }
}

migrate();
