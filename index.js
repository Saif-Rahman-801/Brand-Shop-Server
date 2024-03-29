const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.86h0qhu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db("foodDB");
    const FoodismCollection = database.collection("Foodism");
    const ProductsCollection = database.collection("Products");
    const CartCollection = database.collection("cartCollection");

    // Read all data
    app.get("/brands", async (req, res) => {
      const cursor = FoodismCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const cursor = ProductsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/cart", async (req, res) => {
      const cursor = CartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Read specific data

    app.get("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cartData = await CartCollection.findOne(query);
      res.send(cartData);
    });

    app.get("/brand/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const user = await FoodismCollection.findOne(query);
      res.send(user);
    });

    app.get("/products/:id", async (req, res) => {
      // const id = req.params.id;
      // const query = { productName: id };
      const id = parseInt(req.params.id);
      const query = { id: id };
      const product = await ProductsCollection.findOne(query);
      res.send(product);
    });

    // POST data
    app.post("/cart", async (req, res) => {
      const cartInfo = req.body;
      const result = await CartCollection.insertOne(cartInfo);
      res.send(result);
    });

    // Delete data
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await CartCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /* app.get("/brands", (req, res) => {
//   res.send(brands);
// });

// app.get("/brand/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = brands.find((data) => data.id === id);
//   res.send(product);
// }); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
