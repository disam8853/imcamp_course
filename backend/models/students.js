var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var studentSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
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
      priority: Number
    }]
  ]

});

module.exports = Student = mongoose.model("students", studentSchema);