const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

    // to display on the wabpage
    // res.send("hello");

});

app.post("/", function (req, res) {
    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.email;
    // console.log(firstName, lastName, eMail);
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    }

    var jsonData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/101e733b7e";
    const options = {
        method: "POST",
        auth: "Gemechu:e8a54b4f60ac26afdb3f0a94578db78b-us2"
    }


    const request = https.request(url, options, function (response) {
        
        console.log(response.statusCode);
        if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
        } else {
          res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });

    });
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(){
res.redirect("/");
});
app.listen(3000, function (req, res) {
    console.log("server is up and running");
});

// API key
// e8a54b4f60ac26afdb3f0a94578db78b-us2

// Audience ID
// 101e733b7e