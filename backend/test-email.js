import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('🔍 Email Configuration Test\n');
console.log('Environment Variables:');
console.log('EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ SET (hidden)' : '❌ NOT SET');
console.log('EMAIL_TO:', process.env.EMAIL_TO || '❌ NOT SET');
console.log('\n' + '='.repeat(50) + '\n');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
  console.error('❌ Error: Email environment variables not configured properly!');
  console.log('\nPlease check your .env file has:');
  console.log('EMAIL_USER=jadhavkrishna475@gmail.com');
  console.log('EMAIL_PASS=your-app-password-here');
  console.log('EMAIL_TO=jadhavkrishna475@gmail.com');
  process.exit(1);
}

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

async function testEmail() {
  try {
    console.log('📧 Testing SMTP connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: {
        name: 'Portfolio Test',
        address: process.env.EMAIL_USER
      },
      to: process.env.EMAIL_TO,
      subject: '✅ Test Email - Portfolio Backend',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; 
                        border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                     color: white; padding: 40px 20px; text-align: center; }
            .content { padding: 40px 20px; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; 
                      padding: 15px; border-radius: 5px; margin: 20px 0; }
            .info { background: #d1ecf1; border: 1px solid #bee5eb; color: #0c5460; 
                   padding: 15px; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 Email Setup Successful!</h1>
            </div>
            <div class="content">
              <div class="success">
                <strong>✅ Congratulations!</strong><br>
                Your portfolio email notifications are working correctly.
              </div>
              
              <h2>What this means:</h2>
              <ul>
                <li>Your backend can send emails</li>
                <li>Gmail SMTP is configured correctly</li>
                <li>You'll receive notifications when someone contacts you</li>
              </ul>
              
              <div class="info">
                <strong>📧 Email Configuration:</strong><br>
                From: ${process.env.EMAIL_USER}<br>
                To: ${process.env.EMAIL_TO}<br>
                Time: ${new Date().toLocaleString()}
              </div>
              
              <h2>Next Steps:</h2>
              <ol>
                <li>Test the contact form on your portfolio</li>
                <li>Check if you receive the notification email</li>
                <li>If email goes to spam, mark it as "Not spam"</li>
              </ol>
            </div>
            <div class="footer">
              <p>This is a test email from your Portfolio Backend</p>
              <p>If you didn't request this test, you can safely ignore it.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
✅ Email Setup Successful!

Congratulations! Your portfolio email notifications are working correctly.

What this means:
- Your backend can send emails
- Gmail SMTP is configured correctly
- You'll receive notifications when someone contacts you

Email Configuration:
From: ${process.env.EMAIL_USER}
To: ${process.env.EMAIL_TO}
Time: ${new Date().toLocaleString()}

Next Steps:
1. Test the contact form on your portfolio
2. Check if you receive the notification email
3. If email goes to spam, mark it as "Not spam"

This is a test email from your Portfolio Backend.
      `
    });

    console.log('✅ Test email sent successfully!\n');
    console.log('📬 Email Details:');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('\n✨ Check your inbox:', process.env.EMAIL_TO);
    console.log('⚠️  If not in inbox, check SPAM folder!\n');

  } catch (error) {
    console.error('\n❌ Email Test Failed!\n');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.code) {
      console.error('Error Code:', error.code);
    }
    
    if (error.command) {
      console.error('Failed Command:', error.command);
    }

    if (error.responseCode) {
      console.error('Response Code:', error.responseCode);
    }

    console.log('\n🔧 Troubleshooting Tips:');
    
    if (error.message.includes('Invalid login')) {
      console.log('❌ Invalid credentials! Check:');
      console.log('   1. EMAIL_USER is correct');
      console.log('   2. EMAIL_PASS is your Gmail App Password (not regular password)');
      console.log('   3. App password has no spaces');
      console.log('   4. Generate new app password: https://myaccount.google.com/apppasswords');
    } else if (error.message.includes('timeout')) {
      console.log('❌ Connection timeout! Check:');
      console.log('   1. Internet connection');
      console.log('   2. Firewall/antivirus settings');
      console.log('   3. Try port 465 instead of 587');
    } else if (error.message.includes('EAUTH')) {
      console.log('❌ Authentication error! Check:');
      console.log('   1. 2-Step Verification is enabled on Gmail');
      console.log('   2. App password is generated');
      console.log('   3. App password is correctly copied (16 characters, no spaces)');
    } else {
      console.log('❌ Unknown error. Try:');
      console.log('   1. Regenerate Gmail App Password');
      console.log('   2. Double-check .env file');
      console.log('   3. Restart the server');
    }
    
    console.log('\n📖 See EMAIL_TROUBLESHOOTING.md for detailed help\n');
  }
}

testEmail();