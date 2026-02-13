import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

const client = new MongoClient(uri);

export async function connectToDatabase() {
  await client.connect();
  const db = client.db('mirza-study-centre');
  return { db, client };
}