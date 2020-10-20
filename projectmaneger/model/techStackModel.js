const mongoose =  require('mongoose');
const techStackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  status: {
    type: String,
    default: 'active',
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('techStack', techStackSchema);