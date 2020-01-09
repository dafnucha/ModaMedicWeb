import React from 'react';
import './App.css';
import "./Logo";
import "./Search"

import Logo from './Logo';
import Search from './Search';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <Search />
        <br />
      </header>
      
    </div>
  );
}

export default App;
