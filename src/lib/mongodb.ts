import dns from 'dns';
import { MongoClient, MongoClientOptions } from 'mongodb';

// Only in development: use Google DNS
if (process.env.NODE_ENV === 'development') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local (or Vercel env vars for production)');
}

const options: MongoClientOptions = {
  retryWrites: true,
  retryReads: true,
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  tls: true,
};

const client = new MongoClient(uri, options);

// LAZY connection: only connect when first needed (not at module load)
// WHY: Prevents build-time connection attempts (which fail on restricted networks)
const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  return globalWithMongo._mongoClientPromise;
}

export async function connectToDatabase() {
  const connectedClient = await getClientPromise();
  const db = connectedClient.db('mirza-study-centre');
  return { db, client: connectedClient };
}

export default getClientPromise;
