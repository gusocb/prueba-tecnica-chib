const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    birthday: {
      type:String,
      required:true
    },
    profession: {
      type: String,
      required: false,
      trim: true
    },
    jobDescription: {
      type: String,
      required: false,
      trim: true
    },
    pricePerHour: {
      type: String,
      required: false,
      trim: true
    },
    password: {
      type: String,
      required:true,
      trim:true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User",userSchema);
module.exports = User;