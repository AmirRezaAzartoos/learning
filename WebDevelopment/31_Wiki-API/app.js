const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
	console.log("Server is running on port ", PORT);
});

mongoose
	.connect("mongodb://freedom.dementor.info:27017/wikiDB", {
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

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: String,
});

const Article = mongoose.model("Article", articleSchema);

// Targetting all articles

app.route("/articles")
	.get(function (req, res) {
		Article.find()
			.exec()
			.then(function (ack) {
				res.send(ack);
			})
			.catch(function (err) {
				console.log(err);
			});
	})
	.post(function (req, res) {
		Article({
			title: req.body.title,
			content: req.body.content,
		})
			.save()
			.then(function (ack) {
				res.send("Successfully added a new article.");
			})
			.catch(function (err) {
				res.send(err);
			});
	})
	.delete(function (req, res) {
		Article.deleteMany({})
			.exec()
			.then(function (ack) {
				console.log("Successfully deleted all the articles.");
			})
			.catch(function (err) {
				console.log(err);
			});
	});

// Targeting a specific article

app.route("/articles/:articleTitle")
	.get(function (req, res) {
		Article.findOne({ title: req.params.articleTitle })
			.exec()
			.then(function (ack) {
				if (ack) res.send(ack);
				else res.send("<p> No article found under this title! </p>");
			})
			.catch(function (err) {
				res.send(err);
			});
	})
	.put(function (req, res) {
		Article.updateOne(
			{ title: req.params.articleTitle },
			{
				title: req.body.title,
				content: req.body.content,
			},
		)
			.then(function (ack) {
				res.send(ack);
			})
			.catch(function (err) {
				res.send(err);
			});
	})
	.patch(function (req, res) {
		Article.updateOne(
			{ title: req.params.articleTitle },
			{ $set: req.body },
		)
			.then(function (ack) {
				res.send(ack);
			})
			.catch(function (err) {
				res.send(err);
			});
	})
	.delete(function (req, res) {
		Article.deleteOne({ title: req.params.articleTitle })
			.then(function (ack) {
				res.send(ack);
			})
			.catch(function (err) {
				res.send(err);
			});
	});
