require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
	session({
		secret: "Our little secret.",
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

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

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
	res.render("home");
});

app.get("/secrets", function (req, res) {
	if (req.isAuthenticated()) res.render("secrets");
	else res.redirect("/login");
});

app.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) console.log(err);
	});
	res.redirect("/");
});

app.route("/register")
	.get(function (req, res) {
		res.render("register");
	})
	.post(function (req, res) {
		User.register(
			{ username: req.body.username },
			req.body.password,
			function (err, user) {
				if (err) {
					console.log(err);
					res.redirect("/register");
				} else {
					passport.authenticate("local")(req, res, function () {
						res.redirect("/secrets");
					});
				}
			},
		);
	});

app.route("/login")
	.get(function (req, res) {
		res.render("login");
	})
	.post(function (req, res) {
		req.login(
			User({
				username: req.body.username,
				password: req.body.password,
			}),
			function (err) {
				if (err) console.log(err);
				else res.redirect("/secrets");
			},
		);
	});
