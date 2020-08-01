// const express = require("express");
// const http = require("http");
// const app = express();
// const socketio = require("socket.io");
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));
//
//
// const path = require("path");
// const server = http.createServer(app);
// const io = socketio(server);
// const PORT = 3000 ;
// app.use(express.static(path.join(__dirname, "public")));
// const users = {}
//
// app.get("/", (req,res)=>{
//   res.sendFile(__dirname + "/public/signup.html");
// })
//
//
// app.post("chat.html", (request,respond)=>{
//   respond.sendFile(__dirname +"/public/chat.html");
// })
//
//
//
//
//
// //io.on will listen to all socket.io instances
// //socket.on will listen to a particular instances
// io.on("connection", (socket)=>{
//   socket.on("new-user-joined", (name)=>{
//     console.log("New User", name);
//     users[socket.id] = name;
//     socket.broadcast.emit("user-joined", name);
//
//   });
//
//   socket.on("send", (message)=>{
//     socket.broadcast.emit("recieve", {message: message, name: users[socket.id]})
//
//   });
//
//
// socket.on("disconnect", (message)=>{
//   socket.broadcast.emit("leave", users[socket.id]);
//   delete users[socket.id];
// });
//
//
// });
// server.listen(PORT, ()=>{
//   console.log("Server has just started...");
// })
//




const express = require("express");
const http = require("http");
const app = express();
const socketio = require("socket.io");


const path = require("path");
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
const users = {}


app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/public/signup.html");
})

//io.on will listen to all socket.io instances
//socket.on will listen to a particular instances
io.on("connection", (socket)=>{
  socket.on("new-user-joined", (name)=>{
    console.log("New User", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message)=>{
    socket.broadcast.emit("recieve", {message: message, name: users[socket.id]})
  });


socket.on("disconnect", (message)=>{
  socket.broadcast.emit("leave", users[socket.id]);
  delete users[socket.id];
});


});
server.listen(PORT, ()=>{
  console.log("Server has just started...");
})
