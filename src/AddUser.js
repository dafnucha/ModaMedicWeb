import React, { Component } from "react";
import Logo from "./Logo";

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
    selectedUserType: "patient"
};

class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            selectedUserType: "patient"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
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

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRadioChange(event) {
        const {name, checked} = event.target;
        this.setState({ selectedUserType: name });
    }

    handleSubmit(event) {
        // event.target.setCustomValidity("my message");
        alert('משתמש חדש נוסף למערכת: ' + this.state.userName);
        event.preventDefault();
        window.location.href = "./search"
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
            <option key={question}>{question}</option>
        );

        return (
            <div>
                <header className="Home-header">
                    <Logo />
                </header>
                <h2>הוספת משתמש חדש</h2>

                <form onSubmit={this.handleSubmit} onReset={this.handleReset} id="new_user_form">
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שם משתמש      </label>
                        <input className="inputs_in_add_user" name="userName" type="text" value={this.state.userName} onChange={e => this.handleChange(e)} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שם פרטי      </label>
                        <input className="inputs_in_add_user" name="fName" type="text" value={this.state.fName} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שם משפחה      </label>
                        <input className="inputs_in_add_user" name="lName" type="text" value={this.state.lName} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">סיסמה      </label>
                        <input className="inputs_in_add_user" name="password" type="password" value={this.state.password} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">כתובת מייל      </label>
                        <input className="inputs_in_add_user" name="email" type="email" value={this.state.email} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">תאריך לידה      </label>
                        <input className="inputs_in_add_user" name="bday" type="date" value={this.state.bday} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">שאלת אימות      </label>
                        <select className="select_in_add_user">
                            {optionItems}
                        </select>
                        <input className="inputs_in_add_user" name="answerUserQuestion" type="text" value={this.state.answerUserQuestion} onChange={this.handleChange} required/>
                    </div>
                    <div className="divs_in_add">
                        <label className="labels_in_add_user">סוג משתמש      </label>
                        <label className="label_for_user_type">
                            מטופל
                            <input className="input_for_user_type" name="patient" type="radio" value="מטופל" onChange={this.handleRadioChange} checked={this.state.selectedUserType === 'patient'}/>
                        </label>
                        <label className="label_for_user_type">
                            רופא
                            <input className="input_for_user_type" name="doctor" type="radio" value="רופא" onChange={this.handleRadioChange} checked={this.state.selectedUserType === 'doctor'}/>
                        </label>
                        <label className="label_for_user_type">
                            מנהל
                            <input className="input_for_user_type" name="admin" type="radio" value="מנהל" onChange={this.handleRadioChange} checked={this.state.selectedUserType === 'admin'}/>
                        </label>

                    </div>
                    <div className="divs_in_add">
                        <input type="submit" value="שמור" className="submit_and_reset_buttons"/>
                        <input type="reset" value="מחק" className="submit_and_reset_buttons"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUser;