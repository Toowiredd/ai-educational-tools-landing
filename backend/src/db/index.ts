import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { config } from '../config/index.js';

// Create PostgreSQL connection
const connectionString = config.databaseUrl;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create postgres client
export const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance
export const db = drizzle(client, { schema });

// Export schema for use in queries
export { schema };

// Test connection
export async function testConnection() {
  try {
    await client`SELECT 1`;
    console.log('✅ Database connection established');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function closeConnection() {
  await client.end();
  console.log('Database connection closed');
}
