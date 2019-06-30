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

const courseID = [{
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


for (var i = 2; i < csvData.length; i++) {
  let email = csvData[i][5],
    name = csvData[i][0],
    password = csvData[i][2],
    school = csvData[i][3]

  let nums = [0,1,2],
    ranNums = [],
    ii = nums.length,
    j = 0;

  while (ii--) {
    j = Math.floor(Math.random() * (ii + 1));
    ranNums.push(nums[j]);
    nums.splice(j, 1);
  }


  let newsection = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
  ]
  newsection[0][0].course_name = '作業研究'
  newsection[0][0].course_id = 0
  newsection[0][0].priority = ranNums[0]
  // newsection[0][0].priority = 0
  newsection[0][1].course_name = '統計'
  newsection[0][1].course_id = 1
  newsection[0][1].priority = ranNums[1]
  // newsection[0][1].priority = 1
  newsection[0][2].course_name = '演算法'
  newsection[0][2].course_id = 2
  newsection[0][2].priority = ranNums[2]
  // newsection[0][2].priority = 2

  Student.findOne({ email: email })
    .then(user => {
      if (user) {
        user.section = newsection
        user.save(err => {
          if (err) {
            console.log(err)
          } else
            console.log(user.name + " add data successfully!")
        })

      } else {
        console.log({ error: "Student is not found." })
      }
    })
    .catch(err => {
      console.log('error:' + err)
    })
}