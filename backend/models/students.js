var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  unlucky: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  school: String,
  password: {
    type: String,
    required: true
  },
  section: [
    [{
      course_id: Number,
      course_name: String,
      priority: Number
    }]
  ],
  result: [{
    section_id: Number,
    course_name: String,
    classrome: String

  }]
});

module.exports = Student = mongoose.model("students", studentSchema);