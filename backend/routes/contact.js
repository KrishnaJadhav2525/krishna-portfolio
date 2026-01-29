import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email transporter configuration (optional)
const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    // Validation
    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Get IP address
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Create contact entry
    const contact = await Contact.create({
      email,
      subject,
      message,
      ipAddress,
    });

    console.log('✅ Contact saved to database:', contact._id);

    // Try to send email notification (optional - won't fail if email not configured)
    try {
      const transporter = createTransporter();
      if (transporter && process.env.EMAIL_TO) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Received at: ${new Date().toLocaleString()}</small></p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('📧 Email notification sent');
      } else {
        console.log('⚠️ Email not configured - skipping notification');
      }
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('⚠️ Email failed (but contact saved):', emailError.message);
    }

    // Always return success if saved to database
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (admin only - you should add auth)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
});

export default router;