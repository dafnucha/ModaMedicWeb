import React, {Component} from "react"
import axios from 'axios';
import "./PatientData.css"

class PatientData extends Component {
    constructor(props) {
        super()
        this.state = {
           user: props.user,
           showPopup: false,
           showPopupQ: false,
           new_date: "",
           Questionnaires: [],
           quest1: false,
           quest2: false,
           quest3: false,
           quest4: false,
           quest5: false,
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
        let id = this.state.user["UserID"];
        axios.post('http://icc.ise.bgu.ac.il/njsw03auth/usersAll/changeDateOfSurgery', 
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
            })
        }
        if(this.state.quest6){
            Questionnaires.push({
                "QuestionnaireID": 6,
                "QuestionnaireText": "דירוג איכות חיים"
            })
        }
        let id = this.state.user["UserID"];
        axios.post('http://icc.ise.bgu.ac.il/njsw03auth/usersAll/changeUserQuestionnaire', 
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
        let fName = this.state.user["First_Name"];
        let lName = this.state.user["Last_Name"];
        //let bmi = this.state.user["BMI"];
        //<label className="label" id="bmi">{bmi} :BMI </label>
        let sDate = (new Date(this.state.user["DateOfSurgery"])).toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: 'numeric'}).replace(/ /g, '/');
        let gender = this.state.user["Gender"];
        let height = this.state.user["Height"];
        let pNumber = this.state.user["Phone_Number"];
        let smoke = this.state.user["Smoke"];
        let sType = this.state.user["SurgeryType"];
        let weight = this.state.user["Weight"];
        var Questionnaires = "";
        for(var i = 0; i < this.state.user["Questionnaires"].length; i++){
            if(i !== 0){
                Questionnaires +=", "
            }
            Questionnaires += this.state.user["Questionnaires"][i]["QuestionnaireText"];
        }
		return (
            <div id="data">
                <div className="line">
                    <label className="label">שם פרטי: {fName}</label>
                    <label className="label">שם משפחה: {lName}</label>
                    <label className="label">מספר טלפון: {pNumber}</label>
                </div>
                <div className="line">
                    <label className="label">מין: {gender}</label>
                    <label className="label">משקל: {weight}</label>
                    <label className="label">גובה: {height}</label>
                    <label className="label">{smoke}</label>
                    
                </div>
                <div className="line">
                    <label className="label" id="sdate">תאריך ניתוח: {sDate} |</label> 
                    <label className="label" id="changeDate" onClick={() => this.changeDate()}>שינוי התאריך</label>
                    <label className="label">סוג ניתוח: {sType}</label>
                </div>
                <div className="line">
                    <label className="label" id="quest">שאלונים: {Questionnaires} |</label> 
                    <label className="label" id="changeDate" onClick={() => this.changeQuest()}>שינוי השאלונים</label>
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
            <div className='popup_inner' >
                <button onClick={this.props.closePopup} id="x">x</button>
                <h4>שינוי תאריך הניתוח</h4>
                <form  onSubmit={this.props.handleSubmit}>
                    <label> הכנס תאריך ניתוח חדש</label>
                    <input type="date" name="new_date"  onChange={this.props.handleChange}/>
                    <button type="sumbit" >שינוי</button>
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
            <div className='popup_inner' >
                <button onClick={this.props.closePopup} id="x">x</button>
                <h4>שינוי שאלונים</h4>
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
                    <div className="line">
                        <input type="checkbox"
                            className="cInput" 
                            name="quest6"
                            checked={this.props.quest6}
                            onChange={this.props.handleChange}
                        />
                        <label className="mLabel">
                            דירוג איכות חיים  
                        </label>
                    </div>
                    <button type="sumbit" >שינוי</button>
                </form>
            </div>
        </div>
      );
    }
  }