import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');

const HomePage = () => {
    
const [firstname, setFirstname] = useState('');
const [pass, setPass] = useState('');


function saveName(){
    const newName = event.target.value;
        setFirstname(newName);
        localStorage.setItem('Name', newName);
}
function savePass(){
  const newPass = event.target.value;
      setPass(newPass);
      localStorage.setItem('Password', newPass);
}

// const NameMessageSend = () => {

//   if (firstname.trim() !== '') {
//     // Отправка имени на сервер
//     socket.emit('firstname', firstname);
//   }
// }





    return (
        <div className='welcome-block'>
          <h1>Добро пожаловать!</h1>
          <h2> Для регистрации заполните поля</h2>
            <div className='welcome-block-input'>
            <input className='name-input'
              type="text"
              value={firstname}
              onChange={saveName}
              placeholder="Введите имя"
            />
            <input className='name-input'
              type="password"
              value={pass}
              onChange={savePass}
              placeholder="Введите пароль"
            />
        <Link to='/Auth'><button >Авторизоваться</button></Link>
    
      </div>

      

        </div>
    )
}

export {HomePage}