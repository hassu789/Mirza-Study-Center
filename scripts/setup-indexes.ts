/**
 * MongoDB Index Setup Script
 *
 * Run this once to create indexes for better performance:
 *   npx tsx scripts/setup-indexes.ts
 *
 * Or set up these indexes manually in MongoDB Atlas:
 *   - users.email (unique)
 *   - inquiries.createdAt
 *   - inquiries.email
 *   - inquiries.status
 *   - password_reset_tokens.token (unique)
 *   - password_reset_tokens.expiresAt (TTL: 0 seconds — auto-deletes expired tokens)
 */

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

async function setupIndexes() {
  const client = new MongoClient(uri!);

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB || 'mirza-study-centre');

    console.log('Creating indexes...\n');

    // Users collection
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('  users.email (unique)');

    // Inquiries collection
    await db.collection('inquiries').createIndex({ createdAt: -1 });
    console.log('  inquiries.createdAt (descending)');

    await db.collection('inquiries').createIndex({ email: 1 });
    console.log('  inquiries.email');

    await db.collection('inquiries').createIndex({ status: 1 });
    console.log('  inquiries.status');

    // Password reset tokens
    await db.collection('password_reset_tokens').createIndex({ token: 1 }, { unique: true });
    console.log('  password_reset_tokens.token (unique)');

    // TTL index: auto-delete expired tokens after they expire
    await db.collection('password_reset_tokens').createIndex(
      { expiresAt: 1 },
      { expireAfterSeconds: 0 }
    );
    console.log('  password_reset_tokens.expiresAt (TTL auto-cleanup)');

    console.log('\nAll indexes created successfully!');
  } catch (error) {
    console.error('Error creating indexes:', error);
  } finally {
    await client.close();
  }
}

setupIndexes();
