const mongoose =  require ('mongoose');
const ObjectId = Schema.Types.ObjectId;

const department = new mongoose.Schema({
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
        ref: 'techStacks',
      },
    },
  ],
  projectList: [
    {
      project:
      {
        type: ObjectId,
        ref: 'projects',
      },
    },
  ],
  employeeList: [
    {
      employee:
      {
        type: ObjectId,
        ref: 'employees',
      },
    },
  ],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model('Departement', department);