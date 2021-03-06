const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const password = 's1rd1rp1r1r';


const uri = "mongodb+srv://Rana-Ahammed:s1rd1rp1r1r@cluster0.yp1ox.mongodb.net/organicDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})






client.connect(err => {
 
  const productCollection = client.db("organicDb").collection("products");

    app.get('/products', (req, res) => {
      productCollection.find({})
      .toArray( (err, documents) => {
        res.send(documents);
      })
    })


    app.post('/addProducts', (req, res) => {
      const product = req.body;
      productCollection.insertOne(product)
      .then(result => {
        console.log('data added successfully');
        res.send('success');
      })
    })

    app.delete('/delete/:id', (req, res) => {
      productCollection.deleteOne({_id: ObjectId.valueOf(req.params.id)})
      .then(result => {
        console.log(result);
      })
    })
  
});



app.listen(3000);