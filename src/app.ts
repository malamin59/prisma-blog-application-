import express, { Application } from "express";

const  app : Application = express();

app.get('/' , (req, res) =>{
    res.send("THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG")
})

export default app 
