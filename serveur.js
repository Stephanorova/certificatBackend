
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const bodyParser = require('body-parser')
const app = express();
const api = require("./Route/route")

//configuration

  
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Api
 app.use("/api/", api)


//creation de serveur
const port = process.env.PORT || 3000
app.listen(port, onsole.log(`serveur stage sur une port ${port}`));

// conexion 
const url = process.env.connexionDB;
mongoose.connect(url,{})  
.then(()=>{
    console.log('connexion a la base success');
})
.catch((err)=>{
    console.log(err);
})

