import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');




const ChatMatePage = () => {
    const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageClass, setMessageClass] = useState('');
  const FirstName = localStorage.getItem('Name');
  const messagesEndRef = useRef(null);

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
      setMessages(prevMessages => [{ text: data, class: newMessageClass },...prevMessages ]);
    });


      
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);


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
      <div className='message'>
        {messages.map((msg, index) => (
          <div key={index} className={msg.class}>{msg.text}</div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className='input-form'>
      <textarea className='message-input'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Введите ваше сообщение..."
      />
      <button onClick={handleMessageSend}>Отправить</button>
      </div>



      <div className='changeName'>
        <Link to='/'><button>Изменить имя</button></Link>
    
      </div>
    </div>

    



  );
}

export {ChatMatePage}