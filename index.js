require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const SocketIO=require('socket.io');

let port=process.env.PORT_APLICATION || 4000;

app.set('port',port);

const server=app.listen(port,()=>{
    console.log('Servidor en puerto', port);
});
 
const io=SocketIO(server);

io.on('connection',(socket)=>{
    console.log("Nueva conexion", socket.id);
    //Emite mensaje
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
        console.log(data.userName+": "+data.message);
    });

    //emite que esta escribiendo
    socket.on('chat:typing',(data)=>{
        //emite a todos excepto a mi interfaz 
        socket.broadcast.emit('chat:typing',data); 
        console.log(data+" esta escribiendo...");
    })

});
