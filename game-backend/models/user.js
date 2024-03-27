const mongoose = require("mongoose");

const { Schema } = mongoose;

const reqString = { type: String, required: true, unique: true };
const reqNumber = { type: Number, default: 0 };

const UserSchema = new Schema({
  username: reqString,
  matchesWon: reqNumber,
});

module.exports = mongoose.model("User", UserSchema, "users"); ///  mongodb schema define
