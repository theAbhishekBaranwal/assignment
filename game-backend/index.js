const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const connectDb = require("./config/mongoose");
const bodyParser=require('body-parser');
const app = express();
const PORT = process.env.PORT;


connectDb();

app.use(bodyParser.json()); 
app.use(cors());

app.use("/api/users", userRouter);

app.all("*", (req, res) => {
  
   res.status(404).send("404 NOT FOUND");
   
});


app.listen(PORT, () => {
  console.log(`Exploding kitten API Server is running on ${PORT}`);
});
