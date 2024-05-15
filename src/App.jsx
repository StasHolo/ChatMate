import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';
import { ChatMatePage } from './ChatMatePage';
import { HomePage } from './HomePage';
import { Auth } from './Auth';



function App() {
  

    
    return (
      <>
      <div>
      
      </div>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ChatMatePage' element={<ChatMatePage />} />
          <Route path='/Auth' element={<Auth />} />
          
        </Routes></>
    );
}
export default App;
