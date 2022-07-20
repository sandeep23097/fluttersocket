const express = require('express');
const { Server } = require('ws');


const PORT = process.env.PORT || 3000; //port for https

const server = express()
    .use((req, res) => res.send("Hello, you!"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });


wss.on('connection', function(ws, req) {
    ws.on('message', message => { // If there is any message
        var datastring = message.toString();
        if(datastring.charAt(0) == "{"){ // Check if message starts with '{' to check if it's json
            datastring = datastring.replace(/\'/g, '"');
            var data = JSON.parse(datastring)
            if(data.cmd == "newData"){
                // TODO: Create login function
                var loginData = '{"buffer":"'+data.buffer+'","status":"succes"}';
                var binaryData = data.buffer;
                // Send data back to user
               wss.clients.forEach(function each(client) {
   
        client.send(binaryData,{binary: true});
     
    });
            }
            
        }
    }) 
})
