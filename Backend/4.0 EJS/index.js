import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res)=>{
    const dayOfTheWeek = new Date().getDay();
    const isWeekend = dayOfTheWeek === 0 || dayOfTheWeek === 6;

    res.render(__dirname + "/views/index.ejs", {isWeekend});
})

app.listen(port, ()=>{
    console.log(`The server is running in the port ${port}`);
})