const express = require('express');
const connection = require('./config/db');
const app = express();
require("dotenv").config();
const path = require('path');
const userRouter = require('./routes/userRoutes');
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws');
const authentication = require('./middlewares/authentication');
const server = http.createServer(app);
// const wss = new WebSocket({server});
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
    app.use(express.static(path.join(__dirname, "client")));
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
})
app.use(authentication);

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });
  
    // receive a message from the client
    socket.on("hello from client", (...args) => {
      // ...
    });
  });


server.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at the port ${process.env.port}`)
    } catch (error) {
        console.log("Something went wrong " + error)
    }
})