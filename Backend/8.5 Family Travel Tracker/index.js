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

async function getCountryCode(country){
  try{
    const result = await db.query("SELECT country_code FROM countries WHERE country_name = $1", [country]);

    const country_code = result.rows[0].country_code;

    return country_code;
  }catch(err){
    console.error("Error finding country code", err.stack);
    throw err;
  }
}

async function postNewCountry(country_code){
  try{
    await db.query("INSERT INTO visited_countries (country_code, user_id) VALUES ($1,$2)", [country_code, currentUserId]);


  }catch(err){
    console.error("Error posting country in the database", err.stack);
    throw err;
  }  
}

async function createNewUser(newUser){
  try{
    await db.query("INSERT INTO users (name, color) VALUES ($1, $2)", [newUser.name, newUser.color]);
  }catch(err){
    console.error("Error occurred while creating a new user", err.stack);
  }

}

//Query all users IIFE
(async () => {
  users = await queryUsers();
  console.log(users);
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
  currentUserId = userID;

  if(isNaN(userID)){
   return res.render("new.ejs");
  }

  try{
    const userIndex = users.findIndex((user)=> user.id === userID);
    const countries = await checkVisisted(userID);
    const color = users[userIndex].color;

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

app.post("/add", async (req, res)=>{
  const reqCountry = req.body.country;
  const country_code = await getCountryCode(reqCountry);

  await postNewCountry(country_code);

  const countries = await checkVisisted(currentUserId);

  const userIndex = users.findIndex((user) => user.id === currentUserId);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: users[userIndex].color
  });
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const newUser = {
    name: req.body.name,
    color: req.body.color
  }

  await createNewUser(newUser);
  users = await queryUsers();

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
