import express from 'express';
import Contact from '../models/contact.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Email configuration
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

// Verify transporter on startup
transporter.verify(function(error, success) {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// POST: Create new contact
router.post('/', async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, subject, and message'
      });
    }

    const ipAddress = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress;

    const contact = new Contact({
      email,
      subject,
      message,
      ipAddress,
      status: 'new'
    });

    await contact.save();
    console.log('✅ Contact saved to database:', contact._id);

    // Send email notification
    try {
      const mailOptions = {
        from: {
          name: 'Portfolio Contact Form',
          address: process.env.EMAIL_USER
        },
        to: process.env.EMAIL_TO,
        subject: `🔔 New Contact: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 30px; 
                border-radius: 10px 10px 0 0; 
                text-align: center; 
              }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #555; margin-bottom: 5px; }
              .value { 
                background: white; 
                padding: 15px; 
                border-radius: 5px; 
                border-left: 4px solid #667eea; 
              }
              .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 New Contact Message</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Contact Form</p>
              </div>
              
              <div class="content">
                <div class="field">
                  <div class="label">📧 From:</div>
                  <div class="value">${email}</div>
                </div>
                
                <div class="field">
                  <div class="label">📋 Subject:</div>
                  <div class="value">${subject}</div>
                </div>
                
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                
                <div class="field">
                  <div class="label">🌐 IP Address:</div>
                  <div class="value">${ipAddress || 'N/A'}</div>
                </div>
                
                <div class="field">
                  <div class="label">🕒 Received:</div>
                  <div class="value">${new Date().toLocaleString()}</div>
                </div>
              </div>
              
              <div class="footer">
                <p>Contact ID: ${contact._id}</p>
                <p><a href="http://localhost:3000/admin">View in Admin Dashboard</a></p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
New Contact Form Submission

From: ${email}
Subject: ${subject}

Message:
${message}

IP: ${ipAddress || 'N/A'}
Time: ${new Date().toLocaleString()}
ID: ${contact._id}
        `
      };

      console.log('📧 Attempting to send email...');
      console.log('From:', process.env.EMAIL_USER);
      console.log('To:', process.env.EMAIL_TO);

      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully!');
      console.log('Message ID:', info.messageId);

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      data: contact
    });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
      error: error.message
    });
  }
});

// GET: Fetch all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// GET: Fetch single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
      error: error.message
    });
  }
});

// PATCH: Update contact status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
      error: error.message
    });
  }
});

// DELETE: Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
      error: error.message
    });
  }
});

export default router;