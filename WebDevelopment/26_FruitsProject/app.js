const mongoose = require("mongoose");

const mongoUrl = "mongodb://freedom.dementor.info:27017/fruitDB";
mongoose
	.connect(mongoUrl)
	.then(function () {
		console.log("Successfully connected to ", mongoUrl);
	})
	.catch(function (err) {
		console.log("Error happened while connecting: ", err);
	});

// schema with build-in valodation
const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name must be entered."],
	},
	score: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit({
	name: "Pineaplle",
	score: "10",
	review: "One of the best.",
});

// Fruit({
// 	name: "Yabadabadu",
// 	score: 10,
// 	review: "Yo",
// })
// 	.save()
// 	.then(function () {
// 		console.log("New Fruit added.");
// 	})
// 	.catch(function (err) {
// 		console.log("New fruit didn't add due to error: ", err);
// 	});

// const arr = [
// 	{
// 		name: "Apple",
// 		score: 5,
// 		review: "Acceptable",
// 	},
// 	{
// 		name: "Coconut",
// 		score: 8,
// 		review: "Love it !",
// 	},
// 	{
// 		name: "Mango",
// 		score: 10,
// 		review: "Best one.",
// 	},
// ];

// Fruit.insertMany(arr)
// 	.then(function () {
// 		console.log("Success !");
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	});

// Fruit.find()
// 	.exec()
// 	.then(function (res) {
// 		res.forEach(function (fruit) {
// 			console.log(fruit.name);
// 		});
// 	})
// 	.catch(function (err) {
// 		console.log("Erro acured " + err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});

// Fruit.updateOne({ _id: "64821ea92194ca86ef1fa702" }, { score: 5 })
// 	.then(function (ack) {
// 		console.log(ack);
// 	})
// 	.catch(function (err) {
// 		console.log("Error happened while updating: ");
// 	});

// Fruit.deleteOne({ name: "Yabadabadu" })
// 	.then(function (ack) {
// 		console.log(ack);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});

const PersonSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", PersonSchema);

// Person({
// 	name: "John",
// 	score: 35,
// })
// 	.save()
// 	.then(function () {
// 		console.log("New Person added.");
// 	})
// 	.catch(function (err) {
// 		console.log("New Person didn't add due to error: ", err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});

// async function addPerson() {
// 	try {
// 		const coconut = await Fruit.findOne({ name: "Coconut" })
// 			.exec()
// 			.then(function (ack) {
// 				return ack;
// 			});

// 		const person = new Person({
// 			name: "Amy",
// 			age: 20,
// 			favoriteFruit: coconut,
// 		});

// 		await person.save();

// 		console.log("New Person added.");
// 	} catch (error) {
// 		console.log("New Person didn't add due to error:", error);
// 	} finally {
// 		mongoose.connection.close();
// 	}
// }
// addPerson();

// Person.deleteOne({ name: "Amy" })
// 	.then(function (ack) {
// 		console.log(ack);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});

// Person.deleteMany({ name: "John" })
// 	.then(function (ack) {
// 		console.log(ack);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});

// Person.updateOne({ name: "John" }, { favoriteFruit: pineapple })
// 	.then(function (ack) {
// 		console.log(ack);
// 	})
// 	.catch(function (err) {
// 		console.log(err);
// 	})
// 	.finally(function () {
// 		mongoose.connection.close();
// 	});
