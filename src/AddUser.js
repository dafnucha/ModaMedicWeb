import React, { Component } from "react";
import axios from 'axios';

const initialState = {
    userName: "",
    fName: "",
    lName: "",
    password: "",
    bday: new Date(),
    email: "",
    questionsID: [],
    questionsText: [],
    questions :[],
    answerUserQuestion: "",
    selectedUserType: "patient",
    quesionChosen: 0
};

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            fName: "",
            lName: "",
            password: "",
            bday: "new Date()",
            phone: "",
            questionsID: [],
            questionsText: [],
            questions :[],
            answerUserQuestion: "",
            selectedUserType: "patient",
            code: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }
    
    onSelect(event) {
        const selectedIndex = event.target.options.selectedIndex;
        this.setState({
            quesionChosen: selectedIndex
        });
    }

    componentDidMount() {
        let initialQuestions = [];
        let initQuestionsID = [];
        let initQuestionsText = [];
        fetch('http://icc.ise.bgu.ac.il/njsw03users/getVerifications')
            .then(response => {
                return response.json();
            }).then(results => {

            initialQuestions = results.data;

            for(var i = 0; i < initialQuestions.length; i++) {
                var obj = initialQuestions[i];

                initQuestionsID.push(obj.QuestionID);
                initQuestionsText.push(obj.QuestionText);
            }

            this.setState({
                questionsID: initQuestionsID,
                questionsText: initQuestionsText,
                questions: initialQuestions
            });
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var bDay = new Date(this.state.bday);
        var now = new Date();
        axios.post('http://icc.ise.bgu.ac.il/njsw03users/doctorRegister', {
            UserID: this.state.userName,
            Password: this.state.password,
            First_Name: this.state.fName,
            Last_Name: this.state.lName,
            Phone_Number: this.state.phone,
            BirthDate: bDay.getTime(),
            Code: this.state.code,
            VerificationQuestion: this.state.quesionChosen,
            VerificationAnswer: this.state.answerUserQuestion,
            ValidTime: now.getTime()
        }).then(res => {
            if(res.data.message === "Wrong Code"){
                window.alert("קוד האימות אינו נכון");
            }
            else if(res.data.message === "Taken Email"){
                window.alert("כתובת הדואל כבר רשומה במערכת");
            }
            else{
                window.alert("ההרשמה בוצעה בהצלחה נא לבצע התחברות");
                window.location.reload(false);
            }
        })
    }

    handleReset(event) {
        this.setState (initialState);
        let initialQuestions = [];
        let initQuestionsID = [];
        let initQuestionsText = [];
        fetch('http://icc.ise.bgu.ac.il/njsw03users/getVerifications')
            .then(response => {
                return response.json();
            }).then(results => {

            initialQuestions = results.data;
            console.log(initialQuestions);

            for(var i = 0; i < initialQuestions.length; i++) {
                var obj = initialQuestions[i];

                initQuestionsID.push(obj.QuestionID);
                initQuestionsText.push(obj.QuestionText);
            }

            this.setState({
                questionsID: initQuestionsID,
                questionsText: initQuestionsText,
                questions: initialQuestions
            });
        });
    }

    render() {
        require("./AddUser.css");
        let quesions = this.state.questionsText;
        let optionItems = quesions.map((question) =>
            <option key={question} >{question}</option>
        );
        return (
            
            <div>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset} id="new_user_form">
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">כתובת דוא"ל</label>
                        <input className="inputs_in_add_user" name="userName" type="text" value={this.state.userName} onChange={e => this.handleChange(e)} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שם פרטי</label>
                        <input className="inputs_in_add_user" name="fName" type="text" value={this.state.fName} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שם משפחה </label>
                        <input className="inputs_in_add_user" name="lName" type="text" value={this.state.lName} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">סיסמה </label>
                        <input className="inputs_in_add_user" name="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">מספר טלפון</label>
                        <input className="inputs_in_add_user" name="phone" type="tel" id="phone" pattern="[0-9]{10}" value={this.state.phone} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">תאריך לידה</label>
                        <input className="inputs_in_add_user" name="bday" type="date" value={this.state.bday} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">קוד אימות </label>
                        <input className="inputs_in_add_user" name="code" type="text" value={this.state.code} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שאלת אימות </label>
                        <select className="select_in_add_user" onChange= {this.onSelect}>
                            {optionItems}
                        </select>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">תשובה </label>
                        <input className="inputs_in_add_user" name="answerUserQuestion" type="text" value={this.state.answerUserQuestion} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <input type="submit" value="הירשם" className="submit_and_reset_buttons"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUser;