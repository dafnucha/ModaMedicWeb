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
            wrong: false,
            showPopup: false,
            name: ""
        };

        this.change = this.change.bind(this);
        this.sumbit = this.sumbit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    sumbit(e){
        e.preventDefault();
        axios.post('http://icc.ise.bgu.ac.il/njsw03users/login', {
            UserID: this.state.ID,
            Password: this.state.password
        }).then(res => {
            if(res.data.data.type[0] === "patient"){
                this.setState({name: res.data.data.name,
                    ID: "",
                    password: ""
                });
                this.togglePopup();
            }
            else if(res.data.data == null){
                this.setState({wrong: true})
            }
            else{
                sessionStorage.setItem("token", res.data.data.token);
                sessionStorage.setItem("name", res.data.data.name);
                sessionStorage.setItem("type", res.data.data.type);
                window.location.reload(false);
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
                {this.state.showPopup ? 
                    <Popup
                        text={this.state.name}
                        closePopup={this.togglePopup.bind(this)}
                    /> : null
                }
            </div>
        )
    }
}

export default Login;

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_inner'>
                <h3>שלום {this.props.text},</h3>
                <p>נראה כי אין לך את ההרשאות המתאימות על מנת להיכנס לאתר</p>
                <button onClick={this.props.closePopup}>close me</button>
            </div>
        </div>
      );
    }
  }