const fs = require('fs');
const axios = require('axios');
var obj;

//Purpose of the app: To monitor 3rd party apis used in Augmedix services.
//This is the MVP version of the application.
//App Workflow:
//- Read list of APIs from list.json.
//- Do the request to each api.
//- Note down the failed ones.
//- Send and email to [TBD] when at least one failure is detected. 

fs.readFile('list.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  
  function length(obj) {
    return Object.values(obj).length;
}

 for(var i = 0; i < length(obj.api); i++){
    // use axios here to make the api calls
  }
});

    // .then(response => response.json())
    // .then(json => console.log(json))