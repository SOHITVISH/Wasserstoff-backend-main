// const mongoose= require("mongoose");
// require("dotenv").config();

//  const DB = 
// module.exports=()=>{
//     return mongoose.connect(DB)
// }
 
// const mongoose= require("mongoose");
require("dotenv").config()
const { MongoClient } = require("mongodb");
// module.exports=()=>{
//     return mongoose.connect("mongodb+srv://singhgrazewal2:Grazewal@cluster0.fglisnc.mongodb.net/virtualeX_Backend")
// }
async function run() {
 
    let connectionString = process.env.DB
        
    const client = new MongoClient(connectionString);
    let db = client.db('wasserstoff');

    // console.log(await db.collection('products').find().toArray(),"data")

  return db
 }
module.exports=run
// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://singhgrazewal2:Grazewal@cluster0.fglisnc.mongodb.net/virtualeX_Backend";
// let database
// const client = new MongoClient(uri);

// async function run() {
//   try {
//       database = client.db('virtualeX_Backend');
   
    
 
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// module.exports=run

// const { MongoClient } = require('mongodb');

// // Replace these variables with your MongoDB connection string and database name
// const uri = 'mongodb+srv://singhgrazewal2:Grazewal@cluster0.fglisnc.mongodb.net/virtualeX_Backend'; // MongoDB connection string
// const dbName = 'virtualeX_Backend'; // Name of your MongoDB database

// let client = null;

// async function connectToDatabase() {
//   if (client === null) {
//     client = new MongoClient(uri);

//     try {
//       // Connect to the MongoDB server
//       await client.connect();
//       console.log('Connected to MongoDB');
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//       throw error;
//     }
//   }

//   return client.db(dbName);
// }

// function disconnect() {
//   if (client !== null) {
//     client.close();
//     console.log('Connection closed');
//   }
// }

// module.exports = {
//   connectToDatabase,
//   disconnect,
// };
