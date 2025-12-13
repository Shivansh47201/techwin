// src/lib/db.ts
// Central MongoDB connection helper for Next.js App Router using Mongoose.
// Includes global caching to avoid reconnection on hot reload or multiple route calls.

import mongoose from "mongoose";

/* -------------------------------------------------------
   Utility: Clean and validate MongoDB URI from env
------------------------------------------------------- */
function sanitizeUri(raw?: string) {
  if (!raw) return null;

  let uri = raw.trim();

  // Remove surrounding quotes if pasted accidentally
  if (
    (uri.startsWith('"') && uri.endsWith('"')) ||
    (uri.startsWith("'") && uri.endsWith("'"))
  ) {
    uri = uri.slice(1, -1);
  }

  return uri;
}

/* -------------------------------------------------------
   Global Cache for Mongoose (Prevents Multiple Connections)
------------------------------------------------------- */
// We'll attach `mongooseCache` to globalThis to survive hot reload in dev.
type MongooseCache = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  var mongooseCache: MongooseCache | undefined;
}

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = { conn: null, promise: null };
}
const cached = globalThis.mongooseCache;

/* -------------------------------------------------------
   Main Connection Function
------------------------------------------------------- */
export async function connectDB(): Promise<mongoose.Connection> {
  // If already connected → reuse connection
  if (cached?.conn) {
    return cached.conn;
  }

  const rawUri = process.env.MONGODB_URI;
  const uri = sanitizeUri(rawUri);

  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in environment variables.");
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(
      '❌ Invalid MONGODB_URI — must start with "mongodb://" or "mongodb+srv://"'
    );
  }

  // If no promise yet, create one
  if (!cached!.promise) {
    mongoose.set("strictQuery", true);
    cached!.promise = mongoose
      .connect(uri) // <- no empty object to satisfy TS ConnectOptions typing
      .then((mongooseInstance) => {
        console.log("✅ MongoDB connected successfully");
        return mongooseInstance.connection;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        // reset promise so future attempts can retry
        cached!.promise = null;
        throw err;
      });
  }

  cached!.conn = await cached!.promise!;
  return cached!.conn;
}


