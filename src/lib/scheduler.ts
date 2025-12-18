import { connectDB } from "./db";
import Post from "@/models/Post";

/**
 * Run the scheduled publish job: mark posts as published when publishedAt <= now
 * Returns { updatedCount, ids }
 */
export async function runPublishScheduled() {
  await connectDB();

  const now = new Date();

  // Find posts that are scheduled for publishing and still unpublished
  const posts = await Post.find({ published: false, publishedAt: { $ne: null, $lte: now } });

  if (!posts || posts.length === 0) {
    return { updatedCount: 0, ids: [] };
  }

  const ids = posts.map((p) => p._id.toString());

  const res = await Post.updateMany(
    { _id: { $in: ids } },
    { $set: { published: true } }
  );

  return { updatedCount: res.modifiedCount || posts.length, ids };
}

export default runPublishScheduled;
