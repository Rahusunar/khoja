const express = require("express");
const http = require("http");
const app = express();
const socketio = require("socket.io")
const path = require("path");
const server = http.createServer(app);

const io = socketio(server)
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

io.on("connection",function(socket){
    console.log('connected');
    socket.on("send-location",function (data){
      io.emit("receive-location",{id: socket.id,...data})
    });
    socket.on("disconnect",function(){
      io.emit("user-disconnected",socket.id); 
    })
    
})
 
app.get("/",function(req,res){
  res.render("index")
})

server.listen(3000);