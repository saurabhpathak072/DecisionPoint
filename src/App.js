import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './Container/Main/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
