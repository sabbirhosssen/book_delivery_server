const express =require('express');
const app = express();
const port = 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
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
    //    POST API
       app.post('/allBooks', async(req,res)=>{
           console.log('hit the  post api');

        // const result = await   booksCollection.insertOne(allBooks)
        // console.log(result);

        res.send('post hited')
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