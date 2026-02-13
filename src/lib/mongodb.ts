import dns from 'dns';
import { MongoClient, MongoClientOptions } from 'mongodb';

// FIX: Force Node.js to use Google & Cloudflare DNS servers
// WHY: Your mobile hotspot DNS (172.20.10.1) can't resolve MongoDB's SRV records
// Google (8.8.8.8) and Cloudflare (1.1.1.1) DNS can resolve them properly
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);

// WHY: We read the MongoDB connection string from environment variables
// This keeps the password safe (not in code, not on GitHub)
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

// Connection options for reliability
const options: MongoClientOptions = {
  retryWrites: true,
  retryReads: true,
  serverSelectionTimeoutMS: 15000, // Wait max 15 seconds to find a server
  connectTimeoutMS: 15000,         // Wait max 15 seconds to connect
  tls: true,                       // Ensure TLS is enabled for Atlas
};

// WHY: We create ONE MongoClient instance and reuse it
const client = new MongoClient(uri, options);

// This promise ensures we only connect once
let clientPromise: Promise<MongoClient>;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
  // WHY: In development, Next.js restarts often (hot reload)
  // We store the connection on `global` so it survives restarts
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // WHY: In production, just connect normally
  clientPromise = client.connect();
}

// Main function to get the database
export async function connectToDatabase() {
  const connectedClient = await clientPromise;
  const db = connectedClient.db('mirza-study-centre');
  return { db, client: connectedClient };
}

export default clientPromise;
