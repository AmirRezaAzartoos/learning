const express = require("express")
const htpps = require("https")

const app = express();


app.listen(3000, function(){
    console.log("app is listening on port 3000.")
})

app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=a1a61f9c517a2fcd7be06360d55784e7&units=metric"
    htpps.get(url, function(response){
        response.on("data", function(d){
            const weatherData = JSON.parse(d)
            const city = weatherData.name
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const weatherDiscription = weatherData.weather[0].discription
            res.write("<p>The weather is currently "+ weatherDiscription + "</p>")
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>")
            res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'></img>")
            res.send()
        })
    })
})