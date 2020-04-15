import React, {Component} from "react"
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import "./search.css"
import DisplayButton from './DisplayButton';

class Search extends Component {
    constructor() {
        super()
        this.state = {
            pName: "",
            fName: "",
            end_date: "",
            start_date: "",
            steps: false,
            distance : false,
            weather: false,
            calories: false,
            sleeping_hours: false,
            dataArr: [],
            periodicAnswers: [],
            showPopup: false,
            textPopup: [],
            dailyA: [],
            numOfUsers: 0,
            dailyQ: false,
            perQ: false,
            x: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.selectUser = this.selectUser.bind(this);
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
    }

    async getRequest(name, url){
        let getUrl = 'http://icc.ise.bgu.ac.il/njsw03auth/doctors/' + url + '?FirstName=' + this.state.pName + '&LastName=' + this.state.fName;
        if(this.state.start_date !== ""){
            var date = new Date(this.state.start_date)
            let start_time = date.getTime();
            getUrl += ("&start_time=" + start_time); 
        }
        if(this.state.end_date !== ""){
            date = new Date(this.state.end_date)
            let end_time = date.getTime();
            getUrl += ("&end_time=" + end_time); 
        }
            const response = await axios.get(
                getUrl,
                { 
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-auth-token': sessionStorage.getItem("token")
                    } 
                }
            );
            return({
                values: response.data.data,
                name : name,
                numOfUsers: response.data.data.length
            });
    }

    selectUser(key){
        let arr = this.state.dataArr;
        let d = this.state.dailyA;
        var da = [];
        for(var i = 0; i < this.state.numOfUsers; i++){
            if(d[i] && d[i].UserID === key){
                da = d[i].docs;
            }
        }
        for(i = 0; i < this.state.questionnaire.values.length; i++){
            if(this.state.questionnaire.values[i].UserID === key && this.state.questionnaire.values[i]["docs"] !== "No Permission"){
                this.state.periodicAnswers.push(this.state.questionnaire.values[i]["docs"]);
            }
        }
        for(i = 0; i < arr.length; i++){
            let values = [];
            if(arr[i]){
                for(var j = 0; j < arr[i].values.length; j++){
                    if(arr[i].values[j].UserID === key){
                        values = arr[i].values[j].docs;
                    }

                }
                arr[i].values = values;
            }
        }
        if(((arr[0] && arr[0]["values"] === "No Permission") || da === "No Permission" ) && !this.state.periodicAnswers[0] ){
            window.alert("אין לך הרשאות לצפייה במטופל אנא בקש הרשאה");
            this.setState({
                dataArr: [],
                periodicAnswers: [],
                dailyA: [],
                showPopup: false
            })
            this.handleSubmit();
        }
        else{
            this.setState({
                dataArr: arr,
                dailyA: da
            })
            this.togglePopup();
        }
    }

    async handleSubmit(event) {
        if(event){
            event.preventDefault()
        }
        var numOfUsers = 0;
        var arr = []
        var  i = 0;
        if(this.state.steps){
            let response = await this.getRequest("צעדים", "metrics/getSteps")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.distance){
            let response = await this.getRequest("מרחק", "metrics/getDistance")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.calories){
            let response = await this.getRequest("קלוריות", "metrics/getCalories")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.weather){
            let response = await this.getRequest("מזג האוויר", "metrics/getWeather")
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        if(this.state.sleeping_hours){
            let response = await this.getRequest("שעות שינה", "metrics/getSleep");
            arr.push(response);
            if(response.numOfUsers > numOfUsers){
                numOfUsers = response.numOfUsers;
            }
        }
        let response = await this.getRequest("תשובות יומיות", "answers/getDailyAnswers")
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        let responseQ = await this.getRequest("שאלון תקופתי", "answers/getPeriodicAnswers")
        var num = 0; 
        var id = {};
        for(i = 0; i < responseQ.values.length; i++){
            if(!id[responseQ.values[i].UserID]){
                id[responseQ.values[i].UserID] = true;
                num++;
            }
        }
        if(num > numOfUsers){
            numOfUsers = num;
        }
        if(numOfUsers === 1){
            for(i = 0; i < arr.length; i++){
                arr[i].values = arr[i].values[0];
            }
            response.values = response.values[0]
        }
        this.setState({
            dataArr : arr,
            dailyA: response.values,
            numOfUsers: numOfUsers,
            questionnaire: responseQ
        })
        if(numOfUsers > 1){
            var cards = [];
            for(i = 0; i < numOfUsers; i++){
                let x = this.state.dailyA[i].UserID;
                if(!x)
                    x = this.state.periodicAnswers[i].UserID;
                if(!x)
                    x = this.state.dataArr[0][i].UserID;
                this.state.x.push(x)
                cards.push(
                    <Card className="card" key={this.state.x[i]}  onClick={() => this.selectUser(x)}>
                        <Card.Body className="cardBody">שם פרטי: {this.state.pName} </Card.Body>
                        <Card.Body className="cardBody">שם משפחה: {this.state.fName} </Card.Body>
                        <Card.Body className="cardBody">תז: {this.state.x[i]}</Card.Body>
                        {(((this.state.dataArr[0] && this.state.dataArr[0]["values"] === "No Permission") || this.state.dailyA === "No Permission" )) ?
                            <label>בקש הרשאה</label> : null
                        }
                    </Card>
                );
            }
            this.setState({
                text: cards
            })
            this.togglePopup();
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="search">
                        <label className="lSearch" >
                                חפש מטופל:
                        </label>
                        <input className="iSearch"
                            id="pname"
                            type="text" 
                            name="pName"
                            value={this.state.pName} 
                            placeholder="שם פרטי" 
                            onChange={this.handleChange} 
                            required
                        />
                        <input className="iSearch"
                            id="fname"
                            type="text" 
                            name="fName"
                            value={this.state.fName} 
                            placeholder="שם משפחה" 
                            onChange={this.handleChange} 
                            required
                        />
                        <button className="bSearch"> 
                            חפש
                        </button>
                    </div>
                    <div className="dates">
                            <label className="cSearch">
                                בחר תאריכים מ
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="start_date"
                                value={this.state.start_date} 
                                onChange={this.handleChange}
                            />
                            <label className="aSearch">
                                עד
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="end_date"
                                value={this.state.end_date} 
                                onChange={this.handleChange}
                            />
                    </div>
                    <br />
                    <div className="mdd">
                        <label className="mLabel">
                                בחר מדדים
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="steps"
                            checked={this.state.steps}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            צעדים
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="distance"
                            checked={this.state.distance}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            מרחק
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="weather"
                            checked={this.state.weather}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            מזג האוויר
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="calories"
                            checked={this.state.calories}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            קלוריות
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="sleeping_hours"
                            checked={this.state.sleeping_hours}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            שעות שינה
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="dailyQ"
                            checked={this.state.dailyQ}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            שאלון יומי
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="perQ"
                            checked={this.state.perQ}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            שאלונים תקופתיים
                        </label>
                    </div>
                </form>
                <br />
                <DisplayButton 
                    dataArr={this.state.dataArr} 
                    steps={this.state.steps}
                    distance={this.state.distance}
                    calories={this.state.calories}
                    weather={this.state.weather}
                    sleep={this.state.sleeping_hours}
                    dailyA={this.state.dailyA}
                    periodicAnswers={this.state.periodicAnswers}
                    dailyQ={this.state.dailyQ}
                    perQ={this.state.perQ}
                />
                {this.state.showPopup ? 
                    <Popup
                        text={this.state.text}
                        closePopup={this.togglePopup.bind(this)}
                    /> : null
                }
            </div>
        )
    }
}

export default Search

class Popup extends React.Component {
    render() {
      return (
        <div className='popup'>
            <div className='popup_inner' >
                <button onClick={this.props.closePopup} id="x">x</button>
                <h4>:אנא בחר מבין הרשומות הבאות</h4>
                {this.props.text}
            </div>
        </div>
      );
    }
  }
