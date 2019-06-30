var express = require('express');
var router = express.Router();
var Student = require('../models/students');
var Result = require('../models/result')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
var passport = require("passport");

var D = require('../distribution.js')

process.env.SECRET_KEY = "web is difficult";
const courseID = [{
    "作業研究": 0,
    "統計": 1,
    "演算法": 2,
    '0': "作業研究",
    '1': "統計",
    '2': "演算法"
  },
  {
    "進階 python": 0,
    "音樂作品欣賞": 1,
    "計算機概論": 2,
    '0': "進階 python",
    '1': "音樂作品欣賞",
    '2': "計算機概論"
  },
  {
    "音樂作品欣賞": 0,
    "機器學習演講": 1,
    "管理學": 2,
    '0': "音樂作品欣賞",
    '1': "機器學習演講",
    '2': "管理學"
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

router.get('/distribution', function(req, res, next) {
  Student.find({}, (err, students) => {
    let section_id = req.query.section_id || 0

    let data
    try {
      data = D.distribution(0, students)
    } catch (err) {
      console.log(err)
      res.status(500).send(err);
    }
    // console.log(data.result[section_id])

    console.log("user = " + data.data)

    // update student data
    for (var i = data.data.length - 1; i >= 0; i--) {
      let id = data.data[i]._id
      Student.findByIdAndUpdate(id, data.data[i], { new: true },
        (err, user) => {
          if (err) {
          	console.log(err)
            res.status(500).send(err);
          }
        })
    }

    Result.findOne({ section_id: section_id })
      .then(result => {
        if (result) {
          console.log("dsafasd")
          result.data = data.result[section_id]
          // for (var i = result.data.students.length - 1; i >= 0; i--) {
          //   result.data.students.push(result.data.students[i])
          // }
          result.save(err => {
            if (err) {
              console.log(err)
              res.status(500).send('err' + err)
            } else {
              console.log("update successful!")
              tellStudent(result, section_id)
              res.send(result)
            }
          })
        } else {
          let resultData = {
            section_id: section_id,
            data: data.result[section_id]
          }

          Result.create(resultData)
            .then(result => {

              tellStudent(result, section_id)

              res.json({ status: '第' + (result.section_id + 1) + "個時段已經分發完成！" })
            })
            .catch(err => {
              res.send('error:' + err)
            })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })

  })


  function tellStudent(result, section_id) {
    console.log("result length: " + result.data.length)
    for (let i = 0; i < result.data.length; i++) {
      for (var j = result.data[i].students.length - 1; j >= 0; j--) {
        let id = result.data[i].students[j]

        Student.findById(id, (err, user) => {
          if (!err) {
            let exist = false

            for (var jj = 0; jj < user.result.length; jj++) {
              if (user.result[jj].section_id == section_id) {

                user.result[jj].course_name = courseID[section_id][result.data[i].course_id]
                user.result[jj].classroom = result.data[i].classroom
                exist = true
                user.save()
                break
              }
            }

            if (!exist) {
              user.result.push({
                section_id: section_id,
                course_name: courseID[section_id][result.data[i].course_id],
                classroom: result.data[i].classroom
              })

              user.save()
            }
          } else {
            console.log(err)
            res.send('error: ' + err)
          }


        })

      }
    }
  }

})

router.get('/get_result', function(req, res, next) {
  // let section_id = req.query.section_id || 0

  Result.find({}, (err, results) => {
    res.json(results)
  })
})

router.delete('/delete_result', function(req, res, next) {
  Result.deleteMany({}, (err) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Successfully remove all results.")
    }
  })
})

router.post('/selection1', passport.authenticate('token', { session: false }), function(req, res, next) {
  const section_id = (req.body.section_id || 0)
  const course_name = req.body.course_name
  // courseID[0] day1, [1] day2, [2] day3
  const course_id = courseID[0][course_name]

  const priority = req.body.priority
  let newsection = req.user.section

  while (newsection[section_id] == undefined) {
    newsection.push([])
  }

  let exist = false
  for (var i = newsection[section_id].length - 1; i >= 0; i--) {
    if (newsection[section_id][i].course_name == course_name) {
      exist = true
      newsection[section_id][i].priority = priority
      break
    }
  }

  if (!exist) {
    newsection[section_id].push({ course_id: course_id, course_name: course_name, priority: priority })
  }

  Student.findByIdAndUpdate(req.user.id, { section: newsection }, { new: true },
    (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      return res.json(user);
    })
})

router.post('/selection', passport.authenticate('token', { session: false }), function(req, res, next) {
  const list = req.body.list
  const section_id = (req.body.section_id || 0)
  let newsection = req.user.section

  while (newsection[section_id] == undefined) {
    newsection.push([])
  }

  try {
    for (var i = 0; i < list.length; i++) {
      let name = list[i]
      let course_id = courseID[section_id][name]

      while (newsection[section_id][i] == undefined) {
        newsection[section_id].push([])
      }

      newsection[section_id][i].course_id = course_id
      newsection[section_id][i].course_name = name
      newsection[section_id][i].priority = i
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }

  Student.findByIdAndUpdate(req.user.id, { section: newsection }, { new: true },
    (err, user) => {
      if (err) {
        console.log(err)
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
    } else {
      res.send("Successfully remove all students.")
    }
  })
})

module.exports = router;