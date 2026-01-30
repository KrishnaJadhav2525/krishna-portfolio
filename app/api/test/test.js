import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db';
import Newsletter from '@/backend/models/Newsletter.model';
import nodemailer from 'nodemailer';

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({ 
    success: true, 
    received: body 
  });
}