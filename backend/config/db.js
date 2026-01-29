import { setDefaultResultOrder } from 'dns';
setDefaultResultOrder('ipv4first');

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
};

export default connectDB;