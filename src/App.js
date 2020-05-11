import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import "./Logo";
import "./Search";

import Logo from './Logo';
import Search from './Search';


class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        showPopup: false,
        pass: "",
        pass2: "",
        diff: false
    };
      this.logout = this.logout.bind(this);
      this.change = this.change.bind(this);
      this.togglePopup = this.togglePopup.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  async handleSubmit(event){
    event.preventDefault();
    if(this.state.pass !== this.state.pass2){
      this.setState({
        diff: true
      });
    }
    else{
      let url = 'http://icc.ise.bgu.ac.il/njsw03auth/usersAll/askChangePassword';
      var token;
      const response = await axios.post(
        url,
        {},
        { 
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': sessionStorage.getItem("token")
            } 
        }
      );
      token = response.data.data;
      url = 'http://icc.ise.bgu.ac.il/njsw03users/passwordChangeCheck/changePassword';
      const responsec = await axios.post(
        url,
        {
          "NewPassword":this.state.pass
        }, 
        { 
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        }
      );
      if(responsec.data.message){
        window.alert("הסיסמא שונתה בהצלחה");
        this.togglePopup();
      }
    }

  }

  handleChange(event) {
    const {name, value, type, checked} = event.target
    type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
  }

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("doctor");
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("name");
    localStorage.removeItem("doctor");
    window.location.reload(false);
  }

  change(){
    this.togglePopup();
  }

  render(){
    require("./App.css");
    return (
      <div>
        <div id="labels">
          <label id="logout" onClick={() => this.logout()}>התנתק</label>
          <label id="sep" onClick={() => this.change()}> |</label>
          <label id="change" onClick={() => this.change()}>שנה סיסמא</label>
          <label id="hello">שלום ד"ר {sessionStorage.getItem("name")} </label>
          
        </div>
        <div className="App">
          <header className="App-header">
            <Logo />
            <Search />
            <br />
            {sessionStorage.getItem("doctor") !== "true"?  <Redirect to="/" /> : null  }
          </header>
        </div>
        {this.state.showPopup ? 
          <Popup
              change={this.handleChange.bind(this)}
              closePopup={this.togglePopup.bind(this)}
              handleSubmit={this.handleSubmit.bind(this)}
              diff={this.state.diff}
          /> : null
        }
      </div>
    )
  }
}

export default App;

class Popup extends React.Component {
  
  render() {
    require("./App.css");
    return (
      <div className='popup'>
          <div className='popup_inner' >
              <button onClick={this.props.closePopup} id="x">x</button>
              <h3 id="h3">החלפת סיסמא</h3>
              <form onSubmit={this.props.handleSubmit}>
                <label  id="lpass">
                    סיסמא חדשה:
                </label>
                <input type="password" name="pass" id="pass" onChange={this.props.change} required/>
                
                <label id="lpass2">
                    הקלד את הסיסמא מחדש:
                </label>
                <input type="password" name="pass2" id="pass2" onChange={this.props.change} required/>
                
                {this.props.diff ? <label>הסיסמאות שונות</label> : null}
                <input type="submit" value="שלח" id="send"/>
              </form>
          </div>
      </div>
    );
  }
}
