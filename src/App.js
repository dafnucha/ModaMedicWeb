import React from 'react';
import './App.css';
import "./Logo";
import "./Search"
import "./DisplayButton"
import Logo from './Logo';
import Search from './Search';
import DisplayButton from './DisplayButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <Search />
        <br />
        <DisplayButton />
        
      </header>
    </div>
  );
}

export default App;
