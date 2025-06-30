const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const dotenv =require('dotenv')
const cors = require('cors')
const app = express()
const port = 3000
dotenv.config()

// Middleware to parse JSON bodies
app.use(bodyparser.json()); 
app.use(cors())

//connect url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


// Database Name
const dbName = 'passop';



// Use connect method to connect to the server
client.connect();


//Get all password
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwordsAll');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

// Save all password
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwordsAll');               
    const findResult = await collection.insertOne(password)
    // res.send(req.body)
    // res.send({success:true, result:findResult})
}) 

// Delete password
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwordsAll');
    const findResult = await collection.deleteOne(password)
    res.send({success:true, result:findResult}) 
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  










// require('dotenv').config()