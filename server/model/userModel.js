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
})


export default mongoose.model("Users", userScema)