const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const department = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true,
  },
  functionality: {
    type: String,
    required: [true, 'Description field is required'],
  },
  techStackList: [
    {
      techStack:
      {
        type: ObjectId,
        ref: 'techStack',
      },
    },
  ],
  projectList: [
    {
      project:
      {
        type: ObjectId,
        ref: 'Project',
      },
    },
  ],
  employeeList: [
    {
      employee:
      {
        type: ObjectId,
        ref: 'Employee',
      },
    },
  ],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Department', department);