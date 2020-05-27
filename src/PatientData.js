import React, {Component} from "react"
import axios from 'axios';

class PatientData extends Component {
    constructor(props) {
        super()
        var q2 = false, q3 = false, q4 = false, q5 = false;
        for(var i = 0; i < props.user["Questionnaires"].length; i++){
            if(props.user["Questionnaires"][i]["QuestionnaireID"] === 1){
                q2= true;
            }
            else if(props.user["Questionnaires"][i]["QuestionnaireID"] === 2){
                q3= true;
            }
            else if(props.user["Questionnaires"][i]["QuestionnaireID"] === 3){
                q4= true;
            }
            else if(props.user["Questionnaires"][i]["QuestionnaireID"] === 5){
                q5= true;
            }
        }
        this.state = {
           user: props.user,
           showPopup: false,
           showPopupQ: false,
           new_date: "",
           Questionnaires: [],
           quest1: false,
           quest2: q2,
           quest3: q3,
           quest4: q4,
           quest5: q5,
           quest6: false
        }
        this.changeDate = this.changeDate.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopupQ = this.togglePopupQ.bind(this);
        this.handleSubmitQ = this.handleSubmitQ.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        let date = (new Date(this.state.new_date)).getTime();
        let id = this.props.user["UserID"];
        axios.post('https://icc.ise.bgu.ac.il/njsw03auth/usersAll/changeDateOfSurgery', 
        {
            UserID: id,
            DateOfSurgery: date
        },            
        { 
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': sessionStorage.getItem("token")
            }
        }).then(res => {
            window.alert("התאריך שונה בהצלחה")
            this.togglePopup();
        });
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
    }

    handleSubmitQ(e){
        e.preventDefault();
        var Questionnaires =[];
        if(this.state.quest2){
            Questionnaires.push({
                "QuestionnaireID": 1,
                "QuestionnaireText": "תפקוד גב תחתון"
            })
        }
        if(this.state.quest3){
            Questionnaires.push({
                "QuestionnaireID": 2,
                "QuestionnaireText": "תפקוד צוואר"
            })
        }
        if(this.state.quest4){
            Questionnaires.push({
                "QuestionnaireID": 3,
                "QuestionnaireText": "תפקוד גף תחתון"
            })
        }
        if(this.state.quest5){
            Questionnaires.push({
                "QuestionnaireID": 5,
                "QuestionnaireText": "איכות חיים"
            });
        }           
        let id = this.props.user["UserID"];
        axios.post('https://icc.ise.bgu.ac.il/njsw03auth/usersAll/changeUserQuestionnaire', 
        {
            UserID: id,
            Questionnaires: Questionnaires
        },            
        { 
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': sessionStorage.getItem("token")
            }
        }).then(res => {
           window.alert("השאלונים שונו בהצלחה");
           this.togglePopupQ();
        });
    }

    changeQuest(){
        this.togglePopupQ();
    }

    changeDate(){
        this.togglePopup();
    }

    togglePopupQ() {
        this.setState({
          showPopupQ: !this.state.showPopupQ
        });

    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    render() {
        require("./PatientData.css");
        let name = this.props.user["First_Name"] + " " + this.props.user["Last_Name"];
        let bmi = parseFloat(this.props.user["BMI"]).toFixed(1);
        var sDate = "";
        if(this.props.user["DateOfSurgery"]){
            sDate = (new Date(this.props.user["DateOfSurgery"])).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        else{
            sDate = "לא נקבע יום ניתוח";
        }
        let gender = this.props.user["Gender"];
        let height = this.props.user["Height"];
        let pNumber = this.props.user["Phone_Number"];
        let smoke = this.props.user["Smoke"];
        let sType = this.props.user["SurgeryType"];
        let weight = this.props.user["Weight"];
        var today = new Date();
        var birthday = new Date(this.props.user["BirthDate"]);
        var age = Math.floor((today.getTime() - birthday.getTime())/ 31536000000)
        var Questionnaires = "";
        var first = true;
        for(var i = 0; i < this.props.user["Questionnaires"].length; i++){
            if(this.props.user["Questionnaires"][i]["QuestionnaireID"] !== 0 && this.props.user["Questionnaires"][i]["QuestionnaireID"] !== 6){
                if(!first){
                    Questionnaires +=", "
                }
                else{
                    first = false;
                }
                if(!Questionnaires.includes(this.props.user["Questionnaires"][i]["QuestionnaireText"])){
                    Questionnaires += this.props.user["Questionnaires"][i]["QuestionnaireText"];
                }
            }
        }
        if(Questionnaires.charAt(Questionnaires.length - 1) === " "){
            Questionnaires = Questionnaires.substring(0, Questionnaires.length - 2);
        }
        var className = "g";
        if(this.props.table){
            className = "t"
        }
		return (
            <div id="data" className={className}>
                <div className="line">
                    <label className="label">שם:</label>
                    <label className="labelData">{name}</label>
                    <label className="label">מספר טלפון:</label>
                    <label className="labelData">{pNumber}</label>
                </div>
                <div className="line">
                    <label className="label">מין:</label>
                    <label className="labelData">{gender}</label>
                    <label className="label">משקל:</label>
                    <label className="labelData">{weight}</label>
                    <label className="label">גובה:</label>
                    <label className="labelData">{height}</label>
                    <label className="label">גיל:</label>
                    <label className="labelData">{age}</label>
                    <label className="label">BMI:</label>
                    <label className="labelData">{bmi}</label>
                    <label className="labelData">{smoke}</label>
                    
                </div>
                <div className="line">
                    <label className="label">סוג ניתוח:</label>
                    <label className="labelData">{sType}</label>
                    <label className="label">תאריך ניתוח:</label>
                    <label className="labelData" >{sDate}</label>  
                    <button className="changeDate" onClick={() => this.changeDate()}> 
                        שינוי התאריך        
                    </button>
                </div>
                <div className="line">
                    <label className="label" >שאלונים:</label> 
                    <label className="labelData" >{Questionnaires} </label> 
                    <button className="changeDate" onClick={() => this.changeQuest()}> 
                        שינוי השאלונים  
                    </button>
                </div>
                {this.state.showPopup ? 
                    <Popup
                        closePopup={this.togglePopup.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                    /> : null
                }
                {this.state.showPopupQ ? 
                    <PopupQ
                        closePopup={this.togglePopupQ.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        handleSubmit={this.handleSubmitQ.bind(this)}
                        quest1={this.state.quest1}
                        quest2={this.state.quest2}
                        quest3={this.state.quest3}
                        quest4={this.state.quest4}
                        quest5={this.state.quest5}
                        quest6={this.state.quest6}
                    /> : null
                }
            </div>
        )
    }
}

export default PatientData

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_innerCD' >
                <div className="line_x">
                    <button onClick={this.props.closePopup} id="x">x</button>
                </div>
                <h4 id="h4C">שינוי תאריך הניתוח</h4>
                <form  onSubmit={this.props.handleSubmit} id="newDate_form">
                    <div className="line_newData">
                        <label id="newD"> הכנס תאריך ניתוח חדש:</label>
                    </div>
                    <div className="line_newData">
                    <input id="new_date" type="date" name="new_date"  onChange={this.props.handleChange}/>
                    </div>
                    <div className="line_newData">
                        <button id="sumbitC" type="sumbit" >שינוי</button>
                    </div>
                    <div className="line_newData">
                        <label id="noDate">*לביטול תאריך ניתוח יש ללחוץ על שינוי בלי קביעת תאריך חדש</label>
                    </div>
                </form>
            </div>
        </div>
      );
    }
  }

  class PopupQ extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_innerCQ' >
                <div className="line_x">
                    <button onClick={this.props.closePopup} id="x">x</button>
                </div>
                <h4 id="h4C">שינוי שאלונים</h4>
                <form id="formQ" onSubmit={this.props.handleSubmit}>
                    <div className="line">
                        <input type="checkbox"
                            className="cInput" 
                            name="quest2"
                            checked={this.props.quest2}
                            onChange={this.props.handleChange}
                        />
                        <label className="mLabel">
                            תפקוד גב תחתון  
                        </label>
                    </div>
                    <div className="line">
                        <input type="checkbox"
                            className="cInput" 
                            name="quest3"
                            checked={this.props.quest3}
                            onChange={this.props.handleChange}
                        />
                        <label className="mLabel">
                            תפקוד צוואר  
                        </label>
                    </div>
                    <div className="line">
                        <input type="checkbox"
                            className="cInput" 
                            name="quest4"
                            checked={this.props.quest4}
                            onChange={this.props.handleChange}
                        />
                        <label className="mLabel">
                            תפקוד גף תחתון    
                        </label>
                    </div>
                    <div className="line">
                        <input type="checkbox"
                            className="cInput" 
                            name="quest5"
                            checked={this.props.quest5}
                            onChange={this.props.handleChange}
                        />
                        <label className="mLabel">
                            איכות חיים  
                        </label>
                    </div>
                    <button  id="changeQ" type="sumbit" >שינוי</button>
                </form>
            </div>
        </div>
      );
    }
  }