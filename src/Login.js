import React, {Component} from 'react';

import './Login.css';
import axios from 'axios';
import Adduser from'./AddUser';

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
            pass2: "",
            remember: false,
            register: false
        };
        if(localStorage.getItem("doctor")){
            sessionStorage.setItem("token", localStorage.getItem("token"));
            sessionStorage.setItem("name", localStorage.getItem("name"));
            sessionStorage.setItem("type", localStorage.getItem("type"));
            sessionStorage.setItem("doctor", localStorage.getItem("doctor"));
        }
        this.change = this.change.bind(this);
        this.sumbit = this.sumbit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.forget = this.forget.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handle = this.handle.bind(this);
        this.changePass = this.changePass.bind(this);
        this.register = this.register.bind(this);
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
            register: false
        })
        this.togglePopup();
    }

    async handleSubmit(e){
        e.preventDefault();
        let url = 'https://icc.ise.bgu.ac.il/njsw03users/forgotPassword';
        const response = await axios.post(
            url,
            {
                UserID: this.state.id
            }
        );
        if(response.data.data === null){
            this.setState({
                wrongA: true
            })
        }
        else{
            var qID = response.data.data;
            const response1 = await axios.get("https://icc.ise.bgu.ac.il/njsw03users/getVerificationQuestion?QuestionID=" + qID);
            this.setState({
                showID: false,
                showWrongUser: false,
                showQ: true,
                showChange: false,
                register: false,
                wrongA: false,
                question: response1.data.data["QuestionText"]
            });
        }
    }

    async handle(e){
        e.preventDefault();
        var date = new Date(this.state.date);
        var dateLong = date.getTime();
        let url = 'https://icc.ise.bgu.ac.il/njsw03users/checkVerification';
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
                register: false,
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
          var url = 'https://icc.ise.bgu.ac.il/njsw03users/passwordChangeCheck/changePassword';
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

    register(e){
        this.setState({
            register: true,
            showID: false,
            showWrongUser: false,
            showQ: false,
            showChange: false,
        })
        this.togglePopup();
    }

    sumbit(e){
        e.preventDefault();
        axios.post('https://icc.ise.bgu.ac.il/njsw03users/login', {
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
                    register: false
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
                if(this.state.remember){
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("name", res.data.data.name);
                    localStorage.setItem("type", res.data.data.type);
                    localStorage.setItem("doctor", this.state.doctor);
                }
            }
            
        });

    }

    render(){
        require("./Login.css");
        return(
            <div>
                <form onSubmit={e => this.sumbit(e)}>
                    <label>כתובת דוא"ל:</label>
                    <input type="text" className="inputs" name="ID" onChange={e => this.change(e)} value={this.state.ID} required/>
                    <label>סיסמה:</label>
                    <input type="password"  className="inputs" name="password"  onChange={e => this.change(e)} value={this.state.password} required/>
                    {this.state.wrong ? <label id="wrong">כתובת הדוא"ל או הסיסמה לא נכונים</label> :  <label></label> }
                    <input type="checkbox" id="remember" name="remember" onChange={e => this.change(e)} value={this.state.remember}/>
                    <label>זכור אותי</label>
                    <button type="submit">התחבר</button>
                    <label id="forget"  onClick={(e) => this.forget(e)}>שכחת סיסמה?</label>
                    <label id="register"  onClick={(e) => this.register(e)}>הירשם</label>
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
                        register={this.state.register}
                    /> : null
                }
            </div>
        )
    }
}

export default Login;

class Popup extends React.Component {
    render() {
        var today = (new Date()).toISOString().split("T")[0];
        return (
            <div>
            { this.props.showWrongUser ?
                <div className='popup'>
                    <div className='popup_innerWrong' >
                        <button onClick={this.props.closePopup} id="x">x</button>
                        <h3>,שלום {this.props.text}</h3>
                        <p id="wrongType"> אין לך את ההרשאות המתאימות על מנת להיכנס לאתר</p>
                    </div>
                </div> : null
            }
            { this.props.showID ?
                <div className='popup'>
                    <div className='popup_innerEmail' >
                    <button onClick={this.props.closePopup} id="x">x</button>
                    <h3 id="h3">שכחתי סיסמא</h3>
                    <form onSubmit={this.props.handleSubmit}>
                        <label  id="lid">
                            אנא הזן כתובת דוא"ל:
                        </label>
                        <input type="text" className="inputs" name="id" id="id" onChange={this.props.change} required/>
                        {this.props.wrongA ? <label className="error">כתובת דוא"ל לא קיימת</label> : null}
                        <div className="lineC">
                            <input type="submit" value="המשך" id="con"/>
                        </div>
                    </form>
                    </div>
                </div> : null
            }
            { this.props.showQ ?
                <div className='popup'>
                    <div className='popup_innerEmail' >
                    <button onClick={this.props.closePopup} id="x">x</button>
                    <h3 id="h3">שכחתי סיסמא</h3>
                    <form onSubmit={this.props.handle}>
                        <div className="lineC"> 
                            <label  id="lq">
                                {this.props.question}
                            </label>
                        </div>
                        <div className="lineC">
                            <input type="text"  name="answer" id="answer" onChange={this.props.change} required/>
                        </div>
                        <div className="lineC">
                            <label  id="ldate">
                                הכנס את תאריך יום הולדת שלך:
                            </label>
                        </div>
                        <div className="lineC">
                            <input type="date" name="date" id="date" max={today} onChange={this.props.change} required/>
                        </div>
                        <div className="lineC">
                            {this.props.wrongA ? <label className="error">שאלת אימות לא נכונה או תאריך לידה שגוי</label> : null}
                        </div>
                        <div className="lineC">
                            <input type="submit" value="המשך" id="con"/>
                        </div>
                    </form>
                    </div>
                </div> : null
            }
            { this.props.showChange ?
                <div className='popup'>
                    <div className='popup_innerEmail' >
                        <button onClick={this.props.closePopup} id="x">x</button>
                        <h3 id="h3">שכחתי סיסמא</h3>
                        <form onSubmit={this.props.changePass}>
                            <label  id="lpass">
                                סיסמא חדשה:
                            </label>
                            <input type="password" className="inputs" name="pass" id="pass" onChange={this.props.change} required/>
                            <label id="lpass2">
                                הקלד את הסיסמא מחדש:
                            </label>
                            <input type="password" className="inputs" name="pass2" id="pass2" onChange={this.props.change} required/>
                            {this.props.diff ? <label className="error">הסיסמאות שונות</label> : null}
                            <input type="submit" value="שלח" id="send"/>
                        </form>
                    </div>
                </div> : null
            }
            { this.props.register ?
                <div className='popup'>
                    <div className='popup_innerAdd' >
                        <button onClick={this.props.closePopup} id="x">x</button>
                        <h3>הרשמה</h3>
                        <Adduser />
                    </div>
                </div> : null
            }
            </div>
        );
    }
  }