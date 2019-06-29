var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var Teacher = require('../models/teachers');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
var passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  var userData = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    course_name: req.body.course_name
  }

  Teacher.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          Teacher.create(userData)
            .then(user => {
              res.json({ status: user.email + ' regidtered!' })
            })
            .catch(err => {
              res.send('error:' + err)
            })
        })
      } else {
        res.json({ error: "User already existed." })
      }
    })
    .catch(err => {
      res.send('error:' + err)
    })
});

router.post('/login', function(req, res, next) {
  Teacher.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          }

          jwt.sign(
            payload,
            process.env.SECRET_KEY, {
              expiresIn: 1800 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: token,
                name: user.name
              });
            }
          );

        } else {
          res.json({ error: 'password is incorrect.' })
        }

      } else {
        res.json({ error: 'Teacher is not found.' })
      }
    })
    .catch(err => {
      res.send('errpr: ' + err)
    })
})

router.get('/teachers', function(req, res, next) {
  Teacher.find({}, (err, teachers) => {
    res.json(teachers)
  })
})


router.post('/profile', passport.authenticate('teacher_token', { session: false }), function(req, res, next) {
  res.send(req.user)
})

router.put('/addStudent', passport.authenticate('teacher_token', { session: false }), function(req, res, next) {
  const student_id = req.body.student_id
  const name = req.body.student_name
  const school = req.body.student_school
  const email = req.body.studen_email
  let newStudents = req.user.students
  newStudents.push({ student_id: student_id, name: name, school: school, email: email })

  Teacher.findByIdAndUpdate(req.user.id, { students: newStudents }, { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(user);
    })
})

router.delete('/deleteStudent', passport.authenticate('teacher_token', { session: false }), function(req, res, next) {
  const section = req.body.section
  const student_id = req.body.student_id
  let newStudents = req.user.students

  try {
    for (var i = newStudents.length - 1; i >= 0; i--) {
      if (newStudents[i].student_id == student_id) {
        newStudents.splice(i, 1)
        break
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send("something just wrong.")
  }

  Teacher.findByIdAndUpdate(req.user.id, { students: newStudents }, { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(user);
    })
})

router.delete('/deleteALL', function(req, res, next) {
  Teacher.deleteMany({}, (err) => {
    if (err) {
      res.send(err)
    }else {
      res.send("Successfully remove all teachers.")
    }
  })
})

module.exports = router;