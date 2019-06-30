var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Student = require('./models/students');
var Teacher = require('./models/teachers');
var bcrypt = require('bcrypt');

var request = new XMLHttpRequest();
request.open("GET", 'https://gist.githubusercontent.com/disam8853/7d0527464661eae0b9af136439f9c376/raw/946436339aa2a6bb10ba4704e724085448f179de/students.csv', false);

request.send(null);

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].split(','));
}
// Retrived data from csv file content

for (var i = 2; i < csvData.length; i++) {
  let email = csvData[i][5],
    name = csvData[i][0],
    password = csvData[i][2],
    school = csvData[i][3]
  let userData = {
    email: email,
    name: name,
    password: password,
    school: school,
    section: [[]]
  }


  Student.findOne({ email: csvData[i][5] })
    .then(user => {
      if (!user) {
        bcrypt.hash(password, 10, (err, hash) => {
          userData.password = hash
          Student.create(userData)
            .then(user => {
              console.log({ status: user.email + ' regidtered!' })
            })
            .catch(err => {
              console.log('error:' + err)
            })
        })
      } else {
        console.log({ error: "Student already existed." })
      }
    })
    .catch(err => {
      console.log('error:' + err)
    })
}

const teacherData = [
  {
    email: 'OperationResearch',
    name: '作業研究',
    password: '2019ntuimcamp',
    course_name: '作業研究'
  },
  {
    email: 'Statistic',
    name: '統計',
    password: '2019ntuimcamp',
    course_name: '統計'
  },
  {
    email: 'Algorithm',
    name: '演算法',
    password: '2019ntuimcamp',
    course_name: '演算法'
  },
  {
    email: 'AdvancedPython',
    name: '進階 python',
    password: '2019ntuimcamp',
    course_name: '進階 python'
  },
  {
    email: 'Music1',
    name: '音樂作品欣賞',
    password: '2019ntuimcamp',
    course_name: '音樂作品欣賞1'
  },
  {
    email: 'ComputerScience',
    name: '計算機概論',
    password: '2019ntuimcamp',
    course_name: '計算機概論'
  },
  {
    email: 'Music2',
    name: '音樂作品欣賞',
    password: '2019ntuimcamp',
    course_name: '音樂作品欣賞2'
  },
  {
    email: 'MachineLearning',
    name: '機器學習演講',
    password: '2019ntuimcamp',
    course_name: '機器學習演講'
  },
  {
    email: 'Management',
    name: '管理學',
    password: '2019ntuimcamp',
    course_name: '管理學'
  }
]

for (var i = teacherData.length - 1; i >= 0; i--) {
  let td = teacherData[i]

  let userData = {
    email: td.email,
    name: td.name,
    password: td.password,
    course_name: td.course_name
  }


  Teacher.findOne({ email: td.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(td.password, 10, (err, hash) => {
          userData.password = hash
          Teacher.create(userData)
            .then(user => {
              console.log({ status: user.email + ' regidtered!' })
            })
            .catch(err => {
              console.log('error:' + err)
            })
        })
      } else {
        console.log({ error: "Teacher already existed." })
      }
    })
    .catch(err => {
      console.log('error:' + err)
    })
}