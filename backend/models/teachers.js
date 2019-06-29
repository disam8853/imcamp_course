var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  course_name: {
    type: String,
    required: true
  },
  students: [{
    student_id: String,
    name: String,
    school: String,
    email: String
  }]
});

module.exports = Teacher = mongoose.model("teachers", teacherSchema);