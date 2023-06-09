//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
	.connect(
		"mongodb://Dem_Mongo:Mongo1998@freedom.dementor.info:27017/todolistDB",
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

const itemSchema = new mongoose.Schema({
	name: String,
});

const Item = mongoose.model("item", itemSchema);

const defaultItems = [
	{
		name: "Welcom to your todolist!",
	},
	{
		name: "Hit the + button to add a new item",
	},
	{
		name: "<-- Hit this to delete an item.",
	},
];

const listSchema = new mongoose.Schema({
	name: String,
	items: [itemSchema],
});

const List = new mongoose.model("List", listSchema);

app.get("/", async function (req, res) {
	const items = await Item.find()
		.exec()
		.then(function (_items) {
			return _items;
		})
		.catch(function (err) {
			console.log(err);
		})
		.finally(function () {
			//mongoose.connection.close();
		});

	if (items.length === 0) {
		Item.insertMany(defaultItems)
			.then(function (ack) {
				console.log(ack);
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(function () {
				//mongoose.connection.close();
			});
		res.redirect("/");
	} else {
		res.render("list", { listTitle: "Today", newListItems: items });
	}
});

app.post("/", function (req, res) {
	if (req.body.list === "Today") {
		Item({
			name: req.body.newItem,
		})
			.save()
			.then(function () {
				console.log("New item added.");
			})
			.catch(function (err) {
				console.log("New item didn't add due to error: ", err);
			})
			.finally(function () {
				res.redirect("/");
				// mongoose.connection.close();
			});
	} else {
		List.findOne({ name: req.body.list })
			.exec()
			.then(function (ack) {
				ack.items.push({
					name: req.body.newItem,
				});
				ack.save()
					.then(function () {
						console.log("New item added.");
					})
					.catch(function (err) {
						console.log("New item didn't add due to error: ", err);
					});
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(function () {
				res.redirect("/" + req.body.list);
			});
	}
});

app.post("/delete", function (req, res) {
	if (req.body.listName === "Today") {
		Item.findByIdAndDelete(req.body.checkbox)
			.then(function (ack) {
				console.log(ack);
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(function () {
				res.redirect("/");
				// mongoose.connection.close();
			});
	} else {
		List.findOneAndUpdate(
			{ name: req.body.listName },
			{ $pull: { items: { _id: req.body.checkbox } } },
		)
			.exec()
			.then(function (ack) {
				console.log(ack);
			})
			.catch(function (err) {
				console.log(err);
			})
			.finally(function () {
				res.redirect("/" + req.body.listName);
			});
	}
});

app.get("/:customListName", function (req, res) {
	const customListName = _.capitalize(req.params.customListName);
	List.findOne({ name: customListName })
		.exec()
		.then(function (ack) {
			if (ack) {
				// Show an existing list.
				res.render("list", {
					listTitle: ack.name,
					newListItems: ack.items,
				});
			} else {
				// create a new list
				List({
					name: customListName,
					items: defaultItems,
				})
					.save()
					.then(function () {
						console.log("New list added.");
					})
					.catch(function (err) {
						console.log("New list didn't add due to error: ", err);
					})
					.finally(function () {
						res.redirect("/" + customListName);
						// mongoose.connection.close();
					});
			}
		})
		.catch(function (err) {
			console.log(err);
		});
});

app.get("/about", function (req, res) {
	res.render("about");
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
