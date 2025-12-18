const { connectDB } = require('../src/lib/db');
const Post = require('../src/models/Post').default || require('../src/models/Post');

(async function(){
  try {
    await connectDB();
    const slug = 'hello-kya-baat-hai';
    const bySlug = await Post.findOne({ slug }).lean();
    console.log('bySlug:', bySlug ? { _id: bySlug._id, slug: JSON.stringify(bySlug.slug), published: bySlug.published } : null);

    const id = '693fe2f82c9071870d03d2db';
    const byId = await Post.findById(id).lean();
    console.log('byId:', byId ? { _id: byId._id, slug: JSON.stringify(byId.slug), published: byId.published } : null);

    process.exit(0);
  } catch (err){
    console.error('err', err);
    process.exit(1);
  }
})();
