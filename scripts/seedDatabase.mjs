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
    console.log('[seedDatabase] Connected to MongoDB');
  } catch (error) {
    console.error('[seedDatabase] MongoDB connection error:', error);
    throw error;
  }
}

// Import Issue and User models after mongoose is configured
import Issue from '../src/models/Issue.js';
import User from '../src/models/User.js';

/**
 * This script seeds the database with test issues
 */
async function seedDatabase() {
  try {
    // Load environment variables first
    await loadEnv();
    
    console.log('[seedDatabase] Connecting to database...');
    await dbConnect();

    // Create test user
    console.log('[seedDatabase] Creating test user...');
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      testUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        image: null,
      });
      console.log('[seedDatabase] Test user created:', testUser._id);
    } else {
      console.log('[seedDatabase] Test user already exists:', testUser._id);
    }

    // Create test issues
    console.log('[seedDatabase] Creating test issues...');
    const testIssues = [
      {
        title: 'Large Pothole Near Central Market',
        shortDescription: 'A deep pothole causing traffic disruption near the main intersection.',
        description: 'There is a large pothole near the Central Market intersection that is causing frequent traffic congestion and minor accidents. Vehicles are swerving to avoid it which increases risk. This issue has been reported multiple times but not yet addressed.',
        category: 'Road Damage',
        location: {
          type: 'Point',
          coordinates: [89.1234, 23.4095],
          address: 'Central Market, Kaliganj',
          area: 'Central Market',
          city: 'Kaliganj'
        },
        priority: 'High',
        status: 'Pending',
        image: null,
        reportedBy: testUser._id,
        upvotes: 12,
      },
      {
        title: 'Street Light Not Working',
        shortDescription: 'Street light is off for 5 days near Girls School Road.',
        description: 'The street light near Girls School Road has not been working for the past 5 days. The area becomes very dark at night and unsafe for pedestrians. Urgent repair needed.',
        category: 'Street Light',
        location: {
          type: 'Point',
          coordinates: [89.1250, 23.4082],
          address: 'Girls School Road, Kaliganj',
          area: 'Girls School Road',
          city: 'Kaliganj'
        },
        priority: 'Medium',
        status: 'In Progress',
        image: null,
        reportedBy: testUser._id,
        upvotes: 8,
      },
      {
        title: 'Garbage Accumulation Near Bus Stand',
        shortDescription: 'Uncollected garbage creating foul smell and health risk.',
        description: 'Garbage has been piling up near the Kaliganj bus stand for the past week. The smell is unbearable and it may cause health issues for nearby residents and shop owners. Immediate action required.',
        category: 'Garbage',
        location: {
          type: 'Point',
          coordinates: [89.1211, 23.4120],
          address: 'Bus Stand, Kaliganj',
          area: 'Bus Stand',
          city: 'Kaliganj'
        },
        priority: 'High',
        status: 'Resolved',
        image: null,
        reportedBy: testUser._id,
        upvotes: 25,
      },
      {
        title: 'Water Leakage From Main Pipeline',
        shortDescription: 'Continuous water leakage near Post Office Road.',
        description: 'A water pipeline has been leaking for 3 days near Post Office Road. Clean water is being wasted and road condition is worsening due to waterlogging.',
        category: 'Water Leakage',
        location: {
          type: 'Point',
          coordinates: [89.1205, 23.4070],
          address: 'Post Office Road, Kaliganj',
          area: 'Post Office Road',
          city: 'Kaliganj'
        },
        priority: 'High',
        status: 'Pending',
        image: null,
        reportedBy: testUser._id,
        upvotes: 15,
      },
    ];

    // Delete existing issues before seeding
    console.log('[seedDatabase] Clearing existing issues...');
    await Issue.deleteMany({});

    // Insert test issues
    const createdIssues = await Issue.insertMany(testIssues);
    console.log(`[seedDatabase] Created ${createdIssues.length} test issues`);
    
    createdIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue.title} (ID: ${issue._id})`);
    });

    console.log('[seedDatabase] Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('[seedDatabase] Error:', error);
    process.exit(1);
  }
}

// Run the script
seedDatabase();
