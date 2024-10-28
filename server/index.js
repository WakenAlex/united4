const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Schimbă cu URL-ul site-ului tău
    methods: ["GET", "POST"]
  }
});

// Stocăm conversațiile în memorie
const conversations = new Map();

io.on('connection', (socket) => {
  console.log('Un client s-a conectat');

  let clientId = socket.handshake.auth.clientId;
  if (!clientId) {
    clientId = Math.random().toString(36).substr(2, 9);
    socket.emit('client_id', clientId);
  }

  socket.join(clientId);

  if (!conversations.has(clientId)) {
    conversations.set(clientId, []);
  }

  socket.emit('message_history', conversations.get(clientId));

  socket.on('message', (message) => {
    const conversation = conversations.get(clientId);
    conversation.push(message);
    
    io.to(clientId).emit('message', message);
    io.to('admin').emit('message', { ...message, clientId });
  });

  socket.on('admin_message', (message) => {
    const { clientId, content } = message;
    const adminMessage = {
      content,
      timestamp: new Date(),
      isAdmin: true
    };
    
    const conversation = conversations.get(clientId);
    if (conversation) {
      conversation.push(adminMessage);
      io.to(clientId).emit('message', adminMessage);
    }
  });

  socket.on('disconnect', () => {
    console.log('Un client s-a deconectat');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
