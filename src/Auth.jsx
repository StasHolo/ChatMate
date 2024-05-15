import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate} from 'react-router-dom'
import io from 'socket.io-client';

const socket = io('https://my-websocket-server-stasholo.glitch.me');

const Auth = () => {
    
const [firstname, setFirstname] = useState('');
const [pass, setPass] = useState('');
const [err, setErr] = useState('');
const navigate = useNavigate();



const NameMessageSend = () => {


    if (firstname === localStorage.getItem('Name') && pass === localStorage.getItem('Password')){
        if (firstname.trim() !== '') {
            // Отправка имени на сервер
            socket.emit('firstname', firstname);
          }
          navigate('/ChatMatePage');
    }else{
    setErr('Вы ввели не правльные имя/пароль');
    }
}





    return (
        <div className='welcome-block'>
          <h1>Добро пожаловать!</h1>
            <div className='welcome-block-input'>
            <input className='name-input'
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Введите ваше имя"
            />
            <input className='name-input'
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Введите пароль"
            />
            <div>{err}</div>
            
        <button onClick={NameMessageSend}>Начать</button>
        <Link to='/'><button >Зарегистрироваться</button></Link>
        
      </div>

      

        </div>
    )
}

export {Auth}