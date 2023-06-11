//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const defaultContent = [
	{
		title: "home",
		content:
			"Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.",
	},
	{
		title: "about",
		content:
			"Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.",
	},
	{
		title: "contact",
		content:
			"Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.",
	},
];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
	.connect(
		"mongodb://Dem_Mongo:Mongo1998@freedom.dementor.info:27017/blogpostDB",
		{
			auth: {
				username: "Dem_Mongo",
				password: "Mongo1998",
			},
			authSource: "admin",
		},
	)
	.then(function (ack) {
		console.log("Successfuly connected to database: ");
	})
	.catch(function (err) {
		console.log("Failed to connect: ", err);
	});

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		dropDups: true,
	},
	content: String,
});

const Post = new mongoose.model("Post", postSchema);

Post.insertMany(defaultContent)
	.then(function (ack) {
		console.log("Default content added successfuly. ", ack);
	})
	.catch(function (err) {
		console.log("dup");
	});
let posts = [];

app.get("/", function (req, res) {
	Post.find()
		.exec()
		.then(function (ack) {
			res.render("home", {
				startingContent: ack[0].content,
				posts: ack.slice(1),
			});
		})
		.catch(function (err) {
			console.log(err);
		});
});

app.get("/about", function (req, res) {
	Post.findOne({ title: "about" })
		.exec()
		.then(function (ack) {
			res.render("about", {
				aboutContent: ack.content,
			});
		})
		.catch(function (err) {
			console.log(err);
		});
});

app.get("/contact", function (req, res) {
	Post.findOne({ title: "contact" })
		.exec()
		.then(function (ack) {
			console.log(ack);
			res.render("contact", {
				contactContent: ack.content,
			});
		})
		.catch(function (err) {
			console.log(err);
		});
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.post("/compose", function (req, res) {
	Post({
		title: req.body.postTitle,
		content: req.body.postBody,
	})
		.save()
		.then(function (ack) {
			console.log(req.body.postTitle, "saved successfuly");
		})
		.catch(function (err) {
			console.log(err);
		})
		.finaly(function () {
			res.redirect("/posts/" + req.body.postTitle);
		});
});

app.get("/posts/:postName", function (req, res) {
	const requestedTitle = req.params.postName;
	console.log(requestedTitle);
	Post.findOne({ _id: requestedTitle })
		.exec()
		.then(function (ack) {
			res.render("post", { post: ack });
			// res.render("post", {
			// 	title: post.title,
			// 	content: post.content,
			// });
		})
		.catch(function (err) {
			console.log(err);
		});
});

const PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
	console.log("Server started on port 3009");
});
