import 'dotenv/config';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import User from '../models/User.js';

await connectDB();
const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error('Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env');
if (ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');
const email = ADMIN_EMAIL.toLowerCase().trim();
const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const admin = await User.findOneAndUpdate(
  { email },
  { $set: { fullName: ADMIN_NAME, email, passwordHash, mobile: '0000000000', program: 'ADMIN', batch: 'ADMIN', workingStatus: 'Unemployed', role: 'admin' } },
  { upsert: true, new: true, runValidators: true }
);
console.log(`Admin account ready: ${admin.email}`);
await (await import('mongoose')).default.disconnect();
