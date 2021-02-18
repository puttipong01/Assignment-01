const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superAdmin:4229622fluk@cluster0.obgj7.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })


async function connect() {
    await client.connect()
}
connect()

app.get('/weatherdata', async (req, res) => {
    try {
        const position = req.query.position
        const callLetters = req.query.callLetters
        const airTemperature = req.query.airTemperature
        const ts = req.query.ts
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query = {}
        if (position){
            query.callLetters = callLetters
        }
        // const query = {cuisine: cuisine , borough: borough}
        const cursor = collection.find(query).limit(10)
        let restaurants = []
        await cursor.forEach(doc => restaurants.push(doc.name))

        res.send(restaurants)
    }
    catch(e) {
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))