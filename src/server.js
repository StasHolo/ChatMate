// server.js
import { createServer } from 'http';
import { Server } from 'socket.io';


const users = {};
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
  console.log('Пользователь подключился');
  users[socket.id]
  socket.on('firstname', (firstname) => {
    users[socket.id] = {
      username: firstname
    }
    console.log('user: ', users[socket.id].username)
    console.log(users)
    io.emit('usersUpdated', Object.values(users));
    
  })
  // Обработка события отправки сообщения
  socket.on('message', (data) => {
    console.log('Получено сообщение:', data);
    // Отправить сообщение другим подключенным клиентам
    io.emit('message', data);
  });
  
  
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    
    
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Удаляем информацию о пользователе при отключении
    delete users[socket.id];
    io.emit('usersUpdated', Object.values(users));
  });
    
  
  
  
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер WebSocket запущен на порту ${PORT}`);
});