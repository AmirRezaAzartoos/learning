//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.listen(PORT, () => console.log("Server is running on port 3001."))

const items = ["Buy food", "Cook food", "Eat food"]
const workItems = []

app.get("/", function (req, res) {
    const day = date.getDate()
    res.render("list", { listTitle: day, newListItems: items })
})

app.post("/", function (req, res) {
    if (req.body.list === "Work") {
        workItems.push(req.body.newItem)
        res.redirect("/work")
    }
    else {
        items.push(req.body.newItem)
        res.redirect("/")
    }
    console.log(req.body)
})

app.get('/work', function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.get('/about', function (req, res) {
    res.render("about")
})
