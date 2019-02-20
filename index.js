const fs = require('fs');
const axios = require('axios');
const email = require("emailjs");

let obj = JSON.parse(fs.readFileSync('list.json', 'utf8'));
let emailConfig = JSON.parse(fs.readFileSync('email-data.json', 'utf8'));

async function requestApi() {
    var resultArr = [];

    for (var i = 0; i < Object.values(obj.api).length; i++) {
        let response = await axios.get("http://172.23.101.126:50003/swagger-ui.html#/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEyMywicmxzIjpbIlNDUklCRSJdLCJleHAiOjI1MTYyMzkwMjJ9.q1_2g-2b4YbEvQXmUK5cAOUOy9O1ExCTCt-Ka8SGVTg",
            }
        });
        resultArr.push({
            statuscode: response.status
        })
    }

    return resultArr;
}

function sendEmail(body) {
    let emailServer = email.server.connect({
        user: emailConfig.server.user,
        password: emailConfig.server.password,
        host: emailConfig.server.host,
        ssl: true
    });

    emailServer.send({
        text: body,
        from: emailConfig.details.from,
        to: emailConfig.details.to,
        cc: emailConfig.details.cc,
        subject: emailConfig.details.subject
    });
}

(async () => {
    let result = await requestApi();
    sendEmail(JSON.stringify(result));
    // result
    //     .map(x => x.statuscode * 2)
    //     .forEach(sendEmail)
})();

