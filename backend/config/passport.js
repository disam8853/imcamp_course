const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
var passport = require("passport");

const Student = mongoose.model("students");
const Teacher = mongoose.model("teachers");

passport.use('token', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromBodyField('token'),
    secretOrKey: process.env.SECRET_KEY
  },
  (jwtPayload, done) => {
    Student.findById(jwtPayload._id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })
)

passport.use('teacher_token', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromBodyField('token'),
    secretOrKey: process.env.SECRET_KEY
  },
  (jwtPayload, done) => {
    Teacher.findById(jwtPayload._id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })
)