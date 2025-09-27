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
// Ticket schema
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "open" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now }
});



export const User =  mongoose.model("Users", userScema)
export const Ticket = mongoose.model("Tickets", ticketSchema);