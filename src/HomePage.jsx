import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'


const HomePage = () => {
    
const [firstname, setFirstname] = useState('');

function saveName(){
    const newName = event.target.value;
        setFirstname(newName);
        localStorage.setItem('Name', newName);
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
        <Link to='/ChatMatePage'><button>Начать</button></Link>
    
      </div>

        </div>
    )
}

export {HomePage}