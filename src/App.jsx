import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import io from 'socket.io-client';
import { Auth0ProviderWithNavigate } from './Auth0';
import { ChatMatePage } from './ChatMatePage';
import { HomePage } from './HomePage';
import { Auth } from './Auth';


function App() {
  

    
    return (
      <>
       <Auth0ProviderWithNavigate>  
      
      <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/ChatMatePage' element={<ChatMatePage />} />
          <Route path='/Auth' element={<Auth />} />
          
        </Routes>
        </Auth0ProviderWithNavigate></>
    );
}
export default App;
