const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Product = require("./models/productModel");
const port = process.env.PORT || 3000;
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  data = req.body;
  res.status(200).send(data);
});


const errorFunction = (err) => {
  console.log(err.message);
  res.status(500).send(err.message);
}

// For getting all products
app.get("/productslist", async (req, res) => {
  try{
    const products = await Product.find({});
    res.status(200).json(products);
  }
  catch(err){
    errorFunction(err);
  }
});

// For deleting a product
app.delete("/products/:id", async (req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      res.status(404).json({
        status: "fail",
      })
    }
    res.status(200).json({
      status : "success"
    });
  }
  catch(err){
    errorFunction(err);
  }
});


// For retreiving a single product
app.get("/productslist/:id", async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    if(!product){
      res.status(404).send("Product not found");
    }
    res.status(200).json(product);
  }
  catch(err){
    errorFunction(err);
  }
})


// For updating an existing product
app.put("/products/:id", async (req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id , req.body);
    if(!product){
      res.status(404).json({
        status: "fail",
      })
    }
    res.status(200).json({
      status : "success"
    });
  }
  catch(err){
    errorFunction(err);
  }
})


//  For Adding a new product
app.post("/products", async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  }
  catch(err){
    errorFunction(err);
  }
});

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDb',err.message);
  });
