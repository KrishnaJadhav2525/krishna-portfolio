// app/api/newsletter/route.js
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db.js';
import Newsletter from '../../../models/Newsletter.js';
import { sendNewsletterWelcomeEmail } from '../../../lib/email.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
    
    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        existing.status = 'active';
        existing.subscribedAt = new Date();
        await existing.save();
        
        return NextResponse.json({ 
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
    }
    
    // Create new subscriber
    const subscriber = new Newsletter({
      email,
      status: 'active',
      subscribedAt: new Date()
    });
    
    await subscriber.save();
    
    // Send welcome email
    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Don't fail the request
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter! Check your email for confirmation.'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// GET method for admin to retrieve subscribers
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '100');
    
    const subscribers = await Newsletter.find({ status })
      .sort({ subscribedAt: -1 })
      .limit(limit);
    
    return NextResponse.json({ 
      success: true,
      subscribers,
      count: subscribers.length
    });
    
  } catch (error) {
    console.error('Get Subscribers Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve subscribers' },
      { status: 500 }
    );
  }
}