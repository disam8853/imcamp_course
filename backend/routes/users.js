var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
var passport = require("passport");

process.env.SECRET_KEY = "web is difficult";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  var userData = {
    email: req.body.email,
    name: req.body.name,
    school: req.body.school,
    password: req.body.password,
    section: req.body.section
  }

  Student.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          Student.create(userData)
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
  Student.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            school: user.school,
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
        res.json({ error: 'User is not found.' })
      }
    })
    .catch(err => {
      res.send('errpr: ' + err)
    })
})

router.get('/students', function(req, res, next) {
  Student.find({}, (err, students) => {
    res.json(students)
  })
})

router.post('/profile', passport.authenticate('token', { session: false }), function(req, res, next) {
  res.send(req.user)
})

router.put('/selection', passport.authenticate('token', { session: false }), function(req, res, next) {
  const section_id = req.body.section_id
  const course_id = req.body.course_id
  const priority = req.body.priority
  let newsection = req.user.section

  while (newsection[section_id] == undefined) {
  	newsection.push([])
  }

  newsection[section_id].push({ course_id: course_id, priority: priority })

  Student.findByIdAndUpdate(req.user.id, { section: newsection }, { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(user);
    })
})

router.delete('/selection', passport.authenticate('token', { session: false }), function(req, res, next) {
  const section_id = req.body.section_id
  const course_id = req.body.course_id
  const priority = req.body.priority
  let newsection = req.user.section

  try {
    for (var i = newsection[section_id].length - 1; i >= 0; i--) {
      if (newsection[section_id][i].course_id == course_id) {
        newsection[section_id].splice(i, 1)
        break
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send("something just wrong.")
  }

  Student.findByIdAndUpdate(req.user.id, { section: newsection }, { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(user);
    })
})

router.delete('/deleteALL', function(req, res, next) {
	Student.deleteMany({}, (err) => {
		if (err) {
			res.send(err)
		}else {
			res.send("Successfully remove all students.")
		}
	})
})

module.exports = router;