var mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
  section: Number,
  
  data: [{
    course_id: Number,
    classroom: String,
    students: [{
      student_id: String,
      name: String,
      school: String,
      email: String
    }]
  }]

 ]
});

module.exports = Result = mongoose.model("teachers", resultSchema);