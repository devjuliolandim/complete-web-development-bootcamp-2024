import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res)=>{
    res.send("<h1>Hello, World!</h1>");
})

app.get("/about", (req,res)=>{
    res.send("<h1>My name is Júlio César</h1>");
})

app.get("/contact", (req,res)=>{
    res.send("<h1>My e-mail is: blabla@gmail.com</h1>");
})


app.listen(port, ()=>{
    console.log(`The server is running in the ${port} port.`);
})