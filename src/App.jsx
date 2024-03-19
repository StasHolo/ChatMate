import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Подставьте адрес вашего сервера WebSocket

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Обработка события получения нового сообщения
    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    // Очистка слушателя при размонтировании компонента
    return () => {
      socket.off('message');
    };
  }, []);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      // Отправка сообщения на сервер
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Приветствуем в чате!</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите ваше сообщение..."
      />
      <button onClick={handleMessageSend}>Отправить</button>
    </div>
  );
}

export default App;
