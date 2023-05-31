import express, { urlencoded } from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import cors from "cors"
import router from "./router/Route.js";
import cookieParser from "cookie-parser";
config();

const app = express();

mongoose
    .connect(process.env.connection_mongo)
    .then(res=>{
        app.listen(3000)
        console.warn("app is listing ")
    })
    .catch(err=>{
        console.log(err);
    })

app.use(cookieParser())
app.set("view engin" , "ejs");

app.use(cors());

app.use(express.urlencoded())

app.use(express.static("public"))

app.use(express.json())

app.use(router)