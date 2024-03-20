import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Обработка события получения нового сообщения
    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    
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
    <div className='message-box'>
      <h1></h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input className='message'
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
