
const app = require ("./app")
const connectDatabase = require("./config/database")
require("dotenv").config({path:".env"})

app.get('/', function(req, res){
  res.send("Hello from the root application URL");
});

app.listen(process.env.PORT, (req,res) => {
    connectDatabase()
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });
