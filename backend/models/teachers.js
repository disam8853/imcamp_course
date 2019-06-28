var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    course_id: Number,
    section: Number
  }]
});

module.exports = Teacher = mongoose.model("teachers", teacherSchema);