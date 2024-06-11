import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

//Async Functions
async function checkVisisted(userID) {
  try{
    const result = await db.query("SELECT country_code FROM visited_countries WHERE user_id = $1", [userID]);
    
    const countries = result.rows.map((country)=> country.country_code);

    return countries;
  }catch(err){
    console.error("Error querying visited countries: ", err);
    throw err;
  }
}

async function queryUsers(){
  try{
    const result = await db.query("SELECT * FROM users");

    const users = result.rows.map((user)=>({
      id: user.id,
      name: user.name,
      color: user.color
    }));

    return users;
  }catch(err){
    console.error("Error querying users: ", err);
    throw err;
  }
}

//Query all users
(async () => {
  users = await queryUsers();
  console.log('Initial users loaded:', users); // Log dos usuários carregados inicialmente
})();

//App Methods
app.get("/", async (req, res) => {
  const countries = await checkVisisted(users[0].id);
  
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[0].color,
  });
});

app.post("/user", async (req, res) => {
  const userID = Number(req.body.user);
  console.log("User ID: " + userID);


  if(isNaN(userID)){
    return res.status(404).send("The ID is not a number")
  }

  try{

    const userIndex = users.findIndex((user)=> user.id === userID);
    console.log("User index: " + userIndex);

    const countries = await checkVisisted(userID);
    console.log("Countries: " + countries);

    const color = users[userIndex].color;
    console.log("Color: " + color  + "\n");

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: color
    });

  }catch(err){
    console.error("An error has occurred", err.stack);
    throw err;
  }


});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
