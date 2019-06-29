var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
var passport = require("passport");

process.env.SECRET_KEY = "web is difficult";
const couseID = [
  {
    "作業研究": 0,
    "統計": 1,
    "演算法": 2
  },
  {
    "進階 python": 0,
    "音樂作品欣賞": 1,
    "計算機概論": 2
  },
  {
    "音樂作品欣賞": 0,
    "機器學習演講": 1,
    "管理學": 2
  }
]

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
              expiresIn: 18000 // 1 year in seconds
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
        res.json({ error: 'Student is not found.' })
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

router.post('/selection1', passport.authenticate('token', { session: false }), function(req, res, next) {
  const section_id = 0
  const course_name = req.body.course_name
  // courseID[0] day1, [1] day2, [2] day3
  const course_id = couseID[0][course_name]
  
  const priority = req.body.priority
  let newsection = req.user.section

  while (newsection[section_id] == undefined) {
  	newsection.push([])
  }

  newsection[section_id].push({ course_id: course_id, course_name: course_name, priority: priority })

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