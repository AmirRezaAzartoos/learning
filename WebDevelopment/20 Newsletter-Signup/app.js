//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName
                }
            }
        ]
    }
    const jasonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/463f343897"
    const option = {
        method: "POST",
        auth: "Dementor:s07fb6d5b2d8834664869279cbcca5032-us21"
    }

    const request = https.request(url, option, function(response){
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
            response.on("data", function(data){
                console.log(JSON.parse(data))
            })
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jasonData)
    request.end()
})


app.post("/failure", function(req, res){
    res.redirect("/")
})

//api key
//07fb6d5b2d8834664869279cbcca5032-us21

//Audience key - List id
//463f343897