import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Load environment variables from .env.local
async function loadEnv() {
  try {
    const envPath = resolve(__dirname, '../.env.local');
    const envContent = await fs.readFile(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const equalIndex = trimmedLine.indexOf('=');
        if (equalIndex > 0) {
          const key = trimmedLine.substring(0, equalIndex).trim();
          const value = trimmedLine.substring(equalIndex + 1).trim();
          process.env[key] = value;
        }
      }
    });
    console.log('[loadEnv] Environment variables loaded');
  } catch (err) {
    console.error('Error loading .env.local:', err);
  }
}

// Manually connect to MongoDB
async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "CivicFix",
      bufferCommands: false,
    });
    console.log('[fixIssueIds] Connected to MongoDB');
  } catch (error) {
    console.error('[fixIssueIds] MongoDB connection error:', error);
    throw error;
  }
}

// Import Issue model after mongoose is configured
import Issue from '../src/models/Issue.js';

/**
 * This script fixes issue documents with invalid MongoDB ObjectId formats
 * by removing them from the database
 */
async function fixIssueIds() {
  try {
    // Load environment variables first
    await loadEnv();
    
    console.log('[fixIssueIds] Connecting to database...');
    await dbConnect();

    console.log('[fixIssueIds] Fetching all issues...');
    const issues = await Issue.find({});

    console.log(`[fixIssueIds] Found ${issues.length} issues`);

    if (issues.length === 0) {
      console.log('[fixIssueIds] Database is already clean!');
      process.exit(0);
    }

    // Delete all issues from database
    console.log(`\n[fixIssueIds] Deleting all ${issues.length} issues from database...`);
    const result = await Issue.deleteMany({});

    console.log(`[fixIssueIds] Deleted ${result.deletedCount} issues from database`);
    console.log('[fixIssueIds] Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('[fixIssueIds] Error:', error);
    process.exit(1);
  }
}

// Run the script
fixIssueIds();
