import dns from 'dns';
import { MongoClient, MongoClientOptions } from 'mongodb';

// In development: use Google & Cloudflare DNS
// WHY: Mobile hotspot DNS can't resolve MongoDB's SRV records
// Google (8.8.8.8) and Cloudflare (1.1.1.1) DNS can resolve them properly
if (process.env.NODE_ENV === 'development') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  } catch {
    // Ignore DNS setting errors
  }
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local (or Vercel env vars for production)');
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
};

function getClientPromise(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClient = new MongoClient(uri!, options);
    globalWithMongo._mongoClientPromise = globalWithMongo._mongoClient.connect();
  }
  return globalWithMongo._mongoClientPromise;
}

export async function connectToDatabase() {
  try {
    const client = await getClientPromise();
    const dbName = process.env.MONGODB_DB || 'mirza-study-centre';
    const db = client.db(dbName);
    return { db, client };
  } catch (error) {
    // If connection failed, clear the cached promise so next call retries
    globalWithMongo._mongoClientPromise = undefined;
    globalWithMongo._mongoClient = undefined;
    throw error;
  }
}

export default getClientPromise;
