import express from "express";

const app = express();
const port = 3000;

const logger = function(req,res,next){
  console.log("Method: " + req.method);
  console.log("Request: "+ req.url);
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
