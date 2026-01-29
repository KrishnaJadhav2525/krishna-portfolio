# Portfolio Backend API

Backend API for Krishna's Portfolio with MongoDB integration.

## 🚀 Features

- Contact form submission with email notifications
- Blog post management (CRUD operations)
- MongoDB database integration
- RESTful API design
- CORS enabled for frontend integration
- Input validation and error handling

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier works great)
- npm or yarn

## 🛠️ Installation & Setup

### Step 1: Clone the Backend

```bash
# Navigate to your project directory
cd your-project-folder

# Create backend folder
mkdir portfolio-backend
cd portfolio-backend

# Copy all the files I provided into this folder
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: MongoDB Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Create a new cluster (free tier M0)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`

3. **Create Database User**
   - Go to "Database Access" in MongoDB Atlas
   - Add new database user with username and password
   - Remember these credentials!

4. **Whitelist Your IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development

### Step 4: Configure Environment Variables

Create a `.env` file in the backend root:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-receiving-email@gmail.com
```

**Important**: Replace:
- `YOUR_USERNAME` with your MongoDB username
- `YOUR_PASSWORD` with your MongoDB password
- `portfolio` is your database name (you can change it)

### Step 5: Run the Backend

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Your backend should now be running at `http://localhost:5000`

## 📡 API Endpoints

### Contact Form

**POST** `/api/contact`
```json
{
  "email": "user@example.com",
  "subject": "Hello!",
  "message": "Your message here"
}
```

**GET** `/api/contact` - Get all contacts (admin)

### Blog Posts

**GET** `/api/blogs` - Get all published blogs
- Query params: `?tag=AI&search=machine&limit=10&page=1`

**GET** `/api/blogs/:slug` - Get single blog by slug

**POST** `/api/blogs` - Create new blog (admin)
```json
{
  "title": "My First Blog",
  "slug": "my-first-blog",
  "description": "Short description",
  "content": "Full blog content here",
  "tags": ["AI", "Machine Learning"],
  "published": true
}
```

**PUT** `/api/blogs/:id` - Update blog (admin)

**DELETE** `/api/blogs/:id` - Delete blog (admin)

**GET** `/api/blogs/tags/all` - Get all tags

## 🔗 Frontend Integration

### Step 1: Update Frontend Environment Variables

In your Next.js frontend, create/update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 2: Create API Client

Create `lib/api.js` in your frontend:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Contact form
  async submitContact(data) {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Get all blogs
  async getBlogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/blogs?${query}`);
    return response.json();
  },

  // Get single blog
  async getBlog(slug) {
    const response = await fetch(`${API_URL}/blogs/${slug}`);
    return response.json();
  },
};
```

### Step 3: Update Contact Form

Update your contact form in `app/page.tsx`:

```javascript
'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

// Inside your component:
const [formData, setFormData] = useState({
  email: '',
  subject: '',
  message: '',
});
const [status, setStatus] = useState({ type: '', message: '' });
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus({ type: '', message: '' });

  try {
    const result = await api.submitContact(formData);
    
    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setFormData({ email: '', subject: '', message: '' });
    } else {
      setStatus({ type: 'error', message: result.message });
    }
  } catch (error) {
    setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
  } finally {
    setLoading(false);
  }
};

// Update your form JSX:
<form onSubmit={handleSubmit}>
  <input
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
  />
  {/* ... other inputs ... */}
  
  <button type="submit" disabled={loading}>
    {loading ? 'Sending...' : 'Send Message'}
  </button>
  
  {status.message && (
    <p className={status.type === 'success' ? 'text-green-500' : 'text-red-500'}>
      {status.message}
    </p>
  )}
</form>
```

### Step 4: Fetch Blogs

Update your blog page to fetch from API:

```javascript
// app/blog/page.tsx
import { api } from '@/lib/api';

export default async function BlogPage() {
  const { data: blogs } = await api.getBlogs({ limit: 20 });

  return (
    // Render your blogs
  );
}
```

## 🧪 Testing the API

### Using cURL:

```bash
# Test health check
curl http://localhost:5000

# Test contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","subject":"Test","message":"Hello!"}'

# Get blogs
curl http://localhost:5000/api/blogs
```

### Using Postman:
1. Download Postman
2. Create new requests for each endpoint
3. Test all CRUD operations

## 📝 Add Sample Blog Data

You can add sample blogs using MongoDB Compass or via API:

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with AI",
    "slug": "getting-started-with-ai",
    "description": "A beginner-friendly guide to AI",
    "content": "Full content here...",
    "tags": ["AI", "Beginner"],
    "published": true
  }'
```

## 🔒 Security Notes (Important!)

**Current Setup**: This is a development setup. For production:

1. **Add Authentication**
   - Protect admin routes (create, update, delete)
   - Use JWT tokens or OAuth

2. **Rate Limiting**
   - Install `express-rate-limit`
   - Prevent spam on contact form

3. **Input Sanitization**
   - Add `express-validator`
   - Sanitize all user inputs

4. **HTTPS**
   - Use HTTPS in production
   - Update CORS settings

## 🚀 Deployment

### Backend (Railway/Render/Heroku):

1. Push code to GitHub
2. Connect to Railway/Render
3. Add environment variables
4. Deploy!

### Update Frontend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## 📚 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Configure environment variables
3. ✅ Test API endpoints
4. ✅ Integrate frontend
5. ⬜ Add authentication
6. ⬜ Deploy backend
7. ⬜ Update frontend API URL

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Check your connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure correct username/password

**CORS Error:**
- Check FRONTEND_URL in .env
- Ensure frontend is running on correct port

**Port Already in Use:**
- Change PORT in .env
- Kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

## 📞 Support

Need help? Check:
- MongoDB Atlas Documentation
- Express.js Documentation
- Next.js API Integration Guide

Good luck with your portfolio! 🎉
