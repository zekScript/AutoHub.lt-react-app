import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoutes.js"
import cors from "cors"


const app = express();

app.use(bodyParser.json());
app.use(cors())
dotenv.config();



const PORT = process.env.PORT || 7000;

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
            console.log(`${MONGOURL} DATABASE IS SUCCESFULLY CONNECTED`)
            app.listen(PORT, () => {
                        console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
            });
}).catch((err) => console.log(err))

app.use("/api", route)