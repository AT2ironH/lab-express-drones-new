const mongoose = require("mongoose");

let DroneSchema = new mongoose.Schema({
  name: String,
  propellers: Number,
  maxSpeed: Number,
});
//create your model here

let DroneModel = mongoose.model(`mydrone`, DroneSchema)

// do not forget to export your model

module.exports = DroneModel;