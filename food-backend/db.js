const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.URI;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB");
    const fetch_data = await mongoose.connection.db.collection("sample");
    const data = await fetch_data.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("category")
    const filterCategory = await foodCategory.find({}).toArray();
    
    global.sample = data; 
    global.foodCategory = filterCategory;
  } catch (e) {
    console.error("Error: ", e);
  }
};

module.exports = mongoDB;
