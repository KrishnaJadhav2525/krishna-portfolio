import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    name: {
      type: String,
      trim: true,
      default: 'Anonymous'
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active'
    },
    ipAddress: {
      type: String,
      default: null
    },
    interests: {
      type: [String],
      default: []
    },
    lastEmailSent: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Add indexes
newsletterSchema.index({ email: 1 });
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ createdAt: -1 });

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;