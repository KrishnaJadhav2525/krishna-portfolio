import express from 'express';
import Newsletter from '../models/Newsletter.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Email configuration (same as contact route)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// POST: Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Resubscribe
        existingSubscriber.status = 'active';
        existingSubscriber.name = name || existingSubscriber.name;
        await existingSubscriber.save();
        
        return res.status(200).json({
          success: true,
          message: 'Welcome back! You\'re resubscribed to the newsletter.'
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'You\'re already subscribed to the newsletter!'
      });
    }

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress;

    // Create new subscriber
    const subscriber = new Newsletter({
      email: email.toLowerCase(),
      name: name || 'Anonymous',
      ipAddress,
      status: 'active'
    });

    await subscriber.save();
    console.log('✅ New newsletter subscriber:', subscriber.email);

    // Send welcome email
    try {
      const mailOptions = {
        from: {
          name: 'Krishna - Portfolio Blog',
          address: process.env.EMAIL_USER
        },
        to: email,
        subject: '🎉 Welcome to My Newsletter!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%); 
                        color: white; padding: 40px 20px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f9f9f9; padding: 40px 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #10b981; 
                       color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
              .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 32px;">🎉 Welcome!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">
                  Thanks for subscribing to my newsletter
                </p>
              </div>
              
              <div class="content">
                <p>Hey${name ? ' ' + name : ''}! 👋</p>
                
                <p>
                  I'm thrilled to have you here! You're now part of an exclusive community 
                  that gets first access to my thoughts on AI, engineering, and whatever 
                  interesting things I'm building.
                </p>
                
                <h3>What to expect:</h3>
                <ul>
                  <li>📚 Curated blog posts matching your interests</li>
                  <li>🚀 Behind-the-scenes of projects I'm working on</li>
                  <li>💡 Insights and lessons learned from building</li>
                  <li>🎯 Zero spam - only quality content</li>
                </ul>
                
                <p>
                  I respect your inbox and promise to only send content that's worth your time. 
                  You can unsubscribe anytime with one click.
                </p>
                
                <div style="text-align: center;">
                  <a href="http://localhost:3000/blog" class="button">
                    Read My Latest Posts
                  </a>
                </div>
                
                <p style="margin-top: 30px;">
                  Got questions or feedback? Just reply to this email - I read every message!
                </p>
                
                <p>
                  Best,<br>
                  <strong>Krishna</strong>
                </p>
              </div>
              
              <div class="footer">
                <p>You're receiving this because you subscribed at krishna-portfolio.com</p>
                <p>Don't want these emails? <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe">Unsubscribe</a></p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hey${name ? ' ' + name : ''}! 👋

Thanks for subscribing to my newsletter! I'm thrilled to have you here.

What to expect:
- Curated blog posts matching your interests
- Behind-the-scenes of projects I'm working on
- Insights and lessons learned from building
- Zero spam - only quality content

I respect your inbox and promise to only send content that's worth your time.

Read my latest posts: http://localhost:3000/blog

Got questions? Just reply to this email!

Best,
Krishna

---
Unsubscribe: ${process.env.EMAIL_USER}
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Welcome email sent to:', email);

    } catch (emailError) {
      console.error('❌ Failed to send welcome email:', emailError);
      // Don't fail the request if email fails
    }

    // Send notification to admin
    try {
      const adminMailOptions = {
        from: {
          name: 'Portfolio Newsletter',
          address: process.env.EMAIL_USER
        },
        to: process.env.EMAIL_TO,
        subject: '🎉 New Newsletter Subscriber!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #10b981; color: white; padding: 20px; border-radius: 5px; }
              .content { background: #f9f9f9; padding: 20px; margin-top: 10px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎉 New Newsletter Subscriber</h2>
              </div>
              <div class="content">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Name:</strong> ${name || 'Anonymous'}</p>
                <p><strong>IP:</strong> ${ipAddress || 'N/A'}</p>
                <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(adminMailOptions);
      console.log('✅ Admin notification sent');

    } catch (adminEmailError) {
      console.error('❌ Failed to send admin notification:', adminEmailError);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      data: {
        email: subscriber.email,
        name: subscriber.name
      }
    });

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error subscribing to newsletter',
      error: error.message
    });
  }
});

// GET: Fetch all subscribers (admin only)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      active: subscribers.filter(s => s.status === 'active').length,
      data: subscribers
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscribers',
      error: error.message
    });
  }
});

// DELETE/Unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our newsletter list'
      });
    }

    subscriber.status = 'unsubscribed';
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({
      success: false,
      message: 'Error unsubscribing',
      error: error.message
    });
  }
});

export default router;