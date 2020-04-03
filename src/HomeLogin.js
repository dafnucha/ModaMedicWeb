import React, {Component} from 'react';
import "./HomeLogin.css"
import Login from "./Login"
import Logo from "./Logo"


class HomeLogin extends Component{

    render(){
        return(
            <div>
                <div className="Home">
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