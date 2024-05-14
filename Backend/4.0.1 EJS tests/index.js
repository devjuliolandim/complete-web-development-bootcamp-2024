import express from "express";
import ejs from "ejs";

const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    const dayType = new Date().getDay();

    const isWeekend = dayType === 0 || dayType=== 6;

    res.render("index.ejs", {weekDay: "It's a weekday! Time to work hard!!", weekEnd: "It's a weekend! Time to rest!!!", isWeekend});
})

app.listen(port, ()=>{
    console.log(`The server is running in the ${port} port.`);
})