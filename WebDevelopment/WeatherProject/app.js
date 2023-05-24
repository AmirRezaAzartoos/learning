const express = require("express")
const htpps = require("https")
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000, function () {
    console.log("app is listening on port 3000.")
})

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const query = req.body.cityName
    const apiKey = "a1a61f9c517a2fcd7be06360d55784e7"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    htpps.get(url, function (response) {
        response.on("data", function (d) {
            const weatherData = JSON.parse(d)
            const city = weatherData.name
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const weatherDescription = weatherData.weather[0].description
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius.</h1>")
            res.write("<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'></img>")
            res.send()
        })
    })
})