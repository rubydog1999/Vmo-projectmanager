const mongoose = require ("mongoose");
const AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  },
  // status: {
  //   type: String,
  //   default: 'active',
  // },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
module.exports = mongoose.model('Admin',AdminSchema)