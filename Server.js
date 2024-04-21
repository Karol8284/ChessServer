const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const http = require('http');
// const { validate } = require('webpack');
const mongodbPort  = 'localhost:5432';
const ServerPort = 3000;
const app = express();

const {Client} = require('pg');
require('dotenv').config();
async function ClientConnectToDataBase(host,port,user,password,database, query){
    const client = new Client({
    host : host,
    port : port,
    user : user,
    password : password,
    database : database,
    SSL : true,
    });
    return client;
    // await client.end();
}


app.use(bodyParser.json()); 
app.use(express.json());


// client.db("Users"); 

// Server client 
// Włączenie serwera
app.listen(ServerPort, () =>{
    console.log("Włączenie serweru.");
    console.log("Nasłuchiwanie");
});

app.post('/login', async (req, res) =>{
    try{

        const {name,login, password} = req.body;
        // console.log(name);
        // console.log(login);
        // console.log(password);

        let client = await ClientConnectToDataBase('localhost','5432', 'postgres','Mk127398','Chess','');
        await client.connect();
        console.log("Select password from users where login = '"+ login+"';");
        let dbResult = await client.query("Select password from users where login = '"+ login+"'"    );
        await client.end();
        // console.log(res);
        if (dbResult.rows.length > 0) {
            const passwordFromDataBase = await dbResult.rows[0].password;
            console.log(passwordFromDataBase);
            isMatch = await bcrypt.compare(password, passwordFromDataBase);
            console.log(await isMatch);
            if(await isMatch){
                console.log('You have login corectly');
                res.json({message : 'User login'});
            }else{
                console.log('Wrong login or password');
                res.status(404).json({message : 'User not found'});
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).json({message : 'Internal server error'});
    }
});
app.post('/createAcount',async (req, res) =>{
    try{
        let client = await ClientConnectToDataBase('localhost','5432', 'postgres','Mk127398','Chess','');;
        await client.connect();
        console.log("req: ");
        console.log(req.body);
        console.log("Insert into users (name,login,password) values ('"+req.body.name+"','"+req.body.login+"','"+ await bcrypt.hash(req.body.password,10)+"');");

        // console.log("aaaaa"+ await bcrypt.hash(req.body.password,10));

        // Insert to database
        let dbResult = await client.query("Insert into users (name,login,password) values ('"+req.body.name+"','"+req.body.login+"','"+ await bcrypt.hash(req.body.password,10)+"');");
        console.log(dbResult);
        
        if(dbResult.rowCount > 0){
            console.log('You have been created acount corectly.');
            res.json({message : 'You have been created acount corectly.'});
        }else{
            console.log('Error in creating acount!'); 
            res.status(404).json({message : 'User not found'});
        }
    }catch(e){
        console.log(e);
        res = res.status(500).json({message : 'Internal server error'});
    }
});

// End point który pobiera dane z portu POST do serewra 
app.post('/server', 
body("ID").isNumeric(),
body("conectionID").isNumeric(),
async (req, res) => {
    const error =  validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }
// Zapis danych do bazy
    console.log(req.body);
    const newData = new dataFormUser(req.body);
    const result = await newData.save();
    res.json(result);
});

// app.post('/createAcount', 
// body("ID").isNumeric(),
// body("conectionID").isNumeric(),
// async (req, res) => {
//     const error =  validationResult(req);
//     if(!error.isEmpty()){
//         return res.status(400).json({error : error.array()});
//     }else{
//         return mongodbCreateUser(,req.name,res.login,req.password);
//     }
// // Zapis danych do bazy
// });
// // wysyłanie danych do klienta GET
// app.get('/server', async (req, res) => {
//     const data = new dataFormUser.find();
//     res.json(data);
// });
// async function mongodbCreateUser(client, name,login, password) {
//     try{

//         const db = client.db("Chess")
//         const collection = db.collection('Users');

//         // Instert user to mongoDB

//         const insert = {name: name, login: login, password: password}
//         const result = await collection.insert(insert);
//     }catch(e){
//         console.log(e);
//     }
// }
function mongodbConect() {
    
}
function mongodbSetData(){

}
// mongoose.connect('mongodb://localhost:27017/Chess',{
//     useNewUrlParser: true, useUnifiedTopology: true
// });    
// const server = http.createServer(function (req, res) {

//   })