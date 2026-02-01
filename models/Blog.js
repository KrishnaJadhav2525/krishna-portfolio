import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      default: 'Krishna Jadhav',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    coverImage: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
blogSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Prevent model recompilation in development
const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;