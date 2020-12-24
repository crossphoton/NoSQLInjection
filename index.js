//Basic setup
const express = require("express");
const app = express();
const mongo = require("mongodb");
var database;
app.use(express.json());
app.listen(3000);

//Mongo Setup
mongo.connect("mongodb://127.0.0.1:27017/test", {useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
    if(err) throw err;
    database = db.db("test");

    console.log("Database is working");

    //Checking if test user is available or not.
    database.collection("Users").findOne({username: 'test'}, (err, doc)=>{
        if(err) console.error(err);
        if(doc) return;


        //Creating fake users for testing purposes
        const user = {username: "test", password: "password"};
        database.collection("Users").insertOne(user, (err, res)=>{
            if(err){
                console.error("Could not create user for testing purpose. Stopping the application.");
                throw err;
            }
            console.log("User for testing created successfully. Use the credentials below.")
            console.log(user);
        });
    });
});


//Making a login endpoint
app.get("/login", (req, res)=>{
    //Getting data from request body
    const {username, password} = req.body;
    
    //Querying the database
    database.collection("Users").findOne({username: username, password: password}, {$projection: {_id:0}}, (err, doc)=>{
        if(err){
            console.error(err);
            res.json({error: err.message});
        }
        else res.json(doc);
    });

});