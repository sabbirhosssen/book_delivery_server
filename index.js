const express =require('express');
const app = express();
const ObjectId = require('mongodb').ObjectId;
const port = 5000;
const { MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();
const cors = require('cors');



app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    console.log('hello');
    try{
        await client.connect();
       const database =client.db('bookDelivery');
       const booksCollection = database.collection('allBooks')
       //Get api 
       app.get('/allBooks', async(req ,res)=>{
           const cursor= booksCollection.find({});
           const book = await cursor.toArray()
           res.send(book);
       })
       //Get single book 
       app.get('/allBooks/:id', async(req,res)=>{
           const id = req.params.id;
           const query ={_id: ObjectId(id)}
           const book=await booksCollection.findOne(query)
           res.json(book)
       })


    //    POST API
       app.post('/allBooks', async(req,res)=>{
           const books = req.body
           console.log('hit the  post api',books);

        const result = await   booksCollection.insertOne(books)
        console.log(result);

        res.json(result)
       })

    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir)
app.get('/', (req,res)=>{
    res.send('Runing Book Delivery Server')
})

app.listen(port,()=>{
    console.log(`running port ${port}`);
})