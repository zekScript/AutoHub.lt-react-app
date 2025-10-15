import mongoose from "mongoose";

const userScema = new mongoose.Schema({
            name:{
                        type: String,
                        required: true,
            },
            email:{
                        type: String,
                        required: true,
            },
            password:{
                  type: String,
                  required: true,
            },
            role:{
                  type: String,
                  required: true,
                  default: "USER"
            },
            ticketCount:{
                  type: Number,
                  default: 0
            },
            date: { 
                  type: Date,
                  default: Date.now
            },
})
// Message schema
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

// Ticket schema
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
status: { type: String, enum: ['open', 'in review', 'closed'], default: 'open' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now },
      messages: [messageSchema]

});

// Post schema

const postSchema = new mongoose.Schema({
      description: { type: String, required: true },
      carName: { type: String, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      createdAt: { type: Date, default: Date.now },
      price: { type: Number, required: true },
      mileage: { type: Number, required: true },
      fuelType: { type: String },
      imageUrl: [{ type: String }], 
      model: {type: String},
      carType: {type: String},
      engineLiter: {type: String},

      wishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
      body: { type: String },
      gearbox: { type: String },
      defects: { type: String },
      power: { type: String },
      wishCount: { type: Number, default: 0 },
      firstRegistration: { type: Date},
      wheelPosition: { type: String },
      color: { type: String },
      condition: { type: String },
      enginePower: { type: Number },
      country: { type: String },
      city: { type: String },
      contactNumber: { type: String },
      transmission: {type: String},
      views: { type: Number, default: 0 },
});

export const User =  mongoose.model("Users", userScema)
export const Ticket = mongoose.model("Ticket", ticketSchema);
export const Post = mongoose.model("Post", postSchema);