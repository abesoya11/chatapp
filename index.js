const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let user = {};

app.post("/chat", (req, res) => {
  console.log("name is " + req.body.name);
  user.name = req.body.name;
  user.room = req.body.room;
  res.sendFile(__dirname + "/public/chat.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log("user id " + socket.id);
  socket.join(user.room);
  console.log("user room is " + user.room);
  socket.emit("welcome", user);
  // io.to(user.room).emit("intimate", user);
  socket.to(user.room).emit("intimate", user);

  socket.on("chat message", (data) => {
    socket.to(data.room).emit("chat display", data);
  });
});

server.listen(3000);
