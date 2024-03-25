import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');




const ChatMatePage = () => {
    const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageClass, setMessageClass] = useState('');
  const FirstName = localStorage.getItem('Name');

  useEffect(() => {
    // Обработка события получения нового сообщения
    socket.on('message', (data) => {
      const colonIndex = data.indexOf(':');
      const storedName = localStorage.getItem('Name');
      let newMessageClass = '';
      if (colonIndex !== -1) {
        const receivedName = data.substring(0, colonIndex);
        if (receivedName === storedName) {
          newMessageClass = 'my-message';
        } else {
          newMessageClass = 'other-message';
        }
      }
      setMessages(prevMessages => [...prevMessages, { text: data, class: newMessageClass }]);
    });

    
    return () => {
      socket.off('message');
    };
  }, []);

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      // Отправка сообщения на сервер
      socket.emit('message', FirstName + ':  ' + message);
      setMessage('');
      console.log(FirstName);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  return (
    <div className='message-box'>
      <h1></h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.class}>{msg.text}</div>
        ))}
      </div>
      <input className='message'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введите ваше сообщение..."
      />
      <button onClick={handleMessageSend}>Отправить</button>
    </div>
  );
}

export {ChatMatePage}