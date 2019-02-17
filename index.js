const fs = require('fs');
const axios = require('axios');
let promise = require('promise');
const email 	= require("emailjs");


//Purpose of the app: To monitor 3rd party apis used in Augmedix services.
//This is the MVP version of the application.
//App Workflow:
//- Read list of APIs from list.json.
//- Do the request to each api.
//- Note down the failed ones.
//- Send and email to [TBD] when at least one failure is detected. 


//Declaring variables.
var obj;
var emailObj;
var resultArr = [];

//Reading APIs from the list.json file.
fs.readFile('list.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  
//Call APIs
promise = new Promise(function(reseolve, reject) {
  for(var i = 0; i < Object.values(obj.api).length; i++){
    axios.post("https://api1.augmedix.com/yubikey/service.php", "otp=ccccccddgtcgjbdgjivbhledcjhcnljkvgcbhbbctunh", {
      headers: {
          "Authorization": "8F06168D-A47B-DBE3-7CA3-AA45117B3E26",
          "Content-Type": "application/x-www-form-urlencoded"
      }
  }).then(response => {
    resultArr.push({
      api: response.data,
      status: response.status
        })      
      })
    }
  if(true) {
    reseolve(resultArr);
    }
});
 
promise.then(function(value){

  console.log("Dekha jaak ki hoi:" + value);

//Email block starts.
//Reading email data from email-data.json
fs.readFile('email-data.json', 'utf8', function (err, data) {
  if (err) throw err;
  emailObj = JSON.parse(data);

//Initializing the email server
var emailServer 	= email.server.connect({
  user:    emailObj.server.user, 
  password:emailObj.server.password, 
  host:    emailObj.server.host, 
  ssl:     true
});

//Send email report
emailServer.send({
      text:    value, 
      from:    emailObj.details.from, 
      to:      emailObj.details.to,
      cc:      emailObj.details.cc,
      subject: emailObj.details.subject
      }, 
    function(err, message) { console.log(err || message); 
    });
  });

promise.catch(function(reason){
  console.log("Kaaj hoi nai");
    });
  });
});
