import React, {Component} from "react"
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import DisplayButton from './DisplayButton';

class Search extends Component {
    constructor() {
        super()
        var date = new Date();
        var x = date.toISOString().split("T")[0];
        var list = [], list1 = [];
        axios.get(
            "https://icc.ise.bgu.ac.il/njsw03auth/usersAll/getFirsts",
            { 
                headers: { 
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem("token")
                } 
            }
        ).then(function (response){
            if(response.data.data){
                var names = response.data.data.map(function(item, i){
                    return item.trim();
                })
                names = names.sort();
                var uniqueNames = Array.from(new Set(names));
                for(var  i = 0; i < uniqueNames.length; i++){
                    list.push(<option key={uniqueNames[i]}>{uniqueNames[i]}</option>);
                }
            }
        });
        axios.get(
            "https://icc.ise.bgu.ac.il/njsw03auth/usersAll/getLasts",
            { 
                headers: { 
                    'Content-Type': 'application/json',
                    'x-auth-token': sessionStorage.getItem("token")
                } 
            }
        ).then(function (response){
            if(response.data.data){
                var names = response.data.data.map(function(item, i){
                    return item.trim();
                })
                names = names.sort();
                var uniqueNames = Array.from(new Set(names));
                for(var  i = 0; i < uniqueNames.length; i++){
                    list1.push(<option key={uniqueNames[i]}>{uniqueNames[i]}</option>);
                }
            }
        });
        this.state = {
            pName: "",
            fName: "",
            end_date: x,
            start_date: "2020-01-01",
            steps: true,
            distance : true,
            weather: true,
            calories: true,
            sleeping_hours: true,
            dataArr: [],
            periodicAnswers: [],
            showPopup: false,
            textPopup: [],
            dailyA: [],
            numOfUsers: 0,
            dailyQ: true,
            perQ: true,
            x: [],
            date: 0,
            showDaily: true,
            weekly: false,
            monthly: false,
            user: {},
            ready: false, 
            todayDate: x,
            optionsPName: list,
            optionsLName: list1,
            className: "normal"
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
        if(name === "showDaily"){
            this.setState({
                showDaily: true,
                weekly: false,
                monthly: false
            })
        }
        else if(name === "weekly"){
            this.setState({
                showDaily: false,
                weekly: true,
                monthly: false
            })
        }
        else if(name === "monthly"){
            this.setState({
                showDaily: false,
                weekly: false,
                monthly: true
            })
        }
    }

    async getRequest(name, url){
        let getUrl = 'https://icc.ise.bgu.ac.il/njsw03auth/doctors/' + url + '?FirstName=' + this.state.pName.trim() + '&LastName=' + this.state.fName.trim();
        if(this.state.start_date !== ""){
            var date = new Date(this.state.start_date)
            let start_time = date.getTime();
            getUrl += ("&start_time=" + start_time); 
        }
        if(this.state.end_date !== ""){
            date = new Date(this.state.end_date)
            date = new Date(date.getTime() + 86400000);
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
            if(response.data.message === "Not Found"){
                return null;
            }
            return({
                values: response.data.data,
                name : name,
                numOfUsers: response.data.data.length
            });
    }

    async selectUser(key){
        let arr = this.state.dataArr;
        let d = this.state.dailyA;
        var da = [];
        var user;
        var sDate;
        for(var i = 0; i < this.state.numOfUsers; i++){
            if(d[i] && d[i].UserID["BirthDate"] === key){
                da = d[i].docs;
                sDate = d[i].UserID["DateOfSurgery"];
                user = d[i].UserID;
            }
        }
        for(i = 0; i < this.state.questionnaire.values.length; i++){
            if(this.state.questionnaire.values[i].UserID["BirthDate"] === key){
                this.state.periodicAnswers.push(this.state.questionnaire.values[i]["docs"]);
                sDate = this.state.questionnaire.values[i].UserID["DateOfSurgery"];
                user = this.state.questionnaire.values[i].UserID;
            }
        }
        for(i = 0; i < arr.length; i++){
            let values = [];
            if(arr[i]){
                for(var j = 0; j < arr[i].values.length; j++){
                    if(arr[i].values[j].UserID["BirthDate"] === key){
                        values = arr[i].values[j].docs;
                        sDate = arr[i].values[j].UserID["DateOfSurgery"];
                        user = arr[i].values[j].UserID;
                    }
                }
                arr[i].values = values;
            }
        }
        this.setState({
            dataArr: arr,
            dailyA: da,
            date: sDate,
            user: user,
            ready: true,
            className: "normal"
        })
        if(this.state.showPopup){
            this.togglePopup();
        }
    }

    async handleSubmit(event) {
        if(event){
            event.preventDefault()
        }
        this.setState({
            ready: false,
            className: "waiting",
            periodicAnswers: []
        })
        var numOfUsers = 0;
        var arr = []
        var  i = 0;
        let response = await this.getRequest("צעדים", "metrics/getSteps");
        if(!response){
            window.alert("לא קיים מטופל");
            return;
        }
        if(response.values[0]["docs"].length > 0){
            arr.push(response);
        }
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        response = await this.getRequest("מרחק", "metrics/getDistance")
        if(response.values[0]["docs"].length > 0){
            arr.push(response);
        }
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        response = await this.getRequest("קלוריות", "metrics/getCalories")
        if(response.values[0]["docs"].length > 0){
            arr.push(response);
        }
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        response = await this.getRequest("מזג האוויר", "metrics/getWeather")
        if(response.values[0]["docs"].length > 0){
            arr.push(response);
        }
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        response = await this.getRequest("שעות שינה", "metrics/getSleep");
        if(response.values[0]["docs"].length > 0){
            arr.push(response);
        }
        if(response.numOfUsers > numOfUsers){
            numOfUsers = response.numOfUsers;
        }
        response = await this.getRequest("תשובות יומיות", "answers/getDailyAnswers")
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
        this.setState({
            dataArr : arr,
            dailyA: response.values,
            numOfUsers: numOfUsers,
            questionnaire: responseQ
        })
        if(numOfUsers === 1){
            let x = this.state.dailyA[0].UserID["BirthDate"];
            if(!x)
                x = this.state.periodicAnswers[0].UserID["BirthDate"];
            if(!x)
                x = this.state.dataArr[0][0].UserID["BirthDate"];
            this.selectUser(x)
        }
        if(numOfUsers > 1){
            var cards = [];
            for(i = 0; i < numOfUsers; i++){
                let x = this.state.dailyA[i].UserID["BirthDate"];
                if(!x)
                    x = this.state.periodicAnswers[i].UserID["BirthDate"];
                if(!x)
                    x = this.state.dataArr[0][i].UserID["BirthDate"];
                let dateC = new Date(x);
                this.state.x.push(dateC.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year:"numeric"}))
                cards.push(
                    <Card className="card" key={this.state.x[i]}  onClick={() => this.selectUser(x)}>
                        <Card.Body className="cardBody">שם פרטי: {this.state.pName.trim()} </Card.Body>
                        <Card.Body className="cardBody">שם משפחה: {this.state.fName.trim()} </Card.Body>
                        <Card.Body className="cardBody">תאריך לידה: {this.state.x[i]}</Card.Body>
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
        require("./search.css");
        var today = (new Date()).toISOString().split("T")[0];
        return (
            <div>
                <datalist id="first-list">
                    {this.state.optionsPName}
                </datalist>
                <datalist id="last-list">
                    {this.state.optionsLName}
                </datalist>
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
                            list="first-list"
                            required
                        />
                        <input className="iSearch"
                            id="fname"
                            type="text" 
                            name="fName"
                            value={this.state.fName} 
                            placeholder="שם משפחה" 
                            onChange={this.handleChange} 
                            list="last-list"
                            required
                        />
                        <button className="bSearch"> 
                            חפש
                        </button>
                    </div>
                    <div className="dates">
                            <label className="cSearch">
                                בחר תאריכים: מ
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="start_date"
                                value={this.state.start_date} 
                                onChange={this.handleChange}
                                max={this.state.end_date}
                            />
                            <label className="aSearch">
                                עד
                            </label>
                            <input className="dSearch"
                                type="date"
                                name="end_date"
                                value={this.state.end_date} 
                                onChange={this.handleChange}
                                max={today}
                            />
                    </div>
                    <div className="mdd">
                        <label className="mLabel">
                                בחר מדדים:
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
                    <div className="mddShow">
                        <label className="mLabel">
                                בחר אופן הצגה:
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="showDaily"
                            checked={this.state.showDaily}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            יומי
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="weekly"
                            checked={this.state.weekly}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                            שבועי
                        </label>
                        <input className="cInput"
                            type="checkbox" 
                            name="monthly"
                            checked={this.state.monthly}
                            onChange={this.handleChange}
                        />
                        <label className="mLabel">
                             חודשי
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
                    date={this.state.date}
                    showDaily={this.state.showDaily}
                    weekly={this.state.weekly}
                    monthly={this.state.monthly}
                    user={this.state.user}
                    name={this.state.pName.trim() + " " + this.state.fName.trim()}
                    ready={this.state.ready}
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
