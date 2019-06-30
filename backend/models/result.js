var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultSchema = new mongoose.Schema({
  section_id: Number,

  data: [{
    course_id: Number,
    classroom: String,
    students: [{type: Schema.Types.ObjectId, ref: 'students'}]
  }]
});

module.exports = Result = mongoose.model("results", resultSchema);