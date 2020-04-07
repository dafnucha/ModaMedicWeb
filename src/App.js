import React, {Component} from 'react';
import {
  Redirect
} from "react-router-dom";
import './App.css';
import "./Logo";
import "./Search";

import Logo from './Logo';
import Search from './Search';


class App extends Component{
    constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("name");
    window.location.reload(false);
  }

  render(){
    return (
      <div>
        <div id="labels">
          <label id="logout" onClick={() => this.logout()}>התנתק</label>
          <label id="helo">שלום ד"ר {sessionStorage.getItem("name")}</label>
        </div>
        <div className="App">
          <header className="App-header">
            <Logo />
            <Search />
            <br />
            {sessionStorage.getItem("doctor") !== "true" ?  <Redirect to="/" /> : null  }
          </header>
        </div>
      </div>
    )
  }
}

export default App;
