import { NextResponse } from 'next/server';
import connectDB from '@/backend/config/db.js';
import Newsletter from '@/backend/models/Newsletter.model.js';

// POST: Unsubscribe from newsletter
export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required'
        },
        { status: 400 }
      );
    }

    await connectDB();

    const subscriber = await Newsletter.findOne({ 
      email: email.toLowerCase() 
    });

    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email not found in our newsletter list'
        },
        { status: 404 }
      );
    }

    subscriber.status = 'unsubscribed';
    await subscriber.save();

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error unsubscribing',
        error: error.message
      },
      { status: 500 }
    );
  }
}