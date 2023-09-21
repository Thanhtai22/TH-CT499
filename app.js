const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

const contactsRouter = require("./app/routes/contact.route");

app.get("/",(req,res)=>{
    res.json({ messsage: " well com...."});
})

app.use("/api/contacts",contactsRouter)

module.exports = app;
