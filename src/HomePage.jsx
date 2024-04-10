import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');

const HomePage = () => {
    
const [firstname, setFirstname] = useState('');


function saveName(){
    const newName = event.target.value;
        setFirstname(newName);
        localStorage.setItem('Name', newName);
}

const NameMessageSend = () => {

  if (firstname.trim() !== '') {
    // Отправка имени на сервер
    socket.emit('firstname', firstname);
  }
}





    return (
        <div className='welcome-block'>
          <h1>Добро пожаловать!</h1>
            <div className='welcome-block-input'>
            <input className='name-input'
        type="text"
        value={firstname}
        onChange={saveName}
        placeholder="Введите ваше имя"
      />
        <Link to='/ChatMatePage'><button onClick={NameMessageSend}>Начать</button></Link>
    
      </div>

      

        </div>
    )
}

export {HomePage}