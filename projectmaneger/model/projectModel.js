const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const project = new Schema({
  name: {
    type: String,
    required: [true, 'Project name field is required'],
    unique: true,
  },
  description: {
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
  projectType: {
    type: ObjectId,
    ref: 'ProjectType',
  },
  projectStatus: {
    type: ObjectId,
    ref: 'ProjectStatus',
  },
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

module.exports = mongoose.model('Project', project);