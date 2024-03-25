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
        <div>
            <div>
            <input className='message'
        type="text"
        value={firstname}
        onChange={saveName}
        placeholder="Введите ваше имя"
      />
        <Link to='/ChatMatePage'><button>Начать</button></Link>
        Hello
      </div>
            <h1> This is Home page. Concratulation! </h1>
        </div>
    )
}

export {HomePage}