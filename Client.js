const axios = require('axios');
const { errorMonitor } = require('ws');
const serverPort = 3000; 

async function loginToServer(data) {
    try{
    console.log('http://localhost:'+serverPort+'/login');
    console.log(data);
    const response = await axios.post('http://localhost:'+serverPort+'/login', data)
    console.log("odpowidź od serwera: ");
    console.log(response.data.message);
    }catch(e){
        console.log(e);
    }
}
async function sendDataToServer(data) {
    try{
        console.log('http://localhost:'+serverPort+'/createAcount');
        // const response = "";
        const response = await axios.post('http://localhost:'+serverPort+'/login',data);
    }catch(error){
        console.error("Błąd podczas wysyłania danych: "+ error );
    }
}
async function sendDataToCreateUser(data) {
    try{
        console.log('http://localhost:'+serverPort+'/createAcount');
        const response = await axios.post('http://localhost:'+serverPort+'/createAcount',data);
        // console.log(response);
    }catch(error){
        console.error("Błąd podczas wysyłania danych: "+ error );
    }
}

clientDataToSave = {
    "ID": "1",
    "conectionID" : 1,
    "data": {
        "id": "1",
        "name" : "aaaa",
        "player1" : "bbb",
        "player2" : "ccc",
        "moves" : ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
        "player1Time" : 10,
        "player2Time" : 11,        
    }
}
data = {

    "id": "1",
    "name" : "aaaa",
    "player1" : "bbb",
    "player2" : "ccc",
    "moves" : ["a1", "a2", "a3", "a4", "a5", "a6", "a7"],
    "player1Time" : 10,
    "player2Time" : 11,
}
loginData = {
    name : "Name5",
    login : "Login5",
    password : "1234",   
}
createUserData = {
    name : "Name5",
    login : "Login5",
    password : "1234",
}

// console.log("Kod zwraca error 404 z powodu że hasła nie są hashowane kiedy funkcja bctypt tego wymaga!!!");
async function Start(){ 
    await sendDataToCreateUser(createUserData)
    await loginToServer(loginData);
}
Start().catch(console.error);
// sendDataToServer(clientDataToSave);
// sendDataToServer(clientDataToSave);
