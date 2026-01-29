import { setDefaultResultOrder } from 'dns';
setDefaultResultOrder('ipv4first');

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Force Node.js to use system DNS
process.env.UV_USE_IO_URING = '0';

console.log('🔍 Testing MongoDB Connection with DNS fix...');
console.log('📝 MONGODB_URI preview:', process.env.MONGODB_URI?.substring(0, 50) + '...');

mongoose.connect(process.env.MONGODB_URI)
  .then((conn) => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('🏠 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Connection Failed!');
    console.error('Error:', error.message);
    process.exit(1);
  });