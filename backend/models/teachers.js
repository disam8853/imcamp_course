var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  school: String,
  hash: String,
  salt: String,
  select: [{
    section: Number,
    course_id: Number,
    priority: Number
  }]
});