const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    res.send("Your answet is " + (Number(req.body.num1) + Number(req.body.num2)))
})

app.listen(3000, function(){
    console.log("listenin on port 3000")
})  