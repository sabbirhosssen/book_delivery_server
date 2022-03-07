const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const {MongoClient, ServerApiVersion}= require('mongodb')
const cors = require('cors');
const { json } = require('express/lib/response');

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://bookDelivery:bXCTyvDeMPshuy1k@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    console.log("server connected")
    try {
        await client.connect()
        
       const database =client.db('bookDelivery');
       const booksCollection = database.collection('allBooks')
    //    POST API
       app.post('/allBooks', async(req,res)=>{
           console.log('hit the  post api');

        // const result = await   booksCollection.insertOne(allBooks)
        // console.log(result);

        res.send('post hited')
       })
    } finally  {
        //  await client.close()
        
    }
}
run().catch(console.dir)
app.get('/', (req,res)=>{
    res.send("hello")
})
app.listen(port, ()=>{
    console.log(`listening to ${port}`)
})

