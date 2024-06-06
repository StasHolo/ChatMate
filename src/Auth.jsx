import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate} from 'react-router-dom'
import io from 'socket.io-client';
import { useAuth0 } from '@auth0/auth0-react';

const socket = io('https://my-websocket-server-stasholo.glitch.me');

const Auth = () => {
    
const navigate = useNavigate();



const NameMessageSend = () => {


    
        if (user.name.trim() !== '') {
            // Отправка имени на сервер
            socket.emit('firstname', user.name);
          }
          localStorage.setItem('Name', user.name);
          navigate('/ChatMatePage');
    
}


const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();


//const {name, picture, email} = user;
//console.log()

useEffect(() => {
  console.log("isAuthenticated:", isAuthenticated);
  if (user) {
    console.log("User:", user);
  }
}, [isAuthenticated, user]);
    

    return (
        <div className='welcome-block'>
          <h1>Добро пожаловать!</h1>

          {!isAuthenticated ? (
        <div>
          <h2>Login</h2>
          <button onClick={() => loginWithRedirect()}>Sign in</button>
        </div>
      ) : (
        <div>
          <p>Вы вошли как: {user ? user.name : 'Loading...'}</p>
          <button onClick={NameMessageSend}>Начать</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      )}

            

      

        </div>
    )
}

export {Auth};