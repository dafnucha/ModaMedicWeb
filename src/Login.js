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
            name: "",
            doctor: false,
            showID: false,
            showWrongUser: false,
            showQ: false,
            showChange: false,
            id: "",
            question: "",
            answer: "",
            date: "",
            wrongA: false,
            diff: false,
            token: "",
            pass: "",
            pass2: ""
        };

        this.change = this.change.bind(this);
        this.sumbit = this.sumbit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.forget = this.forget.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handle = this.handle.bind(this);
        this.changePass = this.changePass.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup,
          wrongA: false,
          diff: false
        });
    }

    forget(e){
        e.preventDefault();
        this.setState({
            showID: true,
            showWrongUser: false,
            showQ: false,
            showChange: false,
        })
        this.togglePopup();
    }

    async handleSubmit(e){
        e.preventDefault();
        let url = 'http://icc.ise.bgu.ac.il/njsw03users/forgotPassword';
        const response = await axios.post(
            url,
            {
                UserID: this.state.id
            }
        );
        var qID = response.data.data;
        const response1 = await axios.get("http://icc.ise.bgu.ac.il/njsw03users/getVerificationQuestion?QuestionID=" + qID);
        this.setState({
            showID: false,
            showWrongUser: false,
            showQ: true,
            showChange: false,
            question: response1.data.data["QuestionText"]
        });
    }

    async handle(e){
        e.preventDefault();
        var date = new Date(this.state.date);
        var dateLong = date.getTime() - 7200000;
        let url = 'http://icc.ise.bgu.ac.il/njsw03users/checkVerification';
        const response = await axios.post(
            url,
            {
                UserID: this.state.id,
                VerificationAnswer: this.state.answer,
	            BirthDate: dateLong
            }
        );
        var token = response.data.data;
        if(!token){
            this.setState({
                wrongA: true
            })
        }
        else{
            this.setState({
                showID: false,
                showWrongUser: false,
                showQ: false,
                showChange: true,
                token: token
            })
        }
    }

    async changePass(event){
        event.preventDefault();
        if(this.state.pass !== this.state.pass2){
          this.setState({
            diff: true
          });
        }
        else{
          var token = this.state.token;
          var url = 'http://icc.ise.bgu.ac.il/njsw03users/passwordChangeCheck/changePassword';
          const response = await axios.post(
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
          if(response.data.message){
            window.alert("הסיסמא שונתה בהצלחה");
            this.togglePopup();
          }
        }
    
      }

    sumbit(e){
        e.preventDefault();
        axios.post('http://icc.ise.bgu.ac.il/njsw03users/login', {
            UserID: this.state.ID,
            Password: this.state.password
        }).then(res => {
            if(res.data.data == null){
                this.setState({wrong: true})
            }
            else if(res.data.data.type[0] === "patient"){
                this.setState({name: res.data.data.name,
                    ID: "",
                    password: "",
                    wrong: false,
                    showID: false,
                    showWrongUser: true,
                    showQ: false,
                    showChange: false,
                });
                this.togglePopup();
            }
            else{
                sessionStorage.setItem("token", res.data.data.token);
                sessionStorage.setItem("name", res.data.data.name);
                sessionStorage.setItem("type", res.data.data.type);
                this.setState({
                    doctor: sessionStorage.getItem("type").includes("doctor")
                })
                sessionStorage.setItem("doctor", this.state.doctor);
                window.location.reload(false);
            }
        });

    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.sumbit(e)}>
                    <label>תעודת זהות:</label>
                    <input type="text" name="ID" onChange={e => this.change(e)} value={this.state.ID} required/>
                    <label>סיסמה:</label>
                    <input type="password" name="password"  onChange={e => this.change(e)} value={this.state.password} required/>
                    {this.state.wrong ? <label id="wrong">תעודת זהות או סיסמה לא נכונים</label> :  <label></label> }
                    <button type="submit">התחבר</button>
                    <label id="forget"  onClick={(e) => this.forget(e)}>שכחת סיסמה?</label>
                    {this.state.doctor ?  <Redirect to="/search" /> : null  }
                </form>
                {this.state.showPopup ? 
                    <Popup
                        text={this.state.name}
                        closePopup={this.togglePopup.bind(this)}
                        showID={this.state.showID}
                        showWrongUser={this.state.showWrongUser}
                        showQ={this.state.showQ}
                        showChange={this.state.showChange}
                        handleSubmit={this.handleSubmit.bind(this)}
                        change={this.change.bind(this)}
                        handle={this.handle.bind(this)}
                        question={this.state.question}
                        wrongA={this.state.wrongA}
                        diff={this.state.diff}
                        changePass={this.changePass.bind(this)}
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
          <div>
          { this.props.showWrongUser ?
            <div className='popup'>
                <div className='popup_inner' >
                    <button onClick={this.props.closePopup} id="x">x</button>
                    <h3>,שלום {this.props.text}</h3>
                    <p> אין לך את ההרשאות המתאימות על מנת להיכנס לאתר</p>
                </div>
            </div> : null
          }
          { this.props.showID ?
            <div className='popup'>
                <div className='popup_inner' >
                <button onClick={this.props.closePopup} id="x">x</button>
                <h3 id="h3">שכחתי סיסמא</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <label  id="lid">
                         אנא הזן תעודת זהות:
                    </label>
                    <input type="text" name="id" id="id" onChange={this.props.change} required/>
                    <input type="submit" value="המשך" id="con"/>
                </form>
                </div>
            </div> : null
          }
          { this.props.showQ ?
            <div className='popup'>
                <div className='popup_inner' >
                <button onClick={this.props.closePopup} id="x">x</button>
                <h3 id="h3">שכחתי סיסמא</h3>
                <form onSubmit={this.props.handle}>
                    <label  id="lq">
                         {this.props.question}
                    </label>
                    <input type="text" name="answer" id="answer" onChange={this.props.change} required/>
                    <label  id="ldate">
                         הכנס את תאריך יום הולדת שלך:
                    </label>
                    <input type="date" name="date" id="date" onChange={this.props.change} required/>
                    {this.props.wrongA ? <label>שאלת אימות לא נכונה או תאריך לידה שגוי</label> : null}
                    <input type="submit" value="המשך" id="con"/>
                </form>
                </div>
            </div> : null
          }
          { this.props.showChange ?
            <div className='popup'>
                <div className='popup_inner' >
                    <button onClick={this.props.closePopup} id="x">x</button>
                    <h3 id="h3">שכחתי סיסמא</h3>
                    <form onSubmit={this.props.changePass}>
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
            </div> : null
          }
          </div>
      );
    }
  }