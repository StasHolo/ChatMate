import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  // Обработка события отправки сообщения
  socket.on('message', (data) => {
    console.log('Получено сообщение:', data);
    // Отправить сообщение другим подключенным клиентам
    io.emit('message', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер WebSocket запущен на порту ${PORT}`);
});