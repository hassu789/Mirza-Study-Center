import dns from "dns";
import { MongoClient, Db, MongoClientOptions } from "mongodb";

// Always override DNS servers — applies in ALL environments (dev, production, serverless).
// Root cause of querySrv ECONNREFUSED: the OS/ISP/hotspot DNS either blocks SRV record
// lookups on port 53 UDP or silently drops them. Google (8.8.8.8) and Cloudflare (1.1.1.1)
// reliably resolve MongoDB Atlas SRV records. This MUST run before MongoClient is created,
// so it lives at the very top of this module, unconditionally.
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4", "1.0.0.1"]);
} catch {
  // Non-fatal: if dns.setServers fails (e.g. permission), proceed with OS DNS
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please add MONGODB_URI to .env.local (or Vercel env vars for production)",
  );
}

// Connection options for reliability
const options: MongoClientOptions = {
  retryWrites: true,
  retryReads: true,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 15000,
  tls: true,
  maxPoolSize: 10,
  minPoolSize: 1,
};

// Cache connection on global - works for both dev (hot reload) and production (serverless)
const globalWithMongo = global as typeof globalThis & {
  _mongoClient?: MongoClient;
  _mongoClientPromise?: Promise<MongoClient>;
  _indexesCreated?: boolean;
};

function getClientPromise(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClient = new MongoClient(uri!, options);
    globalWithMongo._mongoClientPromise =
      globalWithMongo._mongoClient.connect();
  }
  return globalWithMongo._mongoClientPromise;
}

// createIndex is idempotent — safe to call on every cold start
async function ensureIndexes(db: Db) {
  if (globalWithMongo._indexesCreated) return;

  try {
    await Promise.all([
      db.collection("users").createIndex({ email: 1 }, { unique: true }),
      db.collection("inquiries").createIndex({ createdAt: -1 }),
      db.collection("inquiries").createIndex({ status: 1 }),
      db
        .collection("password_reset_tokens")
        .createIndex({ token: 1 }, { unique: true }),
      db
        .collection("password_reset_tokens")
        .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      // Enrollment indexes
      db
        .collection("enrollments")
        .createIndex({ userId: 1, courseId: 1 }, { unique: true }),
      db.collection("enrollments").createIndex({ userId: 1 }),
      db.collection("enrollments").createIndex({ courseId: 1 }),
      // Attendance indexes
      db
        .collection("attendance")
        .createIndex({ enrollmentId: 1, date: 1 }, { unique: true }),
      db.collection("attendance").createIndex({ enrollmentId: 1 }),
      // Newsletter subscribers
      db.collection("newsletter").createIndex({ email: 1 }, { unique: true }),
    ]);
    globalWithMongo._indexesCreated = true;
  } catch (err) {
    console.warn("[mongodb] Index creation failed (non-fatal):", err);
  }
}

export async function connectToDatabase() {
  try {
    const client = await getClientPromise();
    const dbName = process.env.MONGODB_DB || "mirza-study-centre";
    const db = client.db(dbName);
    await ensureIndexes(db);
    return { db, client };
  } catch (error) {
    // If connection failed, clear the cached promise so next call retries
    globalWithMongo._mongoClientPromise = undefined;
    globalWithMongo._mongoClient = undefined;
    throw error;
  }
}

export default getClientPromise;
