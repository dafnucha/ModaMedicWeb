import React, {Component} from 'react';
import {
    Redirect
} from "react-router-dom";
import './Login.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            ID: '',
            password: '',
            wrong: false
        };

        this.change = this.change.bind(this);
        this.sumbit = this.sumbit.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sumbit(e){
        e.preventDefault();
        axios.post('http://icc.ise.bgu.ac.il/njsw03users/login', {
            UserID: this.state.ID,
            Password: this.state.password
        }).then(res => {
            if(res.data.data != null){
                sessionStorage.setItem("token", res.data.data.token);
                sessionStorage.setItem("name", res.data.data.name);
                sessionStorage.setItem("type", res.data.data.type);
                window.location.reload(false);
            }
            else{
                this.setState({wrong: true})
            }
            console.log(sessionStorage.getItem("token"))
        });

    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.sumbit(e)}>
                    <label>תעודת זהות:</label>
                    <input type="text" name="ID" onChange={e => this.change(e)} value={this.state.ID} required/>
                    <label>סיסמה:</label>
                    <input type="password" name="password" onChange={e => this.change(e)} value={this.state.password} required/>
                    {this.state.wrong ? <label id="wrong">תעודת זהות או סיסמה לא נכונים</label> :  <label></label> }
                    <button type="submit">התחבר</button>
                    <label>שכחת סיסמה?</label>
                    {sessionStorage.getItem("type")==="doctor" ?  <Redirect to="/search" /> : null  }
                </form>
            </div>
        )
    }
}

export default Login;