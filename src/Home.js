import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import "./Home.css"
import Login from "./Login"
import Logo from "./Logo"
import App from './App';


class Home extends Component{
    /*
    constructor(props){
        super(props);
    }
    */

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="Home">
                            <header className="Home-header">
                                <Logo />
                                <Login />
                            </header>
                        </div>
                    </Route>
                    <Route path="/search">
                        <App />
                    </Route>
                </Switch>
              </Router>
        )
    }
}

export default Home;