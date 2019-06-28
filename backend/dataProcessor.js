var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Student = require('./models/students');
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
        console.log({ error: "User already existed." })
      }
    })
    .catch(err => {
      console.log('error:' + err)
    })
}