require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

console.log(md5('123456'))

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3012;
app.listen(PORT, function () {
	console.log("Server is running on port ", PORT);
});

mongoose
	.connect("mongodb://freedom.dementor.info:27017/userDB", {
		auth: {
			username: "Dem_Mongo",
			password: "Mongo1998",
		},
		authSource: "admin",
	})
	.then(function (ack) {
		console.log("Successfuly connected to database: ");
	})
	.catch(function (err) {
		console.log("Failed to connect: ", err);
	});

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
	res.render("home");
});

app.route("/register")
	.get(function (req, res) {
		res.render("register");
	})
	.post(function (req, res) {
		User({
			email: req.body.username,
			password: md5(req.body.password),
		})
			.save()
			.then(function (ack) {
				console.log("User saved successfully.");
				res.render("secrets");
			})
			.catch(function (err) {
				console.log(err);
			});
	});

app.route("/login")
	.get(function (req, res) {
		res.render("login");
	})
	.post(function (req, res) {
		User.findOne({
			email: req.body.username,
		})
			.exec()
			.then(function (ack) {
				if (ack.password === md5(req.body.password))
					res.render("secrets");
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(function (param) {});
	});
