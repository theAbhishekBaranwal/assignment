const mongoose = require("mongoose");
let URL =process.env.MONGO_URL
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("ERROR IN CONNECTING WITH DATABASE", error);
    process.exit(); 
  }
};

module.exports = connectDb;