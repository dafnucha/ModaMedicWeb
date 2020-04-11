import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import App from './App';
import HomeLogin from './HomeLogin';
import AddUser from "./AddUser";


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
                        <HomeLogin />
                    </Route>
                    <Route path="/search">
                        <App />
                    </Route>
                    <Route path="/addUser">
                        <AddUser />
                    </Route>
                </Switch>
              </Router>
        )
    }
}

export default Home;