const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://freedom.dementor.info:27017";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('fruitsDB');
        const fruits = database.collection('fruits');

        const docs = [
            {
                name: "Apple",
                score: 5,
                review: "Acceptable",
            },
            {
                name: "Coconut",
                score: 8,
                review: "Love it !",
            },
            {
                name: "Mango",
                score: 10,
                review: "Best one.",
            }
        ]
        //const result = await fruits.insertMany(docs);

        // Query for a fruit that has the title 'The Room'
        const query = { name: "Apple" };
        const options = {
            // sort matched documents in descending order by rating
            sort: { "score": 1 },
            // Include only the `title` and `imdb` fields in the returned document
            projection: { _id: 1, name: 1, score: 1 },
        };
        const cursor = await fruits.find(query, options);
        
        for await (const doc of cursor) {
            console.dir(doc);
          }

        //const result = await fruits.deleteOne({ _id: ObjectId("648084ff99a4bdc3796890d8") })

        //console.log(result);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);