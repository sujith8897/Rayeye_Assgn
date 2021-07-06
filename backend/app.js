const express = require('express');
const app = express();
const client = require('./database');

app.use(express.json());

//CORS(cross origin req security) code to terminate req from local:4200 and to only take local:3000
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested_With, Content-Type, Accept");
    next();
});

client.connect()
.then(() => console.log("Database connected successfully"));

app.get("/", (req,res) =>{
    client.query("SELECT date,count(*) FROM calendar.dates GROUP BY date ORDER BY date ASC;")
        .then(results => { console.log(results.rows);res.send(results.rows)})
        .catch(e => console.log(e));
});




app.listen(3000, ()=>{
    console.log("server connected on port 3000");
});