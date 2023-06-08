const mongoose = require("mongoose")

mongoose.connect("mongodb://freedom.dementor.info:27017/fruitDB")

const fruitSchema = new mongoose.Schema({
    id: Number,
    name: String,
    rating: Number,
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

// const apple = new Fruit(
//     {
//         id: 1,
//         name: "Apple",
//         score: 5,
//         review: "Acceptable"
//     })

// const coconut = new Fruit(
//     {
//         id: 1,
//         name: "Coconut",
//         score: 8,
//         review: "Love it !"
//     })

// const mango = new Fruit(
//     {
//         id: 1,
//         name: "Mango",
//         score: 10,
//         review: "Best one."
//     })

const arr = [
    {
        id: 1,
        name: "Apple",
        score: 5,
        review: "Acceptable",
    },
    {
        id: 2,
        name: "Coconut",
        score: 8,
        review: "Love it !",
    },
    {
        id: 3,
        name: "Mango",
        score: 10,
        review: "Best one.",
    }
]

Fruit.insertMany(arr).then(function () {
    console.log("Success !")
}).catch(function (err) {
    console.log(err)
})

const PersonSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number
})

const Person = mongoose.model("Person", PersonSchema)

const person = new Person(
    {
        id: 1,
        name: "John",
        age: 26
    })

// person.save()