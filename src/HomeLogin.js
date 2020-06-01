import React, {Component} from 'react';
import "./HomeLogin.css"
import Login from "./Login"
import Logo from "./Logo"
import {
    Redirect
} from "react-router-dom";


class HomeLogin extends Component{

    render(){
        var path = window.location.pathname;
        if(path.includes("search")){
            window.location.pathname = path.replace("search", "");
        }
        return(
            <div>
                <div className="Home">
                    {sessionStorage.getItem("doctor") === "true" ?  <Redirect from={path} to="/search" /> : null  }
                    <header className="Home-header">
                        <Logo />
                        <Login />
                    </header>
                </div>
              </div>
        )
    }
}

export default HomeLogin;