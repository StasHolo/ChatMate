import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';
import { ChatMatePage } from './ChatMatePage';
import { HomePage } from './HomePage';



function App() {
  

    
    return (
      <>
      <div>
      
      </div>
      <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ChatMatePage' element={<ChatMatePage />} />
          
        </Routes></>
    );
}
export default App;
