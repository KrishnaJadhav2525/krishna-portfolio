import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all published blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { tag, search, limit = 10, page = 1 } = req.query;
    
    let query = { published: true };
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    // Increment views
    blog.views += 1;
    await blog.save();
    
    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
      error: error.message,
    });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post (admin only - add auth)
// @access  Private
router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message,
    });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post (admin only - add auth)
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update blog',
      error: error.message,
    });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post (admin only - add auth)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
      error: error.message,
    });
  }
});

// @route   GET /api/blogs/tags/all
// @desc    Get all unique tags
// @access  Public
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { published: true });
    
    res.json({
      success: true,
      count: tags.length,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
      error: error.message,
    });
  }
});

export default router;
