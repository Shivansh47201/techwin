#!/usr/bin/env ts-node
import { connectDB } from "../src/lib/db";
import Post from "../src/models/Post";
import runPublishScheduled from "../src/lib/scheduler";

(async () => {
  try {
    await connectDB();
    console.log('Connected to DB. Creating temporary test post...');

    const slug = `test-scheduler-${Date.now()}`;
    const test = await Post.create({
      slug,
      title: 'Scheduler Test',
      content: '<p>Test</p>',
      published: false,
      publishedAt: new Date(Date.now() - 60 * 1000), // 1 minute ago
    });

    console.log('Test post created:', test._id.toString());

    const res = await runPublishScheduled();
    console.log('Scheduler result:', res);

    const refreshed = await Post.findById(test._id);
    if (refreshed && refreshed.published) {
      console.log('PASS: Post was published by scheduler');
      await Post.findByIdAndDelete(test._id);
      process.exit(0);
    } else {
      console.error('FAIL: Post was not published');
      await Post.findByIdAndDelete(test._id);
      process.exit(2);
    }
  } catch (err: any) {
    console.error('Test failed', err);
    process.exit(1);
  }
})();
