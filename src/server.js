// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Track sockets
let phoneSocketId = null;
let viewers = new Set();

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("role", (role) => {
    console.log("role set", role, socket.id);
    if (role === "phone") {
      phoneSocketId = socket.id;
    } else if (role === "viewer") {
      viewers.add(socket.id);
    }
  });

  // Phone -> Viewer(s)
  socket.on("offer", (payload) => {
    console.log("Offer from phone -> viewers");
    viewers.forEach((viewerId) => {
      io.to(viewerId).emit("offer", payload);
    });
  });

  // Viewer -> Phone
  socket.on("answer", (payload) => {
    console.log("Answer from viewer -> phone");
    if (phoneSocketId) {
      io.to(phoneSocketId).emit("answer", payload);
    }
  });

  // ICE candidates both ways
  socket.on("ice-candidate", (data) => {
    if (data.target === "phone" && phoneSocketId) {
      io.to(phoneSocketId).emit("ice-candidate", data.candidate);
    } else if (data.target === "viewer") {
      viewers.forEach((viewerId) => {
        io.to(viewerId).emit("ice-candidate", data.candidate);
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    if (socket.id === phoneSocketId) phoneSocketId = null;
    viewers.delete(socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Signaling server running on :${PORT}`));
