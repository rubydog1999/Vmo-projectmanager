import mongoose from 'mongoose';

const projectTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  priority: {
    type: Number,
    required: [true, 'Priority field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export const ProjectType = mongoose.model('projectTypes', projectTypeSchema);