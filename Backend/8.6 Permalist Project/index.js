import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123456",
  port: 5432
});

db.connect();

let items = [];

//GET ALL ITEMS FROM DB
async function getItems(){
  try{
    const response = await db.query("SELECT * FROM items");

    items = response.rows;
  }catch(err){
    console.error('Error to get items from DB', err);
    throw err;
  }
}
app.get("/", async (req, res) => {
  await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});
app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  
  if(!item) return res.status(400).send("Item is required")
  
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  }catch(err){
    console.error("Error to insert into DB", err);
    res.status(500).send("Internal Server Error");
  }

});
app.post("/edit", async (req, res) => {
  const id = req.body.updatedItemId;
  const title = req.body.updatedItemTitle;

  if(!title) return res.status(400).send("Title is needed");

  try{
    await db.query("UPDATE items SET TITLE = $1 WHERE id = $2", [title, id]);
    res.redirect("/");
  }catch(err){
    console.error("An error ocurred", err);
    res.status(500).send("Error updating item!");
  }
});
app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try{
    const result = await db.query("DELETE FROM items WHERE id = $1", [id]);
    if(result.rowCount === 0){
      return res.status(404).send("Item not found");
    }
    res.redirect("/");
  }catch(err){
    console.error("Failed to delete item");
    res.status(500).redirect("/");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
