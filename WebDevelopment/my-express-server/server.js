//jshint esversion
const express = require("express")
const app = express()

app.get("/", function(req, res){
    res.send("<h1>Hello World</h1>")
})

app.get("/Contact", function(req, res){
    res.send("<h1>Contact me: lio.azartoos@gmail.com</h1>")
})

app.get("/About", function(req, res){
    res.send("<h1>My name is AmirReza and this is my first es server.</h1>")
})

app.listen(3000, function(){
    console.log("server started on port 3000")
})