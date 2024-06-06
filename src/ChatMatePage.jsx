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
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Обработка события получения нового сообщения
    socket.on('message', (data) => {
      const colonIndex = data.indexOf(':');
      const storedName = localStorage.getItem('Name');
      let newMessageClass = '';
      let now = new Date();
      if (colonIndex !== -1) {
        const receivedName = data.substring(0, colonIndex);
        if (receivedName === storedName) {
          newMessageClass = 'my-message';
        } else {
          newMessageClass = 'other-message';
        }
      }
      const messageWithTime = {
        text: data,
        date: now.toLocaleString(),
      };
      setMessages(prevMessages => [{text: messageWithTime.text, date: messageWithTime.date, class: newMessageClass},...prevMessages ]);
    });

      
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
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


  useEffect(() => {
    socket.on('usersUpdated', (users) => {
      const usernames = users.map(user => user.username);
      setUserList(usernames);
      console.log('Useri: ',usernames)
      });
  }, []);
  

  return (

    <div>

      <div className='users-block'>
        <h1>Пользователи в чате:</h1>
        <ul>
        
          {userList.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>

        

      </div>
      
      <div className='message-box'>
        
        <h1></h1>
        <div className='message'>
        <div ref={messagesEndRef}></div>
          {messages.map((msg, index) => (
            <div key={index} className={msg.class}>
              <div className='message-text'>{msg.text}</div>
              <div className='message-time'>{msg.date}</div>
            </div>
          ))}
          

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
    </div>
    
  );
}

export {ChatMatePage}